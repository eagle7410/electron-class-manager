import {PREFIX_EVENT_ROOM as PREFIX} from '../const/prefix'
const initialState = {
	events : [],
};

const Events = (state = initialState, action) => {
	// eslint-disable-next-line
	switch (action.type) {
		case `${PREFIX}_REMOVE`: {

			state.events.splice(action.index, 1);

			return {
				...state,
			};
		}

		case `${PREFIX}_ADD`:
			action.data = action.data || {};

			return {
				...state,
				events : state.events.concat([action.data])
			};
	}

	return state;
};

export {Events};
