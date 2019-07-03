import {
	PREFIX_GITHUB as PREFIX,
} from '../const/prefix'

const initialState = {
	login      : '',
	pass       : '',
	isShowPass : false,
};

const Github = (state = initialState, action = {}) => {
	const {data, type} = action;

	switch (type) {
		case `${PREFIX}_TOGGLE_SHOW`:
			return {
				...state,
				isShowPass : !state.isShowPass
			};
		case `${PREFIX}_CHANGE_FIELD`:
			return {
				...state,
				[data.name] : data.value
			};
		case `${PREFIX}_INIT`:
			return {
				...state,
				...data,
			};

		default:
			return state;
	}
};

export {Github};



