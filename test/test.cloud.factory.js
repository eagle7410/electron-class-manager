const assert = require('assert');
const Clouds = require('../libs/Clouds');
const GoogleFiles = require('../libs/Clouds/classes/GoogleFiles');

describe('Testing cloud factory', function () {
	it('Get could google', async () => {
		const cloud = Clouds.getCloud(Clouds.types.google);

		assert.ok(cloud instanceof GoogleFiles);
	});
});
