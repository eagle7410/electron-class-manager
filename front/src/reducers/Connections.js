import {
	PREFIX_CONNECTION as PREFIX,
} from '../const/prefix'

const initialState = {
	isLoad    : false,
	list      : [],
	fileTypes : {},
};

const Connections = (state = initialState, action) => {

	const data = action.data;
	let connect;

	// eslint-disable-next-line
	switch (action.type) {
		case `${PREFIX}_IS_LOAD_RUN`:
			return {
				...state,
				isLoad: true
			};
		case `${PREFIX}_IS_LOAD_STOP`:
			return {
				...state,
				isLoad: false
			};

		case `${PREFIX}_CONNECTED`:
			connect = state.list.find(c => c.alias === data);
			connect.isInit = true;

			return {...state};

		case `${PREFIX}_HAS_CONFIG`:
			connect = state.list.find(c => c.alias === data);
			connect.isHasConfig = true;

			return {
				...state,
			};

		case `${PREFIX}_SET`:

			return {
				...state,
				list: data,
				fileTypes : action.fileTypes
			};
	}

	return state;
};

export {Connections};
