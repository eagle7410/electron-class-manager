const GoogleFrame = require('./GoogleFrame');
const TdoConfig = require('./tdo/TdoConfig');
const TdoGClass = require('./tdo/TdoGClass');
const {
	CLOUD_FILE_NAME_CONFIG,
	CLOUD_FILE_NAME_CLASS_STORE
} = require('../../../constants');

class GoogleFiles extends GoogleFrame {
	constructor () {
		super();
		this._config = new TdoConfig();
		this._configFileId = null;
		this._storeId = null;
	}

	async _hookConnected() {

		this._isConnected = false;

		let result = await this.findByQuery({});

		for (let file of result.files) {
			switch (file.name) {
				case CLOUD_FILE_NAME_CONFIG:
					this._configFileId = file.id;
					break;
				case CLOUD_FILE_NAME_CLASS_STORE:
					this._storeId = file.id;
					break;
			}
		}

		if (!this._storeId) throw new Error(`Not found in cloud ${CLOUD_FILE_NAME_CLASS_STORE}`);
		if (!this._configFileId) throw new Error(`Not found in cloud ${CLOUD_FILE_NAME_CONFIG}`);

		await this._loadConfig();

		this._isConnected = true;

		return true;
	}

	async addFile(info) {

		const file = new TdoGClass(info);

		if (this._config.isHasEqual(file))
			throw new Error(`This is file has equal`);

		let data = await this.copyToCloud({
		  parents : this._parentStore,
		  ...file.dataForUpload
		});

		file.fileId = data.id;

		this._config.addFile(file);

		await this.updateById({
			fileId : this._configFileId,
			body : this._config.body
		});

		return file.dataCreate;
	}

	async _loadConfig () {
		this._config.data = await this.copyFromCloudByFileId({fileId : this._configFileId});
	}

	get configObj () {
		return this._config.obj;
	}

	get _parentStore() {
		return [this._storeId];
	}

}

module.exports = GoogleFiles;
