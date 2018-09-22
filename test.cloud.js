const Google = require('./libs/Clouds/classes/Google');
const accessGoogle = require('./runtime/access-Google');

void async function () {
	try {

		const driveGoogle = new Google();

		await driveGoogle.connected(accessGoogle);

	} catch (e) {
		console.error(e);
	} finally {
		process.exit();
	}
}();
