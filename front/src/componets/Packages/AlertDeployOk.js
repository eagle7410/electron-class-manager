
import React from 'react';
import {connect} from 'react-redux';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import {
	PREFIX_ALERT_DEPLOY_OK as PREFIX
} from '../../const/prefix';


const AlertDeployOk = (state) => {
	const { store } = state;
	const { isOpen, path,  repo, branch, newRepo } = store;

	return (
		<div>
			<Dialog
				open={isOpen}
				onClose={state.close}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">{`Deploy ${repo}@${branch} is OK`}</DialogTitle>
				<DialogContent>
						<div>This package has repository.</div>
						<div>For remove: </div>
						<pre>{`rm -R ${path}/.git && cd ${path}`}</pre>
						<div>Or add to new repo:</div>
						<TextField label={'New repo'} value={newRepo} onChange={state.changeNewRepo} />
						<pre>{`cd ${path} && git remote set-url origin ${newRepo}.git && git remote -v`}</pre>
				</DialogContent>
				<DialogActions>
					<Button onClick={state.close} color="primary" autoFocus>Ok</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
};

export default connect(
	state => ({
		store: state.AlertDeployOk
	}),
	dispatch => ({
		close : () => dispatch({type : `${PREFIX}_CLOSE`}),
		changeNewRepo : (ev) => dispatch({type : `${PREFIX}_CHANGE_NEW_REPO`, data: ev.target.value}),
	}),
)(AlertDeployOk);
