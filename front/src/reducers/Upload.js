import {
	PREFIX_SEND_FORM as PREFIX,
	PREFIX_DIALOG_ADD_TO_JSON as DIALOG_ADD_PROP
} from '../const/prefix'
import {basename, extname} from 'path'

const initialState = {
	path    : '',
	name    : '',
	version : '0.0.1',
	type    : 'unknown',
	npm     : {},
	classes : {},
};

const Upload = (state = initialState, {type, data}) => {

	let newState, prop;

	switch (type) {
		case `${DIALOG_ADD_PROP}_ADD`:

			newState = {
				...state,
				[data.type] : {
					...state[data.type],
					[data.prop] : data.value || ''
				}
			};

			return newState;

		case `${PREFIX}_CHANGE_FIELD`:
			const {field, value} = data;

			newState = {
				...state,
				[field] : value
			};

			if (field === 'path') {
				newState.name = basename(value, extname(value))
			}

			return newState;

		default:
			return state;
	}
};

export {Upload};
