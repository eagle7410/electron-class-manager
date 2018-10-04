const Send  = require('./libs/Send');
const Cmd   = require('./libs/Cmd');
const FileDialog = require('./libs/FileDialog');
const CloudConfigs = require('./libs/CloudConfigs');

const {
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
	route(QUERY_PATHS.cloudDownload, async (res, action, data) => {
		const report = await CloudConfigs.loadFromCloud(data);
		Send.ok(res, action, {report});
	}),
	route(QUERY_PATHS.cloudUpload, async (res, action, data) => {
		const file = await CloudConfigs.addToCloud(data);
		Send.ok(res, action, {file});
	}),
	route(QUERY_PATHS.connected, async (res, action, {alias}) => {
		const isConnected = await CloudConfigs.connected(alias);
		let files = [];

		if(isConnected) files = CloudConfigs.filesConfigObj;

		Send.ok(res, action, {isConnected, files});
	}),
	route(QUERY_PATHS.appInit, async (res, action) => {
		await CloudConfigs.init();

		Send.ok(res, action, {
			connections : CloudConfigs.connectionList,
			fileTypes : CloudConfigs.fileTypes
		});
	}),
	route(QUERY_PATHS.accessFileSave, async (res, action, {path, alias}) => {
		await CloudConfigs.copyConfig(path, alias);
		Send.ok(res, action);
	}),
	route(QUERY_PATHS.pathOpen, async (res, action, data = {}) => {
		const path = await FileDialog.open(data);
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
