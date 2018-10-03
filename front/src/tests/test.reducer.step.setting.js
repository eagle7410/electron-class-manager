const assert = require('assert');
const {StepSetting, initialState} = require('../reducers/StepSetting');

let stateCurrent;
describe('Testing reducer StepSetting', () => {

	it('test get initial state', () => {
		stateCurrent = StepSetting(undefined, {});
		assert.deepEqual(stateCurrent, initialState);
	});
});
