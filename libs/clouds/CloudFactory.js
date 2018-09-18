let Interface   = require('./classes/CloudInterface');
let GoogleDrive = require('./classes/GoogleDrive');

class CouldFactory {
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

	get types () {
		return {
			google : 'google',
		};
	}

}

module.exports = new CouldFactory();
