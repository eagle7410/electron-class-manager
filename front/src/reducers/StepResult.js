import {PREFIX_STEP_RESULT as PREFIX, PREFIX_STEPS as STEPS} from '../const/prefix'
import BuildList from '../tools/BuildList'


const builder = new BuildList;

const StepResult = (state = builder.state, action = {}) => {
	const {type, data} = action;

	switch (type) {
		case `${PREFIX}_IS_LOAD_RUN`:
			return builder.stateLoad(true);

		case `${PREFIX}_IS_LOAD_STOP`:
			return builder.stateLoad(false);

		case `${PREFIX}_INIT`:

			builder.init().list = data;

			return builder.state;

		case `${PREFIX}_MOVE_FILE`:

			builder.removeFileByFileId(data);

			return builder.state;

		case `${PREFIX}_CHANGE_NPM`:

			builder.npm = data;

			return builder.state;

		case `${STEPS}_RESET`:
			return builder.init().state;

		default:
			return state;
	}
};

export {StepResult};
