const assert = require('assert');
const utilPath = require('path');
const Google = require('../libs/Clouds/classes/Google');
const accessGoogle = require('../runtime/access-Google');
const driveGoogle = new Google();

let fileData;
const UPDATE_PHRASE = 'UPDATE_PHRASE';
const pathLocal = `${__dirname}/data/test.txt`;

describe('Testing goole drive', function () {
	this.timeout(3000);

	it('test connect', async () => {
		await driveGoogle.connected(accessGoogle);

		assert.ok(driveGoogle.isConnected);
	});

	it('test copy to drive', async () => {
		fileData = await driveGoogle.copyToCloud({pathLocal});
		assert.ok(fileData.name === utilPath.basename(pathLocal));
	});

	it('test findByName and update and get from drive', async () => {

		fileData = (await driveGoogle.findByName({name : fileData.name})).shift();
		assert.ok(fileData.name === utilPath.basename(pathLocal));

		fileData = await driveGoogle.updateById({body : UPDATE_PHRASE, fileId: fileData.id});
		let content = await driveGoogle.copyFromCloudByFileId({fileId: fileData.id});
		assert.ok(content === UPDATE_PHRASE);
	});

	it('test deleteById', async () => {
		const isDone = await driveGoogle.deleteById({fileId: fileData.id});
		assert.ok(isDone);
	});

	it('test folderCreate', async () => {
		fileData = await driveGoogle.folderCreate({name : 'TEST_IGOR_STCHERBINA'});
		// TODO: clear
		console.log('fileData', fileData);
		// const isDone = await driveGoogle.deleteById({fileId: fileData.id});
		// assert.ok(isDone);
	})
});
