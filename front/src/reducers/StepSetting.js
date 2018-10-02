import {PREFIX_STEP_SETTINGS as PREFIX} from '../const/prefix'

let counter = 0;
function createData(name, calories, fat, carbs, protein) {
	counter += 1;
	return { id: counter, name, calories, fat, carbs, protein };
}

const initialState = {
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
	data: [
		{
			"name": "ErrorHttp",
			"version": "0.0.1",
			"type": "node",
			"desc": "Extens error for has specified handler.\nExtens error for has specified handler.\nExtens error for has specified handler.",
			"npm": {},
			"classes": {},
			"fileId": "1nNJqJMinkwj2miZN2989dhbXAkl5dwg4",
			"ext": ".js"
		},
		{
			"name": "ErrorValidate",
			"version": "0.0.1",
			"type": "node",
			"desc": "Extends class error for special mark.",
			"npm": {},
			"classes": {},
			"fileId": "12NQaNGTZQR84DL1hofI7ftHspkddpY-a",
			"ext": ".js"
		},
		{
			"name": "ErrorDatabase",
			"version": "0.0.1",
			"type": "node",
			"desc": "Extends class error for special mark.",
			"npm": {},
			"classes": {},
			"fileId": "1HTfH2UcxVZRt9UL4XBJJJDio8wsLniFQ",
			"ext": ".js"
		}
	],
	page: 0,
	rowsPerPage: 5,
	errors : {}
};

const StepSetting = (state = initialState, action) => {
	// eslint-disable-next-line
	switch (action.type) {
		case `${PREFIX}_SET_SELECTED`:
			return {
				...state,
				selected : action.data
			};
		case `${PREFIX}_CHANGE_SAVE_DIR`:
			return {
				...state,
				saveDir : action.data
			};
		case `${PREFIX}_SET_PATH_PROJECT`:
			return {
				...state,
				pathProject : action.data
			};
		case `${PREFIX}_SET_PAGE`:
			return {
				...state,
				page : action.data
			};
		case `${PREFIX}_SET_ROWS_ON_PAGE`:
			return {
				...state,
				rowsPerPage : action.data
			};
		case `${PREFIX}_SET_ORDER`:
			return {
				...state,
				orderBy : action.data.orderBy,
				order : action.data.order,
			};
	}

	return state;
};

export {StepSetting};



