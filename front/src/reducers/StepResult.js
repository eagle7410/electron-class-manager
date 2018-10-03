import {PREFIX_STEP_RESULT as PREFIX} from '../const/prefix'
import BuildList from '../tools/BuildList'

const builder = new BuildList;

const StepResult = (state = builder.state, action = {}) => {
	const {type, data} = action;

	switch (type) {
		case `${PREFIX}_INIT`:

			builder.init();

			builder.list = data.list;
			builder.npm  = data.npm;

			return builder.state;

		case `${PREFIX}_MOVE_FILE`:

			builder.removeFileByFileId(data.fileId);

			return builder.state;

		case `${PREFIX}_CHANGE_NPM`:

			builder.npm = data.npm;

			return builder.state;

		default:
			return state;
	}
};

export {StepResult};
