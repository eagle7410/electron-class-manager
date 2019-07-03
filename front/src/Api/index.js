import {QUERY_PATHS} from '../const/constants'
import {reqFull, save} from '../tools/req'
import LocalStore from './LocalStore'

class Api {
	static get githubLabel()  {
		return 'github';
	}
	static setLocalItem(name, valString)  {
		return LocalStore.setItem(name, valString)
	}
	static getLocalItem(name)  {
		return LocalStore.getItem(name)
	}

	static packageUpdate(data) {
		return reqFull(save, QUERY_PATHS.packageUpdate, data);
	}

	static packageDeploy(data) {
		return reqFull(save, QUERY_PATHS.packageDeploy, data);
	}

	static packageMove(data) {
		return reqFull(save, QUERY_PATHS.packageMove, data);
	}
	static packageSave(data) {
		return reqFull(save, QUERY_PATHS.packageSave, data);
	}

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
}

export default Api;
