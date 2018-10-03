import React from 'react';
import {connect} from 'react-redux'
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';

import Head from './Head'
import Tools from './Tools'
import {PREFIX_STEP_SETTINGS as PREFIX} from "../../../const/prefix";
import {unique} from '../../../tools/helperArray'

const EnhancedTable = state => {
	const { classes } = state;
	const { data, order, orderBy, selected, rowsPerPage, page } = state.store;
	const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

	const addDependency = (classes) => {
		let result = [];

		for(let [name, version] of Object.entries(classes) ) {
			let file = data.find(f => f.name === name && f.version === version);

			if (!file) continue;

			result.push(file.fileId, ...addDependency(file.classes));
		}

		return result;
	};

	const handleClick = (event, id, classes) => {
		const selectedIndex = selected.indexOf(id);
		let newSelected = [...selected];

		if (selectedIndex === -1) {
			newSelected.push(id,...addDependency(classes));
		} else {
			newSelected.splice(selectedIndex, 1);
		}

		state.setSelected(unique(newSelected));
	};

	const handleChangeRowsPerPage = (event) => state.setRowsOnPage(event.target.value);
	const handleChangePage = (event, page) => state.setPage(page);

	return (
		<Paper className={classes.root}>
			<Tools numSelected={selected.length} />
			<div className={classes.tableWrapper}>
				<Table className={classes.table} aria-labelledby="tableTitle">
					<Head />
					<TableBody>
						{stableSort(data, getSorting(order, orderBy))
							.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
							.map(n => {
								const isSelect = selected.includes(n.fileId);

								return (
									<TableRow
										hover
										onClick={event => handleClick(event, n.fileId, n.classes)}
										role="checkbox"
										aria-checked={isSelect}
										tabIndex={-1}
										key={n.fileId}
										selected={isSelect}
									>
										<TableCell padding="checkbox">
											<Checkbox checked={isSelect} />
										</TableCell>
										<TableCell component="th" scope="row" padding="none">
											{n.name}
										</TableCell>
										<TableCell >{n.version}</TableCell>
										<TableCell >{n.type}</TableCell>
										<TableCell >{n.desc}</TableCell>
										<TableCell >{JSON.stringify(n.classes)}</TableCell>
										<TableCell >{JSON.stringify(n.npm)}</TableCell>
									</TableRow>
								);
							})}
						{emptyRows > 0 && (
							<TableRow style={{ height: 49 * emptyRows }}>
								<TableCell colSpan={6} />
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
			<TablePagination
				component="div"
				count={data.length}
				rowsPerPage={rowsPerPage}
				page={page}
				backIconButtonProps={{
					'aria-label': 'Previous Page',
				}}
				nextIconButtonProps={{
					'aria-label': 'Next Page',
				}}
				onChangePage={handleChangePage}
				onChangeRowsPerPage={handleChangeRowsPerPage}
			/>
		</Paper>
	);
};

export default connect(
	state => ({
		store : state.StepSetting,
	}),
	dispatch => ({
		setSelected : (selected) => dispatch({type : `${PREFIX}_SET_SELECTED`, data: selected}),
		setPage : (page) => dispatch({type : `${PREFIX}_SET_PAGE`, data: page}),
		setRowsOnPage : (rowsPerPage) => dispatch({type : `${PREFIX}_SET_ROWS_ON_PAGE`, data: rowsPerPage}),
	})
)(withStyles(theme => ({
	root: {
		width: '100%',
		marginTop: theme.spacing.unit * 3,
	},
	table: {
		minWidth: 1020,
	},
	tableWrapper: {
		overflowX: 'auto',
	},
}))(EnhancedTable))

function desc(a, b, orderBy) {
	if (b[orderBy] < a[orderBy]) {
		return -1;
	}
	if (b[orderBy] > a[orderBy]) {
		return 1;
	}
	return 0;
}

function stableSort(array, cmp) {
	const stabilizedThis = array.map((el, index) => [el, index]);
	stabilizedThis.sort((a, b) => {
		const order = cmp(a[0], b[0]);
		if (order !== 0) return order;
		return a[1] - b[1];
	});
	return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
	return order === 'desc'
		? (a, b) => desc(a, b, orderBy)
		: (a, b) => -desc(a, b, orderBy);
}
