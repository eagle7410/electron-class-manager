const utilPath = require('path');
const {
	PATHS
} = require('../../constants');
const fsep = require('../fsep');

class TdoConfigs {
	constructor () {
		this._data = [];
	}

	async loadByAlias(alias) {
		const file = this.fileByAlias(alias);
		const path = `${PATHS.PATH_CONFIGS}/${file}`;

		delete require.cache[path];

		return require(path);
	}

	add (file) {
		const ext   = utilPath.extname(file);
		const alias = file.replace(new RegExp(ext + '$' ), '');

		this._data.push({
			alias,
			file
		})
	}

	fileByAlias (alias) {
		const config = this._data.find(cnf => cnf.alias === alias);

		return config ? config.file : null;
	}

	isHasConfig(alias) {
		return Boolean(this._data.find(cnf => cnf.alias === alias));
	}
}

module.exports = TdoConfigs;
