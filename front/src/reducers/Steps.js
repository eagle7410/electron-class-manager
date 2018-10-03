import {PREFIX_STEPS as PREFIX} from '../const/prefix'

const initialState = {
	activeStep : 1,
	countStep : 3
};

const Steps = (state = initialState, action) => {
	// eslint-disable-next-line
	switch (action.type) {
		case `${PREFIX}_NEXT`:
			return {
				...state,
				activeStep: state.activeStep + 1,
			};

		case `${PREFIX}_BACK`:
			return {
				...state,
				activeStep: state.activeStep - 1,
			};

		case `${PREFIX}_RESET`:
			return {...initialState};
	}

	return state;
};

export {Steps};
