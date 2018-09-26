const CloudInterface = require('./CloudInterface');
const fsep      = require('../../fsep');
const utilPath  = require('path');
const {google}  = require('googleapis');
const {
	CLOUD_DEFAULT_ROOT_FOLDER_NAME,
} = require('../../../runtime/constants');

class GoogleFrame extends CloudInterface {
	constructor () {
		super();

		this._rootId         = null;
		this._rootFolderName = CLOUD_DEFAULT_ROOT_FOLDER_NAME;
		this._auth           = null;
		this._service        = null;
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

			await this._hookConnected(response);

			return true;

		} catch (e) {
			console.error(e);
			throw  e;
		}
	}

	async folderCreate ({name, parents = []}) {

		const mimeType = GoogleFrame.mimeTypes.GFolder;
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

	async findByQuery (query) {

		if (!query.parents) query.parents = [];
		if (this._rootId && !query.parents.includes(this._rootId)) query.parents.unshift(this._rootId);

		let data = {...query};

		const q = GoogleFrame._query(data);
		const response = await this.serviceFiles.list({q});

		return response.data;
	}

	async findByName ({name, parents = [], mimeType}) {
		let data = {
			parents,
			name
		};

		if (mimeType) data.mimeType = mimeType;

		return (await this.findByQuery(data)).files;
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
				parents : (parents.length ? parents : this._parentFolderId)
			},
			media: {body, mimeType}
		});

		return result.data;
	}

	/**
	 *
	 * @param response
	 * @return {Promise<boolean>}
	 *
	 * @protected
	 */
	async _hookConnected (response) {
		return true;
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
		let data = {mimeType : GoogleFrame.mimeTypes.GFolder};

		if (this._rootFolderName) data.name = this._rootFolderName;

		return GoogleFrame._query(data);
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


	static _query (data) {
		return Object.entries(data)
			.map(field => `${field[0]}='${field[1]}'`)
			.join(' and ');

	}
}

module.exports = GoogleFrame;
