import React from 'react';
import {connect} from 'react-redux';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import classNames from 'classnames';

import {
	PREFIX_DIALOG_ADD_CLASS_DEPENDENCY as PREFIX,
} from "../../const/prefix";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import {withStyles} from "@material-ui/core";
import {classes} from "../../const/styles";


const fields = {
	prop   : 'Dependency',
	value     : 'Version',
};

const DialogAddClassDependency = (state) => {
	const {classes} = state;
	const handlerCreate = async () => {
		try {

			let errors = {}, data = {type :state.store.type};

			state.errors(errors);

			Object.keys(fields).map(prop => {
				if (!state.store[prop].length) errors[prop]= `${fields[prop]} is required.`;
				data[prop] = state.store[prop].trim();

				return false;
			});

			if (Object.keys(errors).length) {
				state.errors(errors);

				return false;
			}

			state.add(data);
			state.close();

		} catch (err) {
			alert(err.message ? err.message : err);
		}
	};


	const classStore = new Set();
	const versionList = [];

	state.settings.data.map(({name, version}) => {
		classStore.add(name);

		if(state.store.prop && name === state.store.prop)
			versionList.push(
				<MenuItem key={`ver_${name}_${version}`} value={version}>
					{version}
				</MenuItem>
			);

		return true;
	});

	const classList = [];
	for (let name of classStore.values())
		classList.push(
			<MenuItem key={`class_${name}`} value={name}>
				{name}
			</MenuItem>
		)

	return (
		<div>
			<Dialog
				open={state.store.isOpen}
				onClose={state.close}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">{`Add dependence to ${state.store.type}`}</DialogTitle>
				<DialogContent>
					<div>
						<TextField
							select
							fullWidth
							label="Select class"
							className={classNames(classes.margin, classes.textField)}
							error={!!state.store.errors.prop}
							helperText={state.store.errors.prop || ''}
							value={state.store.prop}
							onChange={(event) => state.input({field:'prop', value :event.target.value})}
						>
							{classList}
						</TextField>
					</div>
					<div>
						<TextField
							select
							fullWidth
							label="Select version"
							className={classNames(classes.margin, classes.textField)}
							error={!!state.store.errors.value}
							helperText={state.store.errors.value || ''}
							value={state.store.value}
							onChange={(event) => state.input({field:'value', value :event.target.value})}
						>
							{versionList}
						</TextField>
					</div>

				</DialogContent>
				<DialogActions>
					<Button onClick={state.close} color="primary" autoFocus>
						Chancel
					</Button>
					<Button onClick={() => handlerCreate()} color="primary" >
						ADD DEPENDENCY
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
};

export default connect(
	state => ({
		store: state.DialogAddClassDependency,
		settings: state.StepSetting
	}),
	dispatch => ({
		add    : (data) => dispatch({type :`${PREFIX}_ADD`, data}),
		errors : (data) => dispatch({type :`${PREFIX}_ERRORS`, data}),
		close  : () => dispatch({type :`${PREFIX}_CLOSE`}),
		input  : (data) => dispatch({type :`${PREFIX}_INPUT`, data}),
	})
)(withStyles(classes, { withTheme: true })(DialogAddClassDependency))
