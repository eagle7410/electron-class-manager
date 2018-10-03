import {ok, deepEqual} from 'assert'
import BuildList from '../tools/BuildList'

const listCreator = new BuildList;

const createFileIteam = (fileId, name, version, npm) => ({fileId, name, version, npm});

const testList = [
	createFileIteam('id1', 'ErrorHttp', '0.0.1', {express: '1.0.1'}),
	createFileIteam('id2', 'ErrorHttp', '0.0.2', {express: '1.0.2'}),
	createFileIteam('id3', 'ErrorValidate', '0.0.1', {express: '1.0.1'}),
	createFileIteam('id4', 'ErrorCustom', '0.0.1', {'socket.io': '1.0.1'}),
];

describe('Testing BuildList', () => {
	it('test build list with error', () => {
		listCreator.list = testList;

		ok(listCreator.isHasProblems);

		deepEqual(
			listCreator.npm,
			{ express: [ '1.0.1', '1.0.2' ], 'socket.io': '1.0.1' }
		);

		deepEqual(
			listCreator.problems,
			[
				{ message: 'Npm express package has different version' },
				{ message: 'Classes ErrorHttp have different version' }
			]
		);
	});

	it('test correct list', () => {
		listCreator.npm = { express: '1.0.2', 'socket.io': '1.0.1' };
		listCreator.removeFileByFileId('id2');
		ok(!listCreator.isHasProblems);
	});
});
