const utilPath = require('path');
const fsep = require('../fsep');
const NpmMixer = require('../NpmMixer');
const Clouds = require('../Clouds');
const CloudConnections = require('../Clouds/CloudConnections');
const TdoConfigs = require('./TdoConfigs');

const {
	PATHS
} = require('../../constants');

const connections = new CloudConnections;
const config      = new TdoConfigs;
const npmMixer    = new NpmMixer;

class CloudConfigs {
	static async connected(alias) {
		const data = await config.loadByAlias(alias);

		await connections.connected(alias, data);

		return connections.currentDrive.isConnected;
	}

	static async loadFromCloud({pathProject, saveDir, files, npm}) {
		let report = ['Run download'];

		const baseDir = `${pathProject}/${saveDir}`;

		try {

			if (!await fsep.pathExists(baseDir))
				await fsep.mkdirs(baseDir);

			report.push(`Base folder ${baseDir} exists -> OK`);

			for (let {name, ext, fileId} of files) {

				await connections.currentDrive.copyFromCloudByFileId({
					fileId,
					pathLocal : `${baseDir}/${name}${ext}`
				});

				report.push(`    Load file ${name} --> OK`);
			}

			report.push(...(await npmMixer.init({npm, baseDir: pathProject}).writeMix()));

		} catch (e) {

			console.error(e);
			report.push(`Has error ${e.message || e}`);
		}

		return report;

	}
	static async addToCloud(data) {
		return await connections.currentDrive.addFile(data)
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

	static get filesConfigObj() {
		return connections.filesConfigObj || [];
	}

	static get connectionList () {
		return connections.connectionList;
	}

	static get fileTypes () {
		return CloudConnections.fileTypes;
	}
}

module.exports = CloudConfigs;
