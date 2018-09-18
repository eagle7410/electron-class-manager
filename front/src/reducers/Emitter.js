import {PREFIX_SEND_FORM as PREFIX} from '../const/prefix'

const initialState = {
	event : '',
	body  : {},
};

const Emitter = (state = initialState, action) => {

	switch (action.type) {
		case `${PREFIX}_CHANGE_FIELD`:
			return {
				...state,
				[action.data.field] : action.data.value
			};
		default:
			return state;
	}
};

export {Emitter};
