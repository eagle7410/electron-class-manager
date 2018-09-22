import React from 'react';
import {connect} from 'react-redux';
import Panel from '../Panel'
import Button from '@material-ui/core/Button';
import {withStyles} from "@material-ui/core";
import {classes} from "../../const/styles";
import {
	PREFIX_ALERT as ALERT,
	PREFIX_CONNECTION as CONNECTION
} from "../../const/prefix";

import {ICON_TYPES, TYPES} from "../../const/alert";
import ActiveYes from '@material-ui/icons/CheckCircle';
import ActiveNo from '@material-ui/icons/HighlightOff';
import Connect from '@material-ui/icons/CastConnected';
import GetConfig from '@material-ui/icons/GetApp';

import Api from '../../Api'

import {
	COLOR_GREEN,
	COLOR_RED
} from '../../const/colors'

const styles = {
	yes : {color : COLOR_GREEN},
	no  : {color : COLOR_RED},
};

const List= (state) => {

	const { classes } = state;

	let list = <Panel title={`No connection`} key={`cnt_empty`} expanded={false} disabled={true} />;

	if (state.store.list.length) {
		const handlerDelete = async (id) => {
			try {

				await Api.deleteUser(id);

				state.setUsers(await Api.getUsers());

			} catch (e) {
				state.showError(e.message || e);
			}
		};
		const handlerLoadAccessConfig = async (label) => {
			try {
				const {path} = await Api.pathOpen();

				if (!path) return false;

				await Api.accessFileSave({label, path});

			} catch (e) {
				state.showError(e.message || e);
			}
		};

		list = state.store.list.map((connect, inx) => {

			let icon = connect.isInit ? <ActiveYes style={styles.yes} /> : <ActiveNo style={styles.no} />;

			return (
				<Panel title={<div>{icon} Connect to "{connect.label}"</div>} key={`CONNECT_${inx}`} titleBlue={true} expanded={true}>
					<Button variant="contained" color="primary" className={classes.button}
					        disabled={true}
					        onClick={() => handlerDelete(connect.id)}
					>
						<Connect className={classes.leftIcon} />
						Connect
					</Button>
					<Button variant="contained" color="primary" className={classes.button}

					        onClick={() => handlerLoadAccessConfig(connect.label)}
					>
						<GetConfig className={classes.leftIcon} />
						Load access config
					</Button>
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
		setUsers : data => dispatch({type : `${CONNECTION}_SET`, data})
	})
)(withStyles(classes, { withTheme: true })(List))
