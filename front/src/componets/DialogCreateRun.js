import React from 'react';
import {connect} from 'react-redux';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import {
	PREFIX_RUN_CREATE as PREFIX,
	PREFIX_RUNS
} from "../const/prefix";

import Api from "../Api";

const fields = {
	label   : 'Label',
	cmd     : 'Command',
	comment : 'Comment',
};

const DialogCreateRun = (state) => {


	const handlerCreate = async () => {
		try {

			let errors = {}, data = {};

			state.errors(errors);

			Object.keys(fields).map(prop => {
				if (!state.store[prop].length) errors[prop]= `${fields[prop]} is required.`;
				data[prop] = state.store[prop];
			});

			if (Object.keys(errors).length) {
				state.errors(errors);

				return false;
			}

			await Api.add(data);

			state.add(data);
			state.close();

		} catch (err) {
			alert(err.message ? err.message : err);
		}
	};

	return (
		<div>
			<Dialog
				open={state.store.isOpen}
				onClose={state.close}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">{"Create new command for run"}</DialogTitle>
				<DialogContent>
					{Object.keys(fields).map(prop =>
						<div key={`div_create_${prop}`}>
							<TextField
								id={`create_${prop}`}
								key={`create_${prop}`}
								label={fields[prop]}
								value={state.store[prop]}
								onChange={ev => state.input({field : prop, value: ev.target.value})}
								error={!!state.store.errors[prop]}
								helperText={state.store.errors[prop] || ''}
							/>
						</div>
					)}
				</DialogContent>
				<DialogActions>
					<Button onClick={state.close} color="primary" autoFocus>
						Chancel
					</Button>
					<Button onClick={() => handlerCreate()} color="primary" >
						Create
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
};

export default connect(
	state => ({
		store: state.dialogCreateRun
	}),
	dispatch => ({
		add    : (data) => dispatch({type :`${PREFIX_RUNS}_ADD`, data}),
		errors : (data) => dispatch({type :`${PREFIX}_ERRORS`, data}),
		close  : () => dispatch({type :`${PREFIX}_CLOSE`}),
		input  : (data) => dispatch({type :`${PREFIX}_INPUT`, data}),
	})
)(DialogCreateRun);
