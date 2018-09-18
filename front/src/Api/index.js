import LocalStore from './LocalStore'
import SocketConnect from './SocketConnect'

const storeConnections = new LocalStore('socket_connections');

let connect = null;

class Api {
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

	/**
	 *
	 * @returns {Promise<Array>}
	 */
	static getUsers () {
		return  storeConnections.getAll();
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
