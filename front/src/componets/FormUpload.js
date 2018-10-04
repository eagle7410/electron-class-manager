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
	PREFIX_DIALOG_ADD_TO_JSON as DIALOG_ADD_TO_JSON,
	PREFIX_STEP_SETTINGS as SETTINGS
} from "../const/prefix";
import {ICON_TYPES, TYPES} from "../const/alert";
import DialogAddToJson from "./DialogAddToJson";
import {withStyles} from "@material-ui/core";
import {classes} from "../const/styles";
import LoadAnimation from '../tools/LoadAnimation';
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

	const handlerChangeJson = (item, type) => {
		const newVal = item.updated_src;

		if (!newVal) return false;

		state.formChangeField(type, newVal);

		return true;
	};

	const handlerAddToJson = (field) => state.openDialogDependecy(field);

	const handlerSend = () => {
		state.load();

		setTimeout(async ()=> {
			try {
				let errors = {}, data = {};

				state.errors(errors);

				['path', 'name', 'version', 'type', 'npm', 'classes', 'desc']
					.map(prop => {
						if (!state.form[prop]) errors[prop]= `${prop} is required.`;
						data[prop] = state.form[prop];

						return false;
					});

				if (Object.keys(errors).length) {
					state.errors(errors);

					return false;
				}

				const {file} = await Api.toCloud(data);

				state.addFile(file);

				state.showOk(`File ${file.name}@${file.version} upload ok`);

			} catch (e) {
				console.error(e);
				state.showError(e.message || e);
			} finally {
				state.loadStop();
			}
		});

	};

	const handlerGetPath = async () => {
		try {
			const {path} = await Api.pathOpen({
				filters : [
					{name: 'JavaScripts', extensions: ['js']},
					{name: 'All Files', extensions: ['*']}
				]
			});

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
				helperText={state.form.errors.path || ''}
				error={Boolean(state.form.errors.path)}
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
				helperText={state.form.errors.name || ''}
				error={Boolean(state.form.errors.name)}
				value={state.form.name}
				onChange={(event) => state.formChangeField('name', event.target.value)}
			/>
		</FormControl>

		<FormControl fullWidth={true} margin={'normal'}>
			<TextField
				select
				label="Select type"
				className={classNames(classes.margin, classes.textField)}
				helperText={state.form.errors.type || ''}
				value={state.form.type}
				error={Boolean(state.form.errors.type)}
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
				helperText={state.form.errors.version || ''}
				error={Boolean(state.form.errors.version)}
				className={classNames(classes.margin, classes.textField)}
				variant="outlined"
				label="Version"
				value={state.form.version}
				onChange={(event) => state.formChangeField('version', event.target.value)}
			/>
		</FormControl>

		<FormControl fullWidth={true} margin={'normal'}>
			<TextField
				multiline
				id="upload-version"
				helperText={state.form.errors.desc || ''}
				error={Boolean(state.form.errors.desc)}
				className={classNames(classes.margin, classes.textField)}
				variant="outlined"
				label="Descripton"
				value={state.form.desc}
				onChange={(event) => state.formChangeField('desc', event.target.value)}
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
		{
			!state.form.stateLoad
				? <Button variant="contained" color="primary" className={classes.button}
				          onClick={() => handlerSend()}
				>
					Upload
					<IconToCloud style={{marginLeft: 5}}/>
				</Button>
				: <LoadAnimation />
		}

		<DialogAddToJson />
	</Panel>);
};

export default connect(
	state => ({
		form : state.Upload,
		connect : state.Connections
	}),
	dispatch => ({
		addFile  : (data) => dispatch({type :`${SETTINGS}_ADD_FILE`, data}),
		load     : () => dispatch({type :`${FORM}_IS_LOAD_RUN`}),
		loadStop : () => dispatch({type :`${FORM}_IS_LOAD_STOP`}),
		errors : (data) => dispatch({type :`${FORM}_ERRORS`, data}),
		openDialogDependecy: (type) => dispatch({type : `${DIALOG_ADD_TO_JSON}_OPEN`, data : type }),
		formChangeField : (field, value) => dispatch({type : `${FORM}_CHANGE_FIELD`, data : {field, value}}),
		formAddToJson : (field) => dispatch({type : `${FORM}_ADD_TO_JSON`, data : field}),
		showOk : message => dispatch({
			type : `${ALERT}_OPEN`,
			data : {
				message,
				showIcon : ICON_TYPES.OK,
				type : TYPES.OK
			}
		}),
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
