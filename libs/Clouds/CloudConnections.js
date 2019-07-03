const TdoConnect = require('./TdoConnect');
const TdoGClass = require('./classes/tdo/TdoGClass');

class CloudConnections {
	constructor () {
		this._connection = {};
		this._currect    = null;
	}

	async connected(alias, config) {
		this.current = alias;

		await this.currentDrive.connected(config);

		return this.currentDrive.isConnected;
	}

	async packageDelete(id) {
		return this.currentDrive.packageDelete(id);
	}

	async packageSave(data) {
		return this.currentDrive.packageSave(data);
	}

	get packages () {
		return this.currentDrive.pakages;
	}

	get filesConfigObj () {
		return this.currentDrive.configObj;
	}

	get connectionList () {
		return Object.values(this._connection)
			.map(conn => conn.config)
	}

	set connect ({alias, label, isHasConfig, isInit, drive}) {
	  this._connection[alias] = new TdoConnect({alias, label, isHasConfig, isInit, drive});
	}

	/**
	 *
	 * @return {GoogleFiles|Interface|*}
	 */
	get currentDrive () {
		return this.currentConnect.drive;
	}

	/**
	 *
	 * @return {TdoConnect}
	 */
	get currentConnect () {
		return this._connection[this._currect];
	}

	static get fileTypes () {
		return TdoGClass.types;
	}
	set current (alias) {
		this._currect = alias;
	}
}

module.exports = CloudConnections;
