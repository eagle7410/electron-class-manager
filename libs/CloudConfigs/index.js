const utilPath = require('path');
const fsep = require('../fsep');
const Clouds = require('../Clouds');
const CloudConnections = require('../Clouds/CloudConnections');
const TdoConfigs = require('./TdoConfigs');
const {
	PATHS
} = require('../../constants');

const connections = new CloudConnections;
const config = new TdoConfigs;

class CloudConfigs {
	static async connected(alias) {
		const data = await config.loadByAlias(alias);

		await connections.connected(alias, data);

		return connections.currentDrive.isConnected;
	}

	static async copyConfig(localPath, alias) {
		const file = alias + utilPath.extname(localPath);
		await fsep.copyFile(localPath, `${PATHS.PATH_CONFIGS}/${file}`);

		config.add(file);

		return true;
	}

	static async init() {

		for(let file of await fsep.readdir(PATHS.PATH_CONFIGS))
			config.add(file);

		for(let [alias, label] of Object.entries(Clouds.labels))
			connections.connect = {
				alias,
				label,
				isHasConfig : config.isHasConfig(alias),
				isInit : false,
				drive : Clouds.getCloud(alias)
			};

		return true;
	}

	static get connectionList () {
		return connections.connectionList;
	}
}

module.exports = CloudConfigs;
