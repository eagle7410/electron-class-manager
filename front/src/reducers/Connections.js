import {
	PREFIX_CONNECTION as PREFIX,
	PREFIX_CONNECTION_ADD as ADD
} from '../const/prefix'

const newItem = {
	label  : '',
	url    : '',
	path   : '/',
	query  : {},
	listen : []
};

const initialState = {
	list: [],
	newItem,
	errors  : {}
};

const Connections = (state = initialState, action) => {

	const data = action.data;

	// eslint-disable-next-line
	switch (action.type) {

		case ADD:
			return {
				...state,
				list : [...state.list, data],
				newItem
			};

		case `${PREFIX}_SET`:
			return {
				...state,
				list: data
			};
		case `${ADD}_ERRORS`:
			return {
				...state,
				errors : data
			};
		case `${ADD}_INPUT`:
			return {
				...state,
				newItem : {
					...state.newItem,
					[action.field] : action.value
				}
			};
	}

	return state;
};

export {Connections};
