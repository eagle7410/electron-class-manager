import React from 'react'
import {connect} from 'react-redux'
import {withStyles} from "@material-ui/core";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Tooltip from "@material-ui/core/Tooltip";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import OkIcon from '@material-ui/icons/Check';
import CancelIcon from '@material-ui/icons/Clear';
import Api from '../../../Api';
import LoadAnimation from '../../../tools/LoadAnimation';

import {
	PREFIX_ALERT as ALERT,
	PREFIX_PACKAGES as PREFIX
} from '../../../const/prefix'
import {ICON_TYPES, TYPES} from "../../../const/alert";

const RowEdit = (state) => {
	const { store, row} = state;
	const { itemEdit, isLoad, loadRow } = store;

	const errorMessage = (field, val) => `Invalid ${field}: ${val}`;

	const handlerSave = async () => {
		state.load(row.id);
		try {
			let pack = {id: row.id};

			for (const field of ['name', 'branch', 'repo']) {
				if (!itemEdit[field] || !itemEdit[field].length) {
					throw new Error(errorMessage(field, row[field]))
				}

				pack[field] = itemEdit[field];
			}

			await Api.packageSave(pack);

			state.commit(row.id);
		} catch (e) {
			state.showError(e.message || e);
		} finally {
			state.loadStop();
		}
	};

	return (
		<TableRow
			hover
			tabIndex={-1}
			key={'row' + row.id}
		>
			<TableCell colSpan={2}>
				{
					isLoad && loadRow === row.id
					 ? <LoadAnimation/>
					 : [
							(
								<Tooltip title="Save changes" key={`${row.id}_sc`}>
									<IconButton aria-label="Save changes" onClick={handlerSave}>
										<OkIcon/>
									</IconButton>
								</Tooltip>
							),
							(
								<Tooltip title="Cancel" key={`${row.id}_c`}>
									<IconButton aria-label="Cancel" onClick={() => state.cancel(row.id)}>
										<CancelIcon />
									</IconButton>
								</Tooltip>
							),
					]
				}

			</TableCell>
			<TableCell component="th" scope="row" padding="none">
				<TextField
					label={'Name'}
					value={itemEdit.name}
					onChange={(ev) => state.editField('name', row.id, ev.target.value)}
				/>
			</TableCell>
			<TableCell >
				<TextField
					label={'Version'}
					value={itemEdit.branch}
					onChange={(ev) => state.editField('branch', row.id, ev.target.value)}
				/>
			</TableCell>
			<TableCell >
				<TextField
					label={'Repository'}
					value={itemEdit.repo}
					onChange={(ev) => state.editField('repo', row.id, ev.target.value)}
				/>
			</TableCell>
			<TableCell >{(new Date(row.id)).toISOString()}</TableCell>
		</TableRow>
	);
}

export default connect(
	state => ({
		store : state.Packages,
	}),
	dispatch => ({
		load      : (data) => dispatch({type : `${PREFIX}_TABLE_LOAD`, data}),
		loadStop  : () => dispatch({type : `${PREFIX}_TABLE_LOAD_STOP`}),
		cancel    : (data) => dispatch({type : `${PREFIX}_EDIT_CANCEL`, data}),
		editField : (label, id, value) => dispatch({type : `${PREFIX}_FIELD_EDIT`, data: {label, id, value}}),
		commit    : (rowId) => dispatch({type : `${PREFIX}_COMMIT_ROW`, data: {rowId}}),
		showError : message => dispatch({
			type : `${ALERT}_OPEN`,
			data : {
				message,
				showIcon : ICON_TYPES.BAD,
				type : TYPES.BAD
			}
		})
	})
)(withStyles(theme => ({}))(RowEdit))
