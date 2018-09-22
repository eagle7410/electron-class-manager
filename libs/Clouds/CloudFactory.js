let Interface   = require('./classes/CloudInterface');
let GoogleDrive = require('./classes/GoogleDrive');

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

		throw new Error('Could not extends Could Interface.');
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
