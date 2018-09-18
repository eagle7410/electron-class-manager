const fs = require('fs');
const Interface = require('./CloudInterface');
const pathManager = require('../../path-manager');

module.exports = class GoogleDrive extends Interface {

	constructor() {
		super();

		const that = this;

		that.googleApi = require('googleapis');
		that.googleAuth = require('google-auth-library');
		that.cloudFileName = 'google_access_token.json';
		that._rootId = null;
		that._rootFolderName = 'AppsStore';

	}

	setRootFolder(name) {
		this._rootFolderName = name;
	}

	_setOauth2Client(authData) {
		const clientSecret = authData.installed.client_secret;
		const clientId = authData.installed.client_id;
		const redirectUrl = authData.installed.redirect_uris[0];
		const auth = new this.googleAuth();
		const oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);
		oauth2Client.credentials = authData.access;

		this._auth = oauth2Client;
	}

	_getInitQuery() {
		let main = "mimeType='application/vnd.google-apps.folder'";

		if (this._rootFolderName) {
			main += `and title='${this._rootFolderName}'`
		}

		return main;
	}

	createCouldFolder(dirName) {
		const that = this;

		return new Promise((ok, bad) => {

			that._service.insert({
				auth: that._auth,
				resource: {
					mimeType: 'application/vnd.google-apps.folder',
					title: dirName
				}
			}, (err, file) => {

				if (err) {
					return bad(err);
				}

				ok(file);
			});

		});
	}

	/**
	 * Init connect.
	 */
	connectInit() {
		const that = this;

		return new Promise((ok, bad) => {
			const authJson = pathManager.getPathToFile(that.pathToAccessToken, that.cloudFileName);

			if (!pathManager.checkExistSync(authJson)) {
				that._status = that._statuses.noAccessToken;
				ok()
			}

			let authData = require(authJson);

			that._setOauth2Client(authData);
			that._service = that.googleApi.drive('v2').files;

			that._service.list({
				auth: that._auth,
				q: that._getInitQuery(),
			}, (err, res) => {

				if (err) {
					that._status = that._statuses.initBad;
					return bad(err);
				}

				if (res.items.length) {
					that._rootId = res.items[0].id;
					that._status = that._statuses.initOk;
					return ok(res.items[0]);
				}

				if (!that._rootFolderName) {
					that._status = that._statuses.initOk;
					return ok(null);
				}

				that.createCouldFolder(that._rootFolderName)
					.then(file => {
						that._status = that._statuses.initOk;
						that._rootId = file.id;
						ok();
					})
					.catch(err => {
						that._status = that._statuses.initBad;
						bad(err)
					});
			});

		});
	}

	/**
	 *
	 * @param fileZip {string}
	 * @param fileName {string}
	 */
	moveToCould(fileZip, fileName = pathManager.getArchiveName()) {
		const that = this;

		function insert(ok, bad) {
			fs.readFile(fileZip, (err, content) => {

				if (err) {
					return bad(err);
				}

				that._service.insert({
					auth: that._auth,
					resource: {
						title: fileName,
						parents: that.__getRoot()
					},
					media: {body: content},
				}, (err, res) => {
					if (err) {
						return bad(err);
					}

					ok(res);
				});
			});
		}

		return new Promise((ok, bad) => {

			that.findFiles(fileName)
				.then(files => {

					insert((res) => {
						that._service.delete({auth: that._auth, fileId: files[0].id}, () => ok(res));
					}, bad)
				})
				.catch(err => {
					insert(ok, bad);
				})


		});
	}

	__getRoot() {
		const that = this;

		if (that._rootId === null) {
			return [];
		}

		return [
			{id: that._rootId}
		];
	}

	/**
	 *
	 * @param folder {string}
	 * @param fileName {string}
	 */
	moveFromCould(folder, fileName) {
		const that = this;

		return new Promise((ok, bad) => {
			that.findFiles(fileName)
				.then(files => {
					that._service.get({ auth: that._auth, fileId: files[0].id, alt: "media" })
						.on('end', ok)
						.on('error', bad)
						.pipe(fs.createWriteStream(`${folder}/${fileName}`));
				})
				.catch(bad);
		});
	}

	findFiles (fileName) {
		const that = this;

		return new Promise((ok, bad) => {

			that._service.list({
				auth: that._auth,
				q: `title='${fileName}'`,
			}, (err, res) => {

				if (err) {
					return bad(err);
				}

				if (!res.items.length) {
					return bad('Not found file');
				}

				ok(res.items);
			});
		});
	}

	/**
	 *
	 * @param fileName {string}
	 */
	deleteInCould(fileName) {
		const that = this;

		return new Promise((ok, bad) => {
			that.findFiles(fileName)
				.then(files => {
					that._service.delete({
						auth: that._auth,
						fileId: files[0].id
					}, (err) => err ? bad(err) : ok());

				})
				.catch(bad);
		});
	}

	isHaveConfig () {
		return pathManager.checkExistSync(pathManager.getPathToFile(this.pathToAccessToken, this.cloudFileName));
	}
}
