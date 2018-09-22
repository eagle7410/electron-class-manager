const ListenersHandlers = require('./ListenersHandlers');

class Server {
	static async run(mainWindow) {
		ListenersHandlers.setWindow(mainWindow).apply();
	}
}

module.exports = Server;

