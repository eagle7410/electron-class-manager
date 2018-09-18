
import React from 'react';
import {withRouter} from 'react-router'
import ListItemIcon from "@material-ui/core/ListItemIcon/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import ListItem from "@material-ui/core/ListItem/ListItem";
import connect from "react-redux/es/connect/connect";
import {withStyles} from "@material-ui/core";
import {classes} from "../const/styles";


const MenuMainItem = (state) => {
	const selected = state.path === state.store.location.pathname;

	let style = {};

	if (selected) style = {backgroundColor:'rgb(218, 218, 218)'};

	return (
		<ListItem button
		          style={style}
		          onClick={() => state.history.push(state.path) }

		>
			<ListItemIcon>
				{state.children}
			</ListItemIcon>
			<ListItemText primary={state.label || "Unknown"} />
		</ListItem>
	);
};

export default connect(
	state => ({
		store : state.Menu
	}),
	dispatch => ({

	})
)(withRouter(withStyles(classes, { withTheme: true })(MenuMainItem)));
