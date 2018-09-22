let Interface   = require('./classes/CloudInterface');
let GoogleDrive = require('./classes/_GoogleDrive');

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

		// if (instance instanceof Interface) {
		// 	return instance;
		// }

		throw new Error('Not found cloud instance.');
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
