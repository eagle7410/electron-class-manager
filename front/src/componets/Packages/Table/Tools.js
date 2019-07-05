import Toolbar from "@material-ui/core/Toolbar/Toolbar";
import Typography from "@material-ui/core/Typography/Typography";
import {withStyles} from "@material-ui/core";
import React from "react";
import TextField from "@material-ui/core/TextField";
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import AddBoxIcon from '@material-ui/icons/AddBox';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import classNames from 'classnames';
import connect from "react-redux/es/connect/connect";
import {
	PREFIX_PACKAGES as PREFIX
} from '../../../const/prefix'

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
		flex: '1 1 60%',
	},
	actions: {
		color: theme.palette.text.secondary,
	},
	title: {
		flex: '0 0 auto',
	},
});

const EnhancedTableToolbar = state => {
	const { classes } = state;
	const { selected, data, isEdit, search } = state.store;
	const numData = data.length;
	const numSelected = selected.length;

	const handlerAdd = () => {
		if (isEdit && !data[0].isNew) return false;
		state.add();
	}

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
						List
					</Typography>
				)}
			</div>
			<div className={classes.spacer} />
			<div className={classes.actions}>
				{
					numData
						? <TextField
							label={'Search'}
							value={search}
							onChange={state.changeSearch}
						/>
						: null
				}

				<Tooltip title="Add to list">
					<IconButton aria-label="Add to list" onClick={handlerAdd}>
						<AddBoxIcon />
					</IconButton>
				</Tooltip>
			</div>
		</Toolbar>
	);
};

export default connect(
	state => ({
		store : state.Packages,
	}),
	dispatch => ({
		add : () => dispatch({type : `${PREFIX}_ADD_ITEM`}),
		changeSearch : (ev) => dispatch({type : `${PREFIX}_CHANGE_SEARCH`, data: ev.target.value}),
	})
)(withStyles(toolbarStyles)(EnhancedTableToolbar))
