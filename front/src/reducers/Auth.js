import {
	PREFIX_AUTH as PREFIX
} from '../const/prefix'

const initialState = {
	id         : '',
	connection : '',
	isUserAuth : false,
	isLoading  : false,
};

const Auth = (state = initialState, action) => {
	// eslint-disable-next-line
	switch (action.type) {
		case `${PREFIX}_LOAD_STOP§`:
			return {
				...state,
				isLoading : false
			};
		case `${PREFIX}_LOAD_RUN`:
			return {
				...state,
				isLoading : true
			};
		case `${PREFIX}_CHANGE_USER`:
			return {
				...state,
				connection: action.data,
				id: '',
				isUserAuth : false,
				isLoading : false
			};

		case `${PREFIX}_IS_ID`:
			return {
				...state,
				id : action.id,
				isUserAuth : true
			};
	}

	return state;
};

export {Auth};
