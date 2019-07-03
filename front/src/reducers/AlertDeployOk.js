
import {
	PREFIX_ALERT_DEPLOY_OK as PREFIX
} from '../const/prefix'

const initialState = {
	isOpen  : false,
	path    : '',
	repo    : '',
	branch  : '',
	newRepo : '',
};

const AlertDeployOk = (state = initialState, action) => {

	// eslint-disable-next-line
	switch (action.type) {
		case `${PREFIX}_CLOSE`:
			return {...initialState};

		case `${PREFIX}_CHANGE_NEW_REPO`:
			return {
				...state,
				newRepo : action.data,
			};
		case `${PREFIX}_OPEN`:
			return {
				...state,
				...action.data,
				isOpen : true
			};
	}

	return state;
};

export {AlertDeployOk};
