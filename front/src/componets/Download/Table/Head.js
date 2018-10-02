import React from 'react';
import {connect} from 'react-redux';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Tooltip from '@material-ui/core/Tooltip';
import {withStyles} from "@material-ui/core";
import {classes} from "../../../const/styles";
import {PREFIX_STEP_SETTINGS as PREFIX} from '../../../const/prefix'

const EnhancedTableHead = (state) => {
	const { order, orderBy, selected, data, header:rows } = state.store;
	const numSelected = selected.length;
	const rowCount = data.length;

	const onSelectAllClick = (event) => state.setSelected(
		event.target.checked
			? data.map(n => n.fileId)
			: []
	);

	const createSortHandler = property => event => state.setOrder(
		property,
		(orderBy === property && order === 'desc') ? 'asc' : 'desc'
	);

	return (
		<TableHead>
			<TableRow>
				<TableCell padding="checkbox">
					<Checkbox
						indeterminate={numSelected > 0 && numSelected < rowCount}
						checked={numSelected === rowCount}
						onChange={onSelectAllClick}
					/>
				</TableCell>
				{rows.map(row => {
					return (
						<TableCell
							key={row.id}
							numeric={row.numeric}
							padding={row.disablePadding ? 'none' : 'default'}
							sortDirection={orderBy === row.id ? order : false}
						>
							<Tooltip
								title="Sort"
								placement={row.numeric ? 'bottom-end' : 'bottom-start'}
								enterDelay={300}
							>
								<TableSortLabel
									active={orderBy === row.id}
									direction={order}
									onClick={createSortHandler(row.id)}
								>
									{row.label}
								</TableSortLabel>
							</Tooltip>
						</TableCell>
					);
				}, this)}
			</TableRow>
		</TableHead>
	);
};

export default connect(
	state => ({
		store : state.StepSetting,
	}),
	dispatch => ({
		setOrder : (orderBy, order) => dispatch({type : `${PREFIX}_SET_ORDER`, data: {orderBy, order}}),
		setSelected : (selected) => dispatch({type : `${PREFIX}_SET_SELECTED`, data: selected}),
	})
)(withStyles(classes, { withTheme: true })(EnhancedTableHead))
