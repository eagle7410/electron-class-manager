import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import connect from "react-redux/es/connect/connect";
import {PREFIX_RUNS, PREFIX_CONFIRM} from "../const/prefix";
import Api from '../Api';

const ITEM_HEIGHT = 48;

const Actions = (state) => {

	const open = state.run.isActionsOpen;

	const handlerDelete = () => state.openConfirm(() => {
		Api.deleteById(state.run.id)
			.then(() => state.drop(state.run.id))
			.catch(err => err.message || err );
	});

	const handlerRun = async () => {
		await Api.run(state.run.cmd);
		state.changeOpenActions({inx: state.inx, open : false});
	};

	const handlerRunExit = async () => {
		await Api.runExit(state.run.cmd);
		state.changeOpenActions({inx: state.inx, open : false});
	};
	const handlerSaveChanges = async () => {
		await Api.update(state.run);
		state.changeOpenActions({inx: state.inx, open : false});
	};

	return (
		<span role="actions">
			<IconButton
				aria-label="More"
				onClick={ev => {
					ev.preventDefault();
					ev.target.setAttribute('role', 'actions');
					state.changeOpenActions({inx: state.inx, open : !open});
				}}
				aria-haspopup="true"
			>
				<MoreVertIcon />
			</IconButton>
			<Menu
				id="long-menu"
				open={open}
				PaperProps={{
					style: {
						maxHeight: ITEM_HEIGHT * 4.5,
						width: 200,
					},
				}}
			>
				<MenuItem key={'RUN' + state.inx} role="action" onClick={()=> handlerRun()}>RUN</MenuItem>
				<MenuItem key={'RUN & EXIT' + state.inx} role="action" onClick={()=> handlerRunExit()}>RUN & EXIT</MenuItem>
				<MenuItem key={'SAVE CHANGES' + state.inx} role="action" onClick={() =>handlerSaveChanges()}>SAVE CHANGES</MenuItem>
				<MenuItem key={'DELETE' + state.inx} role="action"onClick={ev => handlerDelete()} >DELETE</MenuItem>
				<Divider/>
				<MenuItem key={'CANCEL ' + state.inx} role="action" onClick={ev => {
					ev.preventDefault();
					ev.target.setAttribute('role', 'actions');
					state.changeOpenActions({inx: state.inx, open : false});
				}}>CANCEL</MenuItem>
			</Menu>
		</span>
	);
};


export default connect(
	state => ({
		store : state.runs,
	}),
	dispatch => ({
		drop : data =>  dispatch({type :`${PREFIX_RUNS}_DROP_RUN`, data}),
		changeOpenActions : (data) => dispatch({type :`${PREFIX_RUNS}_CHANGE_OPEN_ACTIONS`, data}),
		openConfirm       : callOk => dispatch({type :`${PREFIX_CONFIRM}_OPEN`, data : {callOk}})
	})
)(Actions);
