import React from 'react';
import {connect} from 'react-redux';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Tooltip from '@material-ui/core/Tooltip';
import {withStyles} from "@material-ui/core";
import {classes} from "../../../const/styles";
import {PREFIX_PACKAGES as PREFIX} from '../../../const/prefix'

const EnhancedTableHead = (state) => {
	const { order, orderBy, header:rows } = state.store;
	const createSortHandler = property => event => state.setOrder(
		property,
		(orderBy === property && order === 'desc') ? 'asc' : 'desc'
	);

	return (
		<TableHead>
			<TableRow>
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
									<span style={{paddingLeft: 10}}>{row.label}</span>
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
		store : state.Packages,
	}),
	dispatch => ({
		setOrder : (orderBy, order) => dispatch({type : `${PREFIX}_SET_ORDER`, data: {orderBy, order}}),
	})
)(withStyles(classes, { withTheme: true })(EnhancedTableHead))
