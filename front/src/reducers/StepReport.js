import {PREFIX_STEPS as STEPS, PREFIX_STEP_REPORT as PREFIX} from "../const/prefix";

const initialState = {
	report: []
};

const StepReport = (state = initialState, action) => {
	const {type, data} = action || {};

	switch (type) {
		case `${PREFIX}_SET_REPORT`:
			return {...state, report: data};
		case `${STEPS}_RESET`:
			return {...initialState};

		default:
			return state;
	}
};

export {StepReport};
