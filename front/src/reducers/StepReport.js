import {PREFIX_STEPS as STEPS, PREFIX_STEP_REPORT as PREFIX} from "../const/prefix";

const initialState = {
	report: []
};

const StepReport = (state = initialState, action) => {

	switch (action.type) {
		case `${PREFIX}_SET_REPORT`:
			return {...state, report: action.data}
		case `${STEPS}_RESET`:
			return {...initialState};

		default:
			return state;
	}
};

export {StepReport};
