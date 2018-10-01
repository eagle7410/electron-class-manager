import React from "react";
import {connect} from 'react-redux';
import Tooltip from "@material-ui/core/Tooltip/Tooltip";
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from "@material-ui/core/IconButton/IconButton";
import DeleteIcon from "@material-ui/core/SvgIcon/SvgIcon";
import {withStyles} from "@material-ui/core";
import {classes} from "../../../const/styles";
import {lighten} from "@material-ui/core/styles/colorManipulator";
import classNames from 'classnames';
import FilterListIcon from '@material-ui/icons/FilterList';

const toolbarStyles = theme => ({
	root: {
		paddingRight: theme.spacing.unit,
	},
	highlight:
		theme.palette.type === 'light'
			? {
				color: theme.palette.secondary.main,
				backgroundColor: lighten(theme.palette.secondary.light, 0.85),
			}
			: {
				color: theme.palette.text.primary,
				backgroundColor: theme.palette.secondary.dark,
			},
	spacer: {
		flex: '1 1 100%',
	},
	actions: {
		color: theme.palette.text.secondary,
	},
	title: {
		flex: '0 0 auto',
	},
});

let EnhancedTableToolbar = state => {
	const { classes } = state;
	const { selected } = state.store;
	const numSelected = selected.length;

	return (
		<Toolbar
			className={classNames(classes.root, {
				[classes.highlight]: numSelected > 0,
			})}
		>
			<div className={classes.title}>
				{numSelected > 0 ? (
					<Typography color="inherit" variant="subheading">
						{numSelected} selected
					</Typography>
				) : (
					<Typography variant="title" id="tableTitle">
						Classes
					</Typography>
				)}
			</div>
			<div className={classes.spacer} />
			<div className={classes.actions}>
				{numSelected > 0 ? (
					<Tooltip title="Delete">
						<IconButton aria-label="Delete">
							<DeleteIcon />
						</IconButton>
					</Tooltip>
				) : (
					<Tooltip title="Filter list">
						<IconButton aria-label="Filter list">
							<FilterListIcon />
						</IconButton>
					</Tooltip>
				)}
			</div>
		</Toolbar>
	);
};

export default connect(
	state => ({
		store : state.StepSetting,
	}),
	dispatch => ({

	})
)(withStyles(classes, { withTheme: true })(EnhancedTableToolbar))
