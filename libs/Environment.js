const PROPS = {
	isDev: 'isDev'
};

let config = {
	[PROPS.isDev] : false
};

class Environment {
	/**
	 *
	 * @returns {{isDev: string}}
	 */
	static getProps() {
		return PROPS
	}

	/**
	 *
	 * @param {string} prop
	 * @param {*} value
	 *
	 * @returns {Environment}
	 */
	static setConfigProp(prop, value) {
		config[prop] = value;

		return this;
	}

	static isDev () {
		return config.isDev
	}
}

module.exports = Environment;
