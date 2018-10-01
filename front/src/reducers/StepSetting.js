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
	orderBy: 'calories',
	selected: [],
	data: [
		createData('Cupcake', 305, 3.7, 67, 4.3),
		createData('Donut', 452, 25.0, 51, 4.9),
		createData('Eclair', 262, 16.0, 24, 6.0),
		createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
		createData('Gingerbread', 356, 16.0, 49, 3.9),
		createData('Honeycomb', 408, 3.2, 87, 6.5),
		createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
		createData('Jelly Bean', 375, 0.0, 94, 0.0),
		createData('KitKat', 518, 26.0, 65, 7.0),
		createData('Lollipop', 392, 0.2, 98, 0.0),
		createData('Marshmallow', 318, 0, 81, 2.0),
		createData('Nougat', 360, 19.0, 9, 37.0),
		createData('Oreo', 437, 18.0, 63, 4.0),
	],
	// data: [
	// 	{
	// 		"name": "ErrorHttp",
	// 		"version": "0.0.1",
	// 		"type": "node",
	// 		"desc": "Extens error for has specified handler.\nExtens error for has specified handler.\nExtens error for has specified handler.",
	// 		"npm": {},
	// 		"classes": {},
	// 		"fileId": "1nNJqJMinkwj2miZN2989dhbXAkl5dwg4",
	// 		"ext": ".js"
	// 	},
	// 	{
	// 		"name": "ErrorValidate",
	// 		"version": "0.0.1",
	// 		"type": "node",
	// 		"desc": "Extends class error for special mark.",
	// 		"npm": {},
	// 		"classes": {},
	// 		"fileId": "12NQaNGTZQR84DL1hofI7ftHspkddpY-a",
	// 		"ext": ".js"
	// 	},
	// 	{
	// 		"name": "ErrorDatabase",
	// 		"version": "0.0.1",
	// 		"type": "node",
	// 		"desc": "Extends class error for special mark.",
	// 		"npm": {},
	// 		"classes": {},
	// 		"fileId": "1HTfH2UcxVZRt9UL4XBJJJDio8wsLniFQ",
	// 		"ext": ".js"
	// 	}
	// ],
	page: 0,
	rowsPerPage: 5,
	errors : {}
};

const StepSetting = (state = initialState, action) => {
	// eslint-disable-next-line
	switch (action.type) {

	}

	return state;
};

export {StepSetting};



