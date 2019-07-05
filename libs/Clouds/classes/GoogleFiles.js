const GoogleFrame = require('./GoogleFrame');
const Packages    = require('./Packages');
const TdoConfig   = require('./tdo/TdoConfig');
const TdoGClass   = require('./tdo/TdoGClass');

const {
	CLOUD_FILE_NAME_CONFIG,
	CLOUD_FILE_NAME_CLASS_STORE
} = require('../../../constants');

class GoogleFiles extends GoogleFrame {
	constructor () {
		super();
		this._config       = new TdoConfig();
		this._packages     = new Packages();
		this._configFileId = null;
		this._storeId      = null;
	}

	async _hookConnected() {

		this._isConnected = false;

		let result = await this.findByQuery({});

		for (let file of result.files) {

			switch (file.name) {
				case Packages.fileName:
					this._packages.info = file;
				case CLOUD_FILE_NAME_CONFIG:
					this._configFileId = file.id;
					break;
				case CLOUD_FILE_NAME_CLASS_STORE:
					this._storeId = file.id;
					break;
			}
		}

		if (!this._packages.isInit) throw new Error('No init packages');
		if (!this._storeId) throw new Error(`Not found in cloud ${CLOUD_FILE_NAME_CLASS_STORE}`);
		if (!this._configFileId) throw new Error(`Not found in cloud ${CLOUD_FILE_NAME_CONFIG}`);

		await this._loadConfig();
		await this._loadPackegs();

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

	async _loadPackegs () {
		this._packages.data = await this.copyFromCloudByFileId({fileId : this._packages.fileId});
	}


	async _loadConfig () {
		this._config.data = await this.copyFromCloudByFileId({fileId : this._configFileId});
	}

	async packageDelete (id) {

		this._packages.remove(id);

		await this.updateById({
			fileId : this._packages.fileId,
			body : this._packages.body
		});
	}

	async packageSave (data) {
		this._packages.save(data);

		await this.updateById({
			fileId : this._packages.fileId,
			body : this._packages.body
		});
	}

	get pakages () {
		return this._packages.data
	}

	get configObj () {
		return this._config.obj;
	}

	get _parentStore() {
		return [this._storeId];
	}

}

module.exports = GoogleFiles;
