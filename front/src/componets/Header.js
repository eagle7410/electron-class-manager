import React from 'react';
import connect from "react-redux/es/connect/connect";
import classNames from 'classnames';
import Toolbar from "@material-ui/core/Toolbar/Toolbar";
import IconButton from "@material-ui/core/IconButton/IconButton";
import MenuIcon from '@material-ui/icons/Menu';
import Typography from "@material-ui/core/Typography/Typography";
import AppBar from "@material-ui/core/AppBar/AppBar";

import {PREFIX_MENU as PREFIX} from "../const/prefix";
import {withStyles} from "@material-ui/core";
import {classes} from '../const/styles'

const Header = (state) => {

	const { classes } = state;

	// eslint-disable-next-line
	return (
		<AppBar
			position="absolute"
			className={classNames(classes.appBar, state.store.open && classes.appBarShift)}
		>
			<Toolbar disableGutters={!state.store.open}>
				<IconButton
					color="inherit"
					aria-label="Open drawer"
					onClick={state.open}
					className={classNames(classes.menuButton, state.store.open && classes.hide)}
				>
					<MenuIcon />
				</IconButton>
				<Typography variant="title" color="inherit" noWrap>
					Socket IO tools. Power by <a
						href="https://drive.google.com/file/d/1tm6j8uGoeEbaVDYKlsQlkkxAD5WMXp3-/view?usp=sharing"
						style={{color:"red"}}
						target="_blank  "
					>Igor Stcherbina</a>
				</Typography>
			</Toolbar>
		</AppBar>
	);
};

export default connect(
	state => ({
		store : state.Menu,
	}),
	dispatch => ({
		open  : () => dispatch({type :`${PREFIX}_OPEN`})
	})
)(withStyles(classes, { withTheme: true })(Header))
