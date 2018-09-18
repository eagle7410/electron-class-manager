const Send             = require('./libs/Send');
const Cmd              = require('./libs/Cmd');

let windowMain = null;

const route = (route, handler, method) => ({
	route,
	method,
	handler : async (res, action, data) => {
		try {
			await handler(res, action, data);
		} catch (e) {
			console.error(e);
			Send.err(res, action, e.message ? e.message : e);
		}
	}
});

const config = [
	route('/run-and-exit', async (res, action, {cmd}) => {
		await Cmd.run(cmd);
		windowMain.close();
	}),
	route('/run', async (res, action, {cmd}) => {

		await Cmd.run(cmd);

		Send.ok(res, action);
	})
];

class RouteConfig {
	static setWindowMain (window) {
		windowMain = window;

		return this;
	}
	static get () {
		return config;
	}
}

module.exports = RouteConfig;
