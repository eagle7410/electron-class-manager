const TdoGClass = require('./TdoGClass');

class TdoConfig {
	/**
	 *
	 * @param {[TdoGClass]} data
	 */
	constructor (data) {
		this._data = data || [];
	}

	set data (data) {
		if (Array.isArray(data))
			data.map(data => this._data.push(new TdoGClass(data)));
	}

	get isEmpty() {
		return this._data.length === 0;
	}
}

module.exports = TdoConfig;
