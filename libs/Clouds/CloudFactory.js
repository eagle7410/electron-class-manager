const Interface   = require('./classes/CloudInterface');
const GoogleDrive = require('./classes/GoogleFiles');

class CouldFactory {
	/**
	 *
	 * @param type
	 * @returns {GoogleDrive}
	 */
	getCloud (type) {
		let instance;
		const types = this.types;

		switch (type) {
			case types.google :
				instance = new GoogleDrive();
				break;
		}

		if (instance instanceof Interface) {
			return instance;
		}

		throw new Error('Not found cloud instance.');
	}

	/**
	 *
	 * @return {{[p: string]: string}}
	 */
	get labels () {
		return {
			[this.types.google] : 'Google'
		}
	}
	/**
	 *
	 * @returns {{google: string}}
	 */
	get types () {
		return {
			google : 'google',
		};
	}

}

module.exports = CouldFactory;
