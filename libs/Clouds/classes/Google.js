const fs = require('fs');
const {google}  = require('googleapis');
var readline = require('readline');

class Google {
	constructor () {
		this._rootId = null;
		this._rootFolderName = 'ClassStore';
		this._auth           = null;
		this._service        = null;
	}

	setParams ({rootFolderName}) {
		this._rootFolderName = rootFolderName;
	}

	/**
	 * Init connect
	 *
	 * @param {object} authData
	 *
	 * @returns {Promise<any>}
	 */
	async connected(authData) {
		try {
			await this.auth(authData);

			this._service = google.drive({
				version: 'v3',
				auth: this._auth
			});

			const list = await this.serviceFiles.list({q: this._initQuery});

			if (list.items.length)
				that._rootId = list.items[0].id;

		} catch (e) {
			console.error(e);
			throw  e;
		}

	}

	get serviceFiles () {
		return this._service.files;
	}

	question () {
		let that = this;

		return new Promise((ok,bad)=> {
			var rl = readline.createInterface({
				input: process.stdin,
				output: process.stdout
			});
			rl.question('Enter the code from that page here: ', (code) => {
				rl.close();
				that._auth.getToken(code, function (err, token) {
					if (err) {

						console.log('Error while trying to retrieve access token', err);
						return bad('Error while trying to retrieve access token');
					}
					// TODO: clear
					console.log('token is ', token);
					that._auth.credentials = token;
					ok();
				});
			})
		});
	}
	async auth (authData) {
		const {access, installed : {client_secret, client_id, redirect_uris}} = authData;

		this._auth =  new google.auth.OAuth2(
			client_id,
			client_secret,
			redirect_uris[0]
		);
		this._auth.credentials = access;
		// const url = this._auth.generateAuthUrl({access_type: 'offline',scope: this._scopes});
		//
		// console.log('url is ', url);
		// await this.question();

		google.options({
			auth: this._auth
		});
	}

	get _initQuery() {
		let main = "mimeType='application/vnd.google-apps.folder'";

		if (this._rootFolderName) {
			main += `and name='${this._rootFolderName}'`
		}

		return main;
	}
}

module.exports = Google;

