import LocalStore from './LocalStore'
import SocketConnect from './SocketConnect'

import {QUERY_PATHS} from '../const/constants'
import {reqFull, save} from '../tools/req'
const storeConnections = new LocalStore('socket_connections');

let connect = null;

class Api {
	static fromCloud(data) {
		return reqFull(save, QUERY_PATHS.cloudDownload, data);
	}
	static toCloud(data) {
		return reqFull(save, QUERY_PATHS.cloudUpload, data);
	}
	static cloudConnect ({alias}) {
		return reqFull(save, QUERY_PATHS.connected, {alias});
	}

	static init() {
		return reqFull(save, QUERY_PATHS.appInit);
	}
	static accessFileSave({alias, path}) {
		return reqFull(save, QUERY_PATHS.accessFileSave, {path, alias});
	}
	static pathOpen (data = {}) {
		return reqFull(save, QUERY_PATHS.pathOpen, data);
	}

	static pathSave () {
		return reqFull(save, QUERY_PATHS.pathSave);
	}

	/**
	 *
	 * @param id
	 * @returns {Promise<boolean>}
	 */
	static deleteUser(id) {
		return  storeConnections.deleteById(id);
	}
	/**
	 *
	 * @param user
	 * @returns {Promise<boolean|Object>}
	 */
	static addConnect(user) {
		return  storeConnections.add(user);
	}

	static async auth(data) {

		if (connect) await connect.disconnect();

		connect = new SocketConnect();

		return await connect.connected(data);
	}

	/**
	 *
	 * @param {{action, controller, body}} data
	 * @returns {Promise<Object>}
	 */
	static send({event, body}) {
		return connect.emit(event, body);
	}

	/**
	 *
	 * @returns {string}
	 */
	static eventRoom() {
		return SocketConnect.customWindowEvent();
	}
}

export default Api;
