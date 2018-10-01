import {
	PREFIX_SEND_FORM as PREFIX,
	PREFIX_DIALOG_ADD_TO_JSON as DIALOG_ADD_PROP
} from '../const/prefix'
import {basename, extname} from 'path'

const initialState = {
	path    : '/home/igor/prjs/Gate-API-v1/classes/ErrorHttp.js',
	desc    : '',
	name    : 'ErrorHttp',
	version : '0.0.1',
	type    : 'unknown',
	npm     : {},
	classes : {},
	errors  : {},
	isLoad  : false
};

const Upload = (state = initialState, {type, data}) => {

	let newState, prop;

	switch (type) {
		case `${PREFIX}_IS_LOAD_RUN`:
			return {
				...state,
				isLoad : true
			};

		case `${PREFIX}_IS_LOAD_STOP`:
			return {
				...initialState,
			};

		case `${PREFIX}_ERRORS`:
			return {
				...state,
				errors : data
			};

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
