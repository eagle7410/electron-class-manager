const TdoGClass = require('./TdoGClass');

class TdoConfig {
	/**
	 *
	 * @param {[TdoGClass]} data
	 */
	constructor (data) {
		this._data = data || [];
	}

	isHasEqual (file) {
		const equal = this._data.find(f => f.isEqualName(file));

		return Boolean(equal);
	}

	addFile (file) {
		this._data.push(file)
	}

	set data (data) {
		if (Array.isArray(data))
			data.map(data => this._data.push(new TdoGClass(data)));
	}

	get obj() {
		let data = [];
		this._data.map(file => data.push(file.dataCreate));

		return data;
	}

	get body () {
		return JSON.stringify(this.obj, null, '\t');
	}

	get isEmpty() {
		return this._data.length === 0;
	}
}

module.exports = TdoConfig;
