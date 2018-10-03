import {PREFIX_STEP_SETTINGS as PREFIX} from '../const/prefix'

let counter = 0;
function createData(name, calories, fat, carbs, protein) {
	counter += 1;
	return { id: counter, name, calories, fat, carbs, protein };
}
// TODO: Back clear
const defVersion = '0.0.1';
const fileItem = (fileId, name, classes ={}, version = defVersion, npm = {}, type = 'node') => ({
	name,
	fileId,
	classes,
	version,
	npm,
	type,
	desc : `Description ${name}@${version}`
});

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
		fileItem('1nNJqJMinkwj2miZN2989dhbXAkl5dwg4','ErrorHttp'),
		fileItem('12NQaNGTZQR84DL1hofI7ftHspkddpY-a','ErrorValidate'),
		fileItem('1HTfH2UcxVZRt9UL4XBJJJDio8wsLniFQ','ErrorDatabase'),
		fileItem('id1','Model', {ErrorDatabase : defVersion, ErrorValidate: defVersion}),
		fileItem('id2','Controller', {Model : defVersion, ErrorHttp: defVersion}),
		fileItem('id3','ErrorHttp', {}, '0.0.2'),
		fileItem('id4','Controller', {Model : defVersion, ErrorHttp: '0.0.2'}, '0.0.2'),
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

export {StepSetting, initialState};



