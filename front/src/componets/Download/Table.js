import React from 'react';
import {connect} from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import Head from './Table/Head'
import Tools from './Table/Tools'

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import {classes} from "../../const/styles";

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
	return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

const EnhancedTable = (state) => {
	const { classes } = state;
	const { data, order, orderBy, selected, rowsPerPage, page } = state.store;

	const handleRequestSort = (event, property) => {
		const stateOrderBy = orderBy;
		const stateOrder = order;
		const orderBy = property;
		let order = 'desc';

		if (stateOrderBy === property && stateOrder === 'desc') {
			order = 'asc';
		}

		// this.setState({ order, orderBy });
	};



	const handleClick = (event, id) => {
		// const { selected } = this.state;
		// const selectedIndex = selected.indexOf(id);
		// let newSelected = [];
		//
		// if (selectedIndex === -1) {
		// 	newSelected = newSelected.concat(selected, id);
		// } else if (selectedIndex === 0) {
		// 	newSelected = newSelected.concat(selected.slice(1));
		// } else if (selectedIndex === selected.length - 1) {
		// 	newSelected = newSelected.concat(selected.slice(0, -1));
		// } else if (selectedIndex > 0) {
		// 	newSelected = newSelected.concat(
		// 		selected.slice(0, selectedIndex),
		// 		selected.slice(selectedIndex + 1),
		// 	);
		// }
		//
		// this.setState({ selected: newSelected });
	};

	const handleChangePage = (event, page) => {
		//this.setState({ page });
	};

	const handleChangeRowsPerPage = event => {
		// this.setState({ rowsPerPage: event.target.value });
	};

	const isSelected = id => selected.indexOf(id) !== -1;

	const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

	return (
		<Paper className={classes.root}>
			<Tools />
			<div className={classes.tableWrapper}>
				<Table className={classes.table} aria-labelledby="tableTitle">
					<Head />
					{/*<EnhancedTableHead*/}
						{/*numSelected={selected.length}*/}
						{/*order={order}*/}
						{/*orderBy={orderBy}*/}
						{/*onSelectAllClick={this.handleSelectAllClick}*/}
						{/*onRequestSort={this.handleRequestSort}*/}
						{/*rowCount={data.length}*/}
					{/*/>*/}
					<TableBody>
						{stableSort(data, getSorting(order, orderBy))
							.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
							.map(n => {
								const isSelect = isSelected(n.id);

								return (
									<TableRow
										hover
										onClick={event => this.handleClick(event, n.id)}
										role="checkbox"
										aria-checked={isSelect}
										tabIndex={-1}
										key={n.id}
										selected={isSelect}
									>
										<TableCell padding="checkbox">
											<Checkbox checked={isSelect} />
										</TableCell>
										<TableCell component="th" scope="row" padding="none">
											{n.name}
										</TableCell>
										<TableCell numeric>{n.calories}</TableCell>
										<TableCell numeric>{n.fat}</TableCell>
										<TableCell numeric>{n.carbs}</TableCell>
										<TableCell numeric>{n.protein}</TableCell>
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
}

export default connect(
	state => ({
		store : state.StepSetting,
	}),
	dispatch => ({

	})
)(withStyles(classes, { withTheme: true })(EnhancedTable))
