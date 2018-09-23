import {
	PREFIX_MENU as PREFIX,
	PREFIX_CONNECTION as CONN,
	PREFIX_UPDATE_LOCATION
} from '../const/prefix'

const initialState = {
	open : false,
	isConnected : false,
	location : '/'
};

const Menu = (state = initialState, action) => {
	// eslint-disable-next-line
	switch (action.type) {
		case `${CONN}_CONNECTED`:
			return {
				...state,
				isConnected: true
			};
		case PREFIX_UPDATE_LOCATION:
			return {
				...state,
				location: action.location
			};
		case `${PREFIX}_OPEN`:
			return {
				...state,
				open : true
			};

		case `${PREFIX}_CLOSE`:
			return {
				...state,
				open : false
			};
	}

	return state;
};

export {Menu};
