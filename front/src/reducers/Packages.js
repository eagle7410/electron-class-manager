import {
	PREFIX_PACKAGES as PREFIX,
} from '../const/prefix'

const initialState = {
	itemEdit : {
		name   : '',
		repo   : '',
		branch : '',
	},
	/**
	 * @type {Array<{id: number, name :string, repo: string, branch: string, isNew: bool, isEdit: bool}>}
	 */
	data : [{
		id: Date.now() - 1000,
		branch: "1.0.0",
		name: "Vuetufy",
		repo: "eagle7410/vue-frame",
		isNew: false,
		isEdit: false,
	}],
	isLoad : false,
	loadRow : null,
	isEdit : false,
	order: 'desc',
	orderBy: 'name',
	selected: [],
	header : [
		{ id: 'Action', numeric: false, disablePadding: true, label: '  Actions' },
		{ id: 'name', numeric: false, disablePadding: false, label: 'Name' },
		{ id: 'branch', numeric: false, disablePadding: false, label: 'Version' },
		{ id: 'repo', numeric: false, disablePadding: false, label: 'Repository' },
		{ id: 'id', numeric: false, disablePadding: false, label: 'Adding At' },
	],
	page: 0,
	rowsPerPage: 10,
};

const Packages = (state = initialState, action = {}) => {
	const {data, type} = action;
	let dataUpdate, itemNew, itemEdit;

	switch (type) {
		case `${PREFIX}_TABLE_LOAD`:
			return {
				...state,
				isLoad : true,
				loadRow: data
			};
		case `${PREFIX}_TABLE_LOAD_STOP`:
			return {
				...state,
				isLoad : false,
				loadRow: null
			};
		case `${PREFIX}_ROW_DELETE`:
			return {
				...state,
				data : state.data.filter(i => i.id !== data),
			};
		case `${PREFIX}_EDIT_ROW`:
			dataUpdate = state.data.map(i => {
				if (i.id === data) {
					i.isEdit = true;
					itemEdit = {...i}
				}

				return i;
			});

			return {
				...state,
				isEdit : true,
				data : dataUpdate,
				itemEdit,
			};
		case `${PREFIX}_COMMIT_ROW`:
			return {
				...state,
				isEdit : false,
				data : state.data.map(i => {
					if (i.id === data.rowId) {
						i = {...state.itemEdit};
						i.isNew  = false;
						i.isEdit = false;
					}

					return i;
				}),
			};
		case `${PREFIX}_FIELD_EDIT`:
			itemEdit = {...state.itemEdit};
			itemEdit[data.label] = data.value;
			return {
				...state,
				itemEdit
			};
		case `${PREFIX}_EDIT_CANCEL`:
			itemNew = state.data.find(i => i.id === data);

			if (itemNew.isNew) dataUpdate = state.data.filter(i => i.id !== data);
			else dataUpdate = state.data.map(i => {
				if (i.id === data) {
					i.isEdit = false;
				}

				return i;
			});

			return {
				...state,
				isEdit : false,
				data : [...dataUpdate],
			};
		case `${PREFIX}_ADD_ITEM`:
			let isEdit;
			itemNew = state.data.find(i => i.isNew);

			if (itemNew) {
				state.data.shift();
				isEdit = false;
				dataUpdate = [...state.data];
			} else {
				isEdit = true;
				itemNew = {
					id : Date.now() + 100,
					name : '',
					branch : '',
					repo : '',
					isNew: true,
					isEdit: true,
				};
				dataUpdate = [itemNew,...state.data]
			}

			return {
				...state,
				isEdit,
				order: 'asc',
				orderBy: 'name',
				itemEdit : {...itemNew},
				data : dataUpdate || []
			};
		case `${PREFIX}_SET_ROWS_ON_PAGE`:
			return {
				...state,
				...data,
			};
		case `${PREFIX}_SET_ORDER`:
			return {
				...state,
				...data,
			};
		case `${PREFIX}_INIT`:
			return {
				...state,
				data : data.data.map(d => {
					d.isNew  = false;
					d.isEdit = false;

					return d;
				}),
			};

		default:
			return state;
	}
};

export {Packages};

