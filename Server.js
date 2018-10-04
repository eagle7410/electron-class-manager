const ListenersHandlers = require('./ListenersHandlers');
const {PATHS} = require('./constants');
const fsep = require('./libs/fsep');

class Server {
	static async run(mainWindow) {
		try {
			await this.init();
			ListenersHandlers.setWindow(mainWindow).apply();
		} catch (e) {
			console.error(e);
		}

	}

	static async init() {

		if (!await fsep.pathExists(PATHS.PATH_RUNTIME))
			await fsep.mkdir(PATHS.PATH_RUNTIME);

		if (!await fsep.pathExists(PATHS.PATH_CONFIGS))
			await fsep.mkdir(PATHS.PATH_CONFIGS);
	}
}

module.exports = Server;

