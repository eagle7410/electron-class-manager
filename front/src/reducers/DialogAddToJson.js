import {
	PREFIX_DIALOG_ADD_TO_JSON as PREFIX
} from '../const/prefix'

const initialState = {
	isOpen : false,
	type   : '',
	prop   : '',
	value  : '',
	errors : {}
};

const DialogAddToJson = (state = initialState, {type, data}) => {
	switch (type) {
		case `${PREFIX}_OPEN`:
			return {
				...state,
				isOpen : true,
				type : data
			};

		case `${PREFIX}_CLOSE`:
			return {
				...initialState,
			};
		case `${PREFIX}_INPUT`:
			return {
				...state,
				[data.field] : data.value
			};

		default:
			return state;
	}
};

export {DialogAddToJson};
