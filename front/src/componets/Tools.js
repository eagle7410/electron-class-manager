import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import connect from "react-redux/es/connect/connect";
import {PREFIX_RUN_CREATE as PREFIX} from "../const/prefix";

const Tools = (state)  => {
	return (
		<AppBar position="static">
			<Toolbar>
				<Button color="inherit" onClick={state.open}>Create command</Button>
			</Toolbar>
		</AppBar>
	);
};

export default connect(
	state => ({
		store: state.dialogCreateRun
	}),
	dispatch => ({
		open : () => dispatch({type :`${PREFIX}_OPEN`}),
	})
)(Tools);

