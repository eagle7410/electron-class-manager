const fsep      = require('../../fsep');
const utilPath  = require('path');
const {google}  = require('googleapis');

const DEFAULT_ROOT_FOLDER_NAME = 'ClassStore';

class Google {
	constructor () {
		this._rootId         = null;
		this._rootFolderName = DEFAULT_ROOT_FOLDER_NAME;
		this._auth           = null;
		this._service        = null;
		this._isConnected      = false;
	}

	setParams ({rootFolderName}) {
		this._rootFolderName = rootFolderName || DEFAULT_ROOT_FOLDER_NAME;
	}

	/**
	 * Init connect
	 *
	 * @param {object} authData
	 *
	 * @returns {Promise<boolean>}
	 */
	async connected(authData) {

		this._isConnected = false;

		try {
			this.auth = authData;

			google.options({auth: this._auth});

			this._service = google.drive({
				version: 'v3',
				auth: this._auth
			});

			const response = await this.serviceFiles.list({q: this._initQuery});

			if (this._rootFolderName.length && response.data.files.length)
				this._rootId = response.data.files[0].id;

			this._isConnected = true;

			return true;

		} catch (e) {
			console.error(e);
			throw  e;
		}
	}

	async folderCreate ({name, parents = []}) {

		const mimeType = Google.mimeTypes.GFolder;
		const requestBody = {
			name,
			mimeType,
			parents : this._parentFolderId.concat(parents)
		};

		const result = await this.serviceFiles.create({requestBody});

		return result.data;
	}

	async deleteById ({fileId}) {
		const response = await this.serviceFiles.delete({fileId});

		return true;
	}

	async findByName ({name, parents = [], mimeType}) {
		let data = {
			parents : this._parentFolderId.concat(parents),
			name
		};

		if (mimeType) data.mimeType = mimeType;

		const q = Google._query(data);

		const response = await this.serviceFiles.list({q});

		return response.data.files
	}

	async updateById({fileId, pathLocal, fileName, parents, mimeType, body}) {
		parents = parents || [];

		if (body === undefined && pathLocal) {
			const content = await fsep.readFile(pathLocal);
			body = content.toString();
		}

		let media = {};
		let requestBody = { fileId, parents : this._parentFolderId.concat(parents)};

		if (fileName) requestBody.name = fileName;
		if (mimeType) requestBody.mimeType = mimeType;
		if (body) media.body = body;

		const result = await this.serviceFiles.update({media,...requestBody});

		return result.data;
	}

	async copyFromCloudByFileId({fileId, pathLocal}) {
		const response = await this.serviceFiles.get({fileId, alt: 'media'});

		const content = response.data;

		if (pathLocal) await fsep.writeFile(pathLocal, content);

		return content;
	}

	async copyToCloud({pathLocal, fileName, parents, mimeType, body}) {
		parents = parents || [];

		if (body === undefined) {
			const content = await fsep.readFile(pathLocal);
			body = content.toString();
		}

		const result = await this.serviceFiles.create({
			requestBody: {
				name: fileName || utilPath.basename(pathLocal),
				mimeType,
				parents : this._parentFolderId.concat(parents)
			},
			media: {body, mimeType}
		});

		return result.data;
	}

	get serviceFiles () {
		return this._service.files;
	}

	get _parentFolderId() {
		return this._rootId === null
			? []
			: [this._rootId];
	}

	set auth (authData) {
		const {access, installed : {client_secret, client_id, redirect_uris}} = authData;

		this._auth =  new google.auth.OAuth2(
			client_id,
			client_secret,
			redirect_uris[0]
		);
		this._auth.credentials = access;
	}

	get _initQuery() {
		let data = {mimeType : Google.mimeTypes.GFolder};

		if (this._rootFolderName) data.name = this._rootFolderName;

		return Google._query(data);
	}

	/**
	 * @source Maybe extends https://developers.google.com/drive/api/v3/mime-types
	 * @return {{GFolder: string, text: string}}
	 */
	static get mimeTypes () {
		return {
			GFolder : 'application/vnd.google-apps.folder',
			text : 'plant/text'
		}
	}

	get isConnected () {
		return this._isConnected;
	}

	static _query (data) {
		return Object.entries(data)
			.map(field => `${field[0]}='${field[1]}'`)
			.join(' and ');

	}
}

module.exports = Google;
