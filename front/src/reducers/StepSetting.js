import {
	PREFIX_STEP_SETTINGS as PREFIX,
	PREFIX_STEPS as STEPS
} from '../const/prefix'

const initialState = {
	isLoad : false,
	pathProject : '',
	saveDir : 'classes',
	order: 'asc',
	orderBy: '',
	selected: [],
	header : [
		{ id: 'name', numeric: false, disablePadding: true, label: 'Class name' },
		{ id: 'version', numeric: false, disablePadding: false, label: 'Version' },
		{ id: 'type', numeric: false, disablePadding: false, label: 'Type' },
		{ id: 'desc', numeric: false, disablePadding: false, label: 'Description' },
		{ id: 'classes', numeric: false, disablePadding: false, label: 'Classes dependencies' },
		{ id: 'npm', numeric: false, disablePadding: false, label: 'Npm dependencies' },
	],
	data: [],
	page: 0,
	rowsPerPage: 5,
	errors : {}
};

const StepSetting = (state = initialState, action = {}) => {
	const {data, type} = action;

	switch (type) {
		case `${PREFIX}_ADD_FILE`:
			return {
				...state,
				data : state.data.push(data)
			};
		case `${PREFIX}_SET_FILES`:
			return {...state,data};
		case `${PREFIX}_SET_ERRORS`:
			return {
				...state,
				errors : data
			};
		case `${PREFIX}_SET_SELECTED`:
			return {
				...state,
				selected : data
			};
		case `${PREFIX}_CHANGE_SAVE_DIR`:
			return {
				...state,
				saveDir : data
			};
		case `${PREFIX}_SET_PATH_PROJECT`:
			return {
				...state,
				pathProject : data
			};
		case `${PREFIX}_SET_PAGE`:
			return {
				...state,
				page : data
			};
		case `${PREFIX}_SET_ROWS_ON_PAGE`:
			return {
				...state,
				rowsPerPage : data
			};
		case `${PREFIX}_SET_ORDER`:
			return {
				...state,
				...data,
			};
		case `${STEPS}_RESET`:
			return {...initialState};

		default:
			return state;
	}
};

export {StepSetting, initialState};



