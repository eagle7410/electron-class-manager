import React from 'react';
import {connect} from 'react-redux';
import Panel from '../Panel'
import Button from '@material-ui/core/Button';
import FormControl from "@material-ui/core/FormControl/FormControl";
import TextField from "@material-ui/core/TextField/TextField";
import {classes} from "../../const/styles";
import SaveIcon from '@material-ui/icons/Save';
import {
	PREFIX_ALERT as ALERT,
	PREFIX_CONNECTION_ADD as PREFIX
} from '../../const/prefix'
import {ICON_TYPES, TYPES} from "../../const/alert";
import Api from '../../Api'
import ReactJson from "react-json-view";

const Actions = (state) => {
	const store = state.store;
	const connect  = store.newItem;

	const handlerSave = async () => {
		try {
			let errors = {};
			state.errors(errors);

			for (let prop of ['label', 'url', 'path'])
				if (!connect[prop].length) errors[prop] = `${prop} is required`;

			if (Object.keys(errors).length)
				return state.errors(errors);

			const data = await Api.addConnect(connect);

			state.addConnect(data);

		} catch (e) {
			state.showError(e.message || e);
		}
	};

	const handlerChangeJson = (item) => {
		const newVal = item.updated_src;

		if (!newVal) return false;

		state.onInput('query', newVal);

		return true;
	};

	return (
		<div>
			<Panel title={`Add new connect`} key={`connect_new`} titleBlue={true}>
				<FormControl fullWidth={true} margin={'normal'}>
					<TextField
						onChange={event => state.onInput('label', event.target.value)}
						value={connect.label}
						error={store.errors.label}
						helperText={store.errors.label ? store.errors.label: "label"}
					/>
				</FormControl>
				<FormControl fullWidth={true} margin={'normal'}>
					<TextField
						onChange={event => state.onInput('url', event.target.value)}
						value={connect.url}
						error={store.errors.url}
						helperText={store.errors.url ? store.errors.url: "url"}
					/>
				</FormControl>
				<FormControl fullWidth={true} margin={'normal'}>
					<TextField
						onChange={event => state.onInput('path', event.target.value)}
						value={connect.path}
						error={store.errors.path}
						helperText={store.errors.path ? store.errors.path: "path"}
					/>
				</FormControl>
				<FormControl fullWidth={true} margin={'normal'}>
					<ReactJson src={connect.query}
					           name="query"
					           onEdit={handlerChangeJson}
					           onAdd={handlerChangeJson}
					           onDelete={handlerChangeJson}
					/>
				</FormControl>
				<Button variant="contained" color="primary" className={classes.button}
				        onClick={() => handlerSave()}
				>
					<SaveIcon className={classes.leftIcon} />
					Save
				</Button>
			</Panel>
		</div>
	);
};

export default connect(
	state => ({store: state.Connections}),
	dispatch => ({
		addConnect : user => dispatch({type :PREFIX, data: user}),
		showError : message => dispatch({
			type : `${ALERT}_OPEN`,
			data : {
				message,
				showIcon : ICON_TYPES.BAD,
				type : TYPES.BAD
			}
		}),
		errors  : (errors = {}) => dispatch({type :`${PREFIX}_ERRORS`, data: errors}),
		onInput : (field, value) => dispatch({type : `${PREFIX}_INPUT`, field, value}),
	})
)(Actions);
