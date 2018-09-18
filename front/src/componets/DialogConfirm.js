import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import connect from "react-redux/es/connect/connect";
import {PREFIX_CONFIRM as PREFIX} from "../const/prefix";


const DialogConfirm = (state) => {
	const handlerOk = () => {
		state.store.callOk();
		state.close();
	};

	return (
		<div>
			<Dialog
				open={state.store.isOpen}
				onClose={() => state.close()}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">System.Confirm</DialogTitle>
				<DialogContent>
					{state.store.question}
				</DialogContent>
				<DialogActions>
					<Button onClick={() => state.close()} color="primary">
						CANCEL
					</Button>
					<Button onClick={handlerOk} color="primary" autoFocus>
						OK
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
};

export default connect(
	state => ({
		store : state.dialogConfirm,
	}),
	dispatch => ({
		close : data => dispatch({type :`${PREFIX}_CLOSE`, data})
	})
)(DialogConfirm)
