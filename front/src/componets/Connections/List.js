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

const List = (state) => {

	const { classes } = state;

	let list = <Panel title={`No connection`} key={`cnt_empty`} expanded={false} disabled={true} />;

	if (state.store.list.length) {

		const handlerConnection = async (alias) => {
			try {
				const {isConnected} = await Api.cloudConnect({alias});

				if (!isConnected) new Error(`Problem with connect`);

				state.connected(alias);
			} catch (e) {
				state.showError(e.message || e);
			}
		}

		const handlerLoadAccessConfig = async (alias) => {
			try {
				const {path} = await Api.pathOpen();

				if (!path) return false;

				await Api.accessFileSave({alias, path});

				state.hasConfig(alias);

			} catch (e) {
				state.showError(e.message || e);
			}
		};

		list = state.store.list.map((connect, inx) => {

			let icon = connect.isInit ? <ActiveYes style={styles.yes} /> : <ActiveNo style={styles.no} />;

			return (
				<Panel title={<div>{icon} Connect to "{connect.label}"</div>} key={`CONNECT_${inx}`} titleBlue={true} expanded={true}>
					<Button variant="contained" color="primary" className={classes.button}
					        disabled={!connect.isHasConfig || connect.isInit}
					        onClick={() => handlerConnection(connect.alias)}
					>
						<Connect className={classes.leftIcon} />
						Connect
					</Button>
					<Button variant="contained" color="primary" className={classes.button}

					        onClick={() => handlerLoadAccessConfig(connect.alias)}
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
		hasConfig : (alias) => dispatch({type : `${CONNECTION}_HAS_CONFIG`, data: alias}),
		connected : (alias) => dispatch({type : `${CONNECTION}_CONNECTED`, data: alias}),
	})
)(withStyles(classes, { withTheme: true })(List))
