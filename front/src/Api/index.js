import {QUERY_PATHS} from '../const/constants'
import {reqFull, save} from '../tools/req'

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
}

export default Api;
