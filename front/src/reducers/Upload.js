import {
	PREFIX_SEND_FORM as PREFIX,
	PREFIX_DIALOG_ADD_TO_JSON as DIALOG_ADD_PROP,
	PREFIX_DIALOG_ADD_CLASS_DEPENDENCY as DIALOG_ADD_CLASS
} from '../const/prefix'
import {basename, extname} from 'path'

const initialState = {
	path    : '',
	desc    : '',
	name    : '',
	version : '0.0.1',
	type    : 'node',
	npm     : {},
	classes : {},
	errors  : {},
	isLoad  : false
};

const Upload = (state = initialState, {type, data}) => {

	let newState;

	switch (type) {
		case `${PREFIX}_IS_LOAD_RUN`:
			return {
				...state,
				isLoad : true
			};

		case `${PREFIX}_IS_LOAD_STOP`:
			return {
				...state,
				isLoad : false
			};
		case `${PREFIX}_CLEAR`:
			return {...initialState, classes: {}};

		case `${PREFIX}_ERRORS`:
			return {
				...state,
				errors : data
			};

		case `${DIALOG_ADD_PROP}_ADD`:
		case `${DIALOG_ADD_CLASS}_ADD`:

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

			if (field === 'path')
				newState.name = basename(value, extname(value));

			return newState;

		default:
			return state;
	}
};

export {Upload};
