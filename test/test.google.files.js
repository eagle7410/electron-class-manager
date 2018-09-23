const assert = require('assert');
const Google = require('../libs/Clouds/classes/GoogleFiles');
const accessGoogle = require('../runtime/access-Google');
const driveGoogle = new Google();

describe('Testing GoogleFiles', function () {
	this.timeout(3000);

	it('test connect', async () => {
		await driveGoogle.connected(accessGoogle);

		assert.ok(driveGoogle.isConnected);
	});
});
