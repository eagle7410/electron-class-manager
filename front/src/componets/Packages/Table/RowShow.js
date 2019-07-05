import React from 'react'
import {connect} from 'react-redux'
import {
	PREFIX_ALERT as ALERT,
	PREFIX_ALERT_DEPLOY_OK as DEPLOY_OK,
	PREFIX_PACKAGES as PREFIX} from "../../../const/prefix";
import {withStyles} from "@material-ui/core";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";

import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import GetPathIcon from '@material-ui/icons/GetApp';
import {ICON_TYPES, TYPES} from "../../../const/alert";
import Api from "../../../Api";
import LoadAnimation from '../../../tools/LoadAnimation';

const RowShow = (state) => {
	const { git, store, row, disabled} = state;
	const { isLoad, loadRow } = store;
	const { login, pass } = git;
	const { branch, repo} = row;

	const handleDownload = async () => {
		try {

			if (!repo) throw new Error('No repository');
			if (!branch) throw new Error('No version');
			if (!login) throw new Error('No github login');
			if (!pass) throw new Error('No github password');


			const {path} = await Api.pathOpen({
				openDirectory : true,
				openFile :false,
				filters : [],
				properties: ['openDirectory']
			});


			state.load();

			await Api.packageDeploy({login, path, branch, pass, repo});

			state.deployOk({path, repo, branch});

			if (!path) return false;
		} catch (e) {
			state.showError(e.message || e);
		} finally {
			state.loadStop();
		}

	};

	const handleEdit = () => {
		state.edit(row.id)
	};

	const handleDelete = async () => {
		state.load(row.id);

		try {
			await Api.packageMove({id : row.id});
			state.delete(row.id);
		} catch (e) {
			state.showError(e.message || e);
		} finally {
			state.loadStop();
		}
	};

	const style = disabled ? {background: 'rgba(0, 0, 0, .28)'} : {};

	return (
		<TableRow
			hover
			tabIndex={-1}
			key={row.id}
		>
			<TableCell style={style}>
				{
					isLoad && loadRow === row.id
						? <LoadAnimation/>
						: [
							(
								<Tooltip title="Delete"  key={row.id + '_tl_delete'}>
									<IconButton aria-label="Delete" onClick={handleDelete} disabled={disabled} key={row.id + '_delete'}>
										<DeleteIcon key={row.id + '_ico_delete'}/>
									</IconButton>
								</Tooltip>
							),
							(
								<Tooltip title="Edit" key={row.id + '_tl_edit'}>
									<IconButton aria-label="Edit" onClick={handleEdit}  disabled={disabled} key={row.id + '_edit'}>
										<EditIcon key={row.id + '_ico_edit'}/>
									</IconButton>
								</Tooltip >
							),
							(
								<Tooltip title="Download" key={row.id + '_tl_download'}>
									<IconButton aria-label="Download" disabled={disabled} onClick={() => handleDownload()} key={row.id + '_download'}>
										<GetPathIcon key={row.id + '_ico_download'}/>
									</IconButton>
								</Tooltip>
							),
						]
				}
			</TableCell>
			<TableCell component="th" scope="row" padding="none" style={style} >
				{row.name}
			</TableCell>
			<TableCell style={style}>{row.branch}</TableCell>
			<TableCell style={style}>{row.repo}</TableCell>
			<TableCell style={style}>{(new Date(row.id)).toISOString()}</TableCell>
		</TableRow>
	);
}

export default connect(
	state => ({
		store : state.Packages,
		git   : state.Github,
	}),
	dispatch => ({
		load      : (data) => dispatch({type : `${PREFIX}_TABLE_LOAD`, data}),
		loadStop  : () => dispatch({type : `${PREFIX}_TABLE_LOAD_STOP`}),
		edit      : (rowId) => dispatch({type : `${PREFIX}_EDIT_ROW`, data: rowId}),
		deployOk  : (data) => dispatch({type : `${DEPLOY_OK}_OPEN`, data}),
		delete    : (rowId) => dispatch({type : `${PREFIX}_ROW_DELETE`, data: rowId}),
		showError : message => dispatch({
			type : `${ALERT}_OPEN`,
			data : {
				message,
				showIcon : ICON_TYPES.BAD,
				type : TYPES.BAD
			}
		})
	})
)(withStyles(theme => ({}))(RowShow))
