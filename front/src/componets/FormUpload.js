import React from 'react';
import {connect} from 'react-redux';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Panel from './Panel'
import ReactJson from 'react-json-view'
import Api from "../Api";
import {
	PREFIX_ALERT as ALERT,
	PREFIX_SEND_FORM as FORM,
	PREFIX_DIALOG_ADD_TO_JSON as DIALOG_ADD_TO_JSON
} from "../const/prefix";
import {ICON_TYPES, TYPES} from "../const/alert";
import DialogAddToJson from "./DialogAddToJson";
import {withStyles} from "@material-ui/core";
import {classes} from "../const/styles";

import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import GetPath from '@material-ui/icons/GetApp';
import classNames from 'classnames';
import IconToCloud from '@material-ui/icons/CloudUpload';
import IconAddToList from '@material-ui/icons/PlaylistAdd';
import MenuItem from '@material-ui/core/MenuItem';

const FormUpload = (state) => {
	const {classes} = state;
	const ranges = Object.keys(state.connect.fileTypes)
		.map(value => ({
			value,
			label : value.substring(0, 1).toUpperCase() + value.substring(1)
		}));
	const handlerChangeField = (field, ev) =>
		state.formChangeField(field, ev.target.value);

	const handlerChangeJson = (item, type) => {
		const newVal = item.updated_src;

		if (!newVal) return false;

		state.formChangeField(type, newVal);

		return true;
	};

	const handlerAddToJson = (field) => state.openDialogDependecy(field);

	const handlerSend = async () => {
		try {
			await Api.send(state.form);
		} catch (e) {
			state.showError(e.message || e);
		}
	};
	const handlerGetPath = async () => {
		try {
			const {path} = await Api.pathOpen();

			if (!path) return false;

			state.formChangeField('path', path);

		} catch (e) {
			state.showError(e.message || e);
		}
	};

	return (<Panel title={'Load to store'} expanded={true}>

		<FormControl fullWidth={true} margin={'normal'}>
			<TextField
				id="upload-path"
				disabled={true}
				className={classNames(classes.margin, classes.textField)}
				variant="outlined"
				label="File upload"
				value={state.form.path}
				InputProps={{
					startAdornment: (
						<InputAdornment position="start">
							<IconButton
								aria-label="Get path"
								onClick={handlerGetPath}
							>
								<GetPath />
							</IconButton>
						</InputAdornment>
					),
				}}
			/>
		</FormControl>

		<FormControl fullWidth={true} margin={'normal'}>
			<TextField
				id="upload-name"
				className={classNames(classes.margin, classes.textField)}
				variant="outlined"
				label="Class name"
				value={state.form.name}
			/>
		</FormControl>

		<FormControl fullWidth={true} margin={'normal'}>
			<TextField
				select
				label="Select type"
				className={classNames(classes.margin, classes.textField)}
				value={state.form.type}
				onChange={(event) => state.formChangeField('type', event.target.value)}
			>
				{ranges.map(option => (
					<MenuItem key={option.value} value={option.value}>
						{option.label}
					</MenuItem>
				))}
			</TextField>
		</FormControl>

		<FormControl fullWidth={true} margin={'normal'}>
			<TextField
				id="upload-version"
				className={classNames(classes.margin, classes.textField)}
				variant="outlined"
				label="Version"
				value={state.form.version}
				onChange={(event) => state.formChangeField('version', event.target.value)}
			/>
		</FormControl>

		<FormControl fullWidth={true} margin={'normal'}>
			<Button variant="contained" color="primary" className={classes.button}
			        onClick={() => handlerAddToJson('npm')}
			>
				<IconAddToList /> ADD NPM DEPENDENCIES
			</Button>
			<ReactJson src={state.form.npm}
			           style={{marginBottom : 10}}
			           name="NPM"
			           onEdit={(item) => handlerChangeJson(item, 'npm')}
			           onDelete={(item) => handlerChangeJson(item, 'npm')}
			/>
		</FormControl>
		<FormControl fullWidth={true} margin={'normal'}>
			<Button variant="contained" color="primary" className={classes.button}
			        onClick={() => handlerAddToJson('classes')}
			>
				<IconAddToList /> ADD CLASS STORE DEPENDENCIES
			</Button>
			<ReactJson src={state.form.classes}
			           name="CLASSES IN STORE"
			           onEdit={(item) => handlerChangeJson(item, 'classes')}
			           onDelete={(item) => handlerChangeJson(item, 'classes')}
			/>
		</FormControl>
		<Button variant="contained" color="primary" className={classes.button}
		        onClick={handlerSend}
		>
			Upload
			<IconToCloud style={{marginLeft: 5}}/>
		</Button>
		<DialogAddToJson />
	</Panel>);
};

export default connect(
	state => ({
		form : state.Upload,
		connect : state.Connections
	}),
	dispatch => ({
		openDialogDependecy: (type) => dispatch({type : `${DIALOG_ADD_TO_JSON}_OPEN`, data : type }),
		formChangeField : (field, value) => dispatch({type : `${FORM}_CHANGE_FIELD`, data : {field, value}}),
		formAddToJson : (field) => dispatch({type : `${FORM}_ADD_TO_JSON`, data : field}),
		showError : message => dispatch({
			type : `${ALERT}_OPEN`,
			data : {
				message,
				showIcon : ICON_TYPES.BAD,
				type : TYPES.BAD
			}
		})
	})
)(withStyles(classes, { withTheme: true })(FormUpload))
