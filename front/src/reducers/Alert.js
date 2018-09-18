import {
	PREFIX_ALERT as PREFIX
} from '../const/prefix'
import {
	ICON_TYPES,
	TYPES
} from '../const/alert'

const initialState = {
	isOpen     : false,
	type       : TYPES.OK,
	message    : '',
	isShowIcon : true,
	showIcon   : ICON_TYPES.OK,
	labelOk    : 'Read',
};

const Alert = (state = initialState, action) => {
	// eslint-disable-next-line
	switch (action.type) {
		case `${PREFIX}_CLOSE`:
			return {...initialState};

		case `${PREFIX}_OPEN`:
			return {
				...state,
				...action.data,
				isOpen : true
			};
	}

	return state;
};

export {Alert};
