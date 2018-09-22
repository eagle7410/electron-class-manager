const utilPath = require('path');
const Send  = require('./libs/Send');
const Cmd   = require('./libs/Cmd');
const fsep   = require('./libs/fsep');
const FileDialog = require('./libs/FileDialog');

const {
	PATHS,
	QUERY_PATHS
} = require('./constants');

let windowMain = null;

const route = (route, handler, method) => ({
	route,
	method,
	handler : async (res, action, data) => {
		try {
			await handler(res, action, data);
		} catch (e) {
			console.error(e);
			Send.err(res, action, e.message ? e.message : e);
		}
	}
});

const config = [
	route(QUERY_PATHS.accessFileSave, async (res, action, {path, label}) => {
		await fsep.copyFile(path, `${PATHS.PATH_RUNTIME}/access-${label + utilPath.extname(path)}`);
		Send.ok(res, action);
	}),
	route(QUERY_PATHS.pathOpen, async (res, action) => {
		const path = await FileDialog.open({});

		// TODO: clear
		console.log('path', path);
		Send.ok(res, action, {path});
	}),
	route(QUERY_PATHS.pathSave, async (res, action) => {
		const path = await FileDialog.save({});

		Send.ok(res, action, {path});
	}),
];

class RouteConfig {
	static setWindowMain (window) {
		windowMain = window;
		FileDialog.init({window});

		return this;
	}
	static get () {
		return config;
	}
}

module.exports = RouteConfig;
