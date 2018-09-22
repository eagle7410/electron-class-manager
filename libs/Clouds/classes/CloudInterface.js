
module.exports = class CouldInterface {

	constructor() {
		const that = this;

		that._statuses = {
			create        : 1,
			noAccessToken : 2,
			initBad       : 3,
			initOk        : 4
		};

		that._status = this._statuses.create;
		that.pathToAccessToken = null;
		that.cloudFileName = null;
	}

	/**
	 * Init connect.
	 * @return {Promise}
	 */
	connectInit (authData) {}

	/**
	 *
	 * @param fileZip {string}
	 * @param fileName {string}
	 */
	moveToCould (fileZip, fileName) {}

	/**
	 *
	 * @param folder {string}
	 * @param fileName {string}
	 */
	moveFromCould (folder, fileName)  {}

	/**
	 *
	 * @param fileName {string}
	 */
	deleteInCould(fileName) {}

	getStatus() {
		return this._status;
	}

	/**
	 *
	 * @param path {string}
	 * @returns {Promise}
	 */
	setPathToAccessToken(path) {
		const that = this;

		return new Promise((ok, bad) => {
			pathManager.checkPath(path).then(() => {
				that.pathToAccessToken = path;
				ok();
			}, bad);
		});
	}

	getStatuses() {
		return this._statuses;
	}


	/**
	 *
	 * @param fileName {string}
	 */
	setCloudFileName(fileName) {
		this.cloudFileName = fileName;
	}

	getConfigPath () {
		return pathManager.getPathToFile(this.pathToAccessToken, this.cloudFileName);
	}

}
