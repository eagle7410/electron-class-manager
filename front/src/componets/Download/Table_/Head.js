import React from 'react';
import {connect} from 'react-redux';

import TableHead from '@material-ui/core/TableHead';
import TableSortLabel from '@material-ui/core/TableSortLabel';


import TableRow from "@material-ui/core/TableRow/TableRow";
import TableCell from "@material-ui/core/TableCell/TableCell";
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import Tooltip from "@material-ui/core/Tooltip/Tooltip";

import {withStyles} from "@material-ui/core";
import {classes} from "../../../const/styles";


function desc(a, b, orderBy) {
	if (b[orderBy] < a[orderBy]) {
		return -1;
	}
	if (b[orderBy] > a[orderBy]) {
		return 1;
	}
	return 0;
}

const rows = [
	{ id: 'name', numeric: false, disablePadding: true, label: 'Dessert (100g serving)' },
	{ id: 'calories', numeric: true, disablePadding: false, label: 'Calories' },
	{ id: 'fat', numeric: true, disablePadding: false, label: 'Fat (g)' },
	{ id: 'carbs', numeric: true, disablePadding: false, label: 'Carbs (g)' },
	{ id: 'protein', numeric: true, disablePadding: false, label: 'Protein (g)' },
];

class EnhancedTableHead extends React.Component {
	createSortHandler = property => event => {
		this.props.onRequestSort(event, property);
	};

	render() {
		const { order, orderBy, selected, data } = this.props.store;
		const numSelected = selected.length;
		const rowCount = data.length;

		const handleSelectAllClick = event => {
			// if (event.target.checked) {
			// 	this.setState(state => ({ selected: state.data.map(n => n.id) }));
			// 	return;
			// }
			// this.setState({ selected: [] });
		};


		return (
			<TableHead>
				<TableRow>
					<TableCell padding="checkbox">
						<Checkbox
							indeterminate={numSelected > 0 && numSelected < rowCount}
							checked={numSelected === rowCount}
							onChange={handleSelectAllClick}
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
										onClick={this.createSortHandler(row.id)}
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
	}
}

export default connect(
	state => ({
		store : state.StepSetting,
	}),
	dispatch => ({

	})
)(withStyles(classes, { withTheme: true })(EnhancedTableHead))
