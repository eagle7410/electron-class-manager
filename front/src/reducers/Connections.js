import {
	PREFIX_CONNECTION as PREFIX,
} from '../const/prefix'

const initialState = {
	list: [],
	errors  : {}
};

const Connections = (state = initialState, action) => {

	const data = action.data;
	let connect;

	// eslint-disable-next-line
	switch (action.type) {


		case `${PREFIX}_CONNECTED`:
			connect = state.list.find(c => c.alias === data);
			connect.isInit = true;

			return {
				...state,
			};
		case `${PREFIX}_HAS_CONFIG`:
			connect = state.list.find(c => c.alias === data);
			connect.isHasConfig = true;

			return {
				...state,
			};

		case `${PREFIX}_SET`:
			return {
				...state,
				list: data
			};
	}

	return state;
};

export {Connections};
