import React from 'react';
import {connect} from 'react-redux';
import Panel from '../Panel'
import TextField from "@material-ui/core/TextField/TextField";
import FormControl from "@material-ui/core/FormControl/FormControl";
import Button from '@material-ui/core/Button';
import {withStyles} from "@material-ui/core";
import {classes} from "../../const/styles";
import {
	PREFIX_ALERT as ALERT,
	PREFIX_CONNECTION as USERS
} from "../../const/prefix";

import {ICON_TYPES, TYPES} from "../../const/alert";
import DeleteIcon from '@material-ui/icons/Delete';
import Api from '../../Api'
import ReactJson from "react-json-view";

const List= (state) => {

	let list = <Panel title={`No users`} key={`usr_empty`} expanded={false} disabled={true} />;

	if (state.store.list.length) {
		const handlerDelete = async (id) => {
			try {

				await Api.deleteUser(id);

				state.setUsers(await Api.getUsers());

			} catch (e) {
				state.showError(e.message || e);
			}
		};

		list = state.store.list.map((connect, inx) => {
			return (
				<Panel title={`Connect : "${connect.label}"`} key={`CONNECT_${inx}`}>
					<Button variant="contained" color="secondary" className={classes.button}
					        onClick={() => handlerDelete(connect.id)}
					>

						<DeleteIcon className={classes.leftIcon} />
						Delete
					</Button>

					<FormControl fullWidth={true} margin={'normal'}>
						<TextField
							key={`CONNECT_${inx}_url`}
							value={connect.url}
							helperText="url"
						/>
					</FormControl>
					<FormControl fullWidth={true} margin={'normal'}>
						<TextField
							key={`CONNECT_${inx}_path`}
							value={connect.path}
							helperText="path"
						/>
					</FormControl>
					<FormControl fullWidth={true} margin={'normal'}>
						<ReactJson src={connect.query}
						           name={`query`}
						/>
					</FormControl>
				</Panel>
			);
		});
	}

	return (<div>{list}</div>);
};

export default connect(
	state => ({
		store: state.Connections,
	}),
	dispatch => ({
		showError : message => dispatch({
			type : `${ALERT}_OPEN`,
			data : {
				message,
				showIcon : ICON_TYPES.BAD,
				type : TYPES.BAD
			}
		}),
		setUsers : data => dispatch({type : `${USERS}_SET`, data})
	})
)(withStyles(classes, { withTheme: true })(List))
