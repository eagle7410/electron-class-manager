import React from 'react';
import {connect} from 'react-redux';
import Panel from '../Panel'
import Button from '@material-ui/core/Button';
import {withStyles} from "@material-ui/core";
import {classes} from "../../const/styles";
import {
	PREFIX_ALERT as ALERT,
	PREFIX_CONNECTION as CONNECTION,
	PREFIX_STEP_SETTINGS as SETTINGS,
	PREFIX_PACKAGES as PACKAGES,
} from "../../const/prefix";

import {ICON_TYPES, TYPES} from "../../const/alert";
import ActiveYes from '@material-ui/icons/CheckCircle';
import ActiveNo from '@material-ui/icons/HighlightOff';
import Connect from '@material-ui/icons/CastConnected';
import GetConfig from '@material-ui/icons/GetApp';
import LoadAnimation from '../../tools/LoadAnimation'
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
			state.load();

			try {
				const {isConnected, files, packages} = await Api.cloudConnect({alias});

				if (!isConnected) new Error(`Problem with connect`);

				state.setFiles(files);
				state.setPackages({data :packages});

				state.connected(alias);

			} catch (e) {
				state.showError(e.message || e);
			} finally {
				state.loadStop();
			}
		};

		const handlerLoadAccessConfig = async (alias) => {
			state.load();

			try {
				const {path} = await Api.pathOpen();

				if (!path) return false;

				await Api.accessFileSave({alias, path});

				state.hasConfig(alias);

			} catch (e) {
				state.showError(e.message || e);
			} finally {
				state.loadStop();
			}
		};

		let actions, icon;

		list = state.store.list.map((connect, inx) => {
			actions = [
				<Button variant="contained" color="primary" className={classes.button}
				        key={`btn_connect_connect_${inx}`}
				        disabled={!connect.isHasConfig || connect.isInit}
				        onClick={() => handlerConnection(connect.alias)}
				>
					<Connect className={classes.leftIcon} />
					Connect
				</Button>,
				<Button variant="contained" color="primary" className={classes.button}
				        key={`btn_connect_load_config_${inx}`}
				        onClick={() => handlerLoadAccessConfig(connect.alias)}
				>
					<GetConfig className={classes.leftIcon} />
					Load access config
				</Button>
			];

			if (state.store.isLoad)
				actions = <LoadAnimation />;

			icon = connect.isInit ? <ActiveYes style={styles.yes} /> : <ActiveNo style={styles.no} />;

			return (
				<Panel title={<div>{icon} Connect to "{connect.label}"</div>} key={`CONNECT_${inx}`} titleBlue={true} expanded={true}>
					{actions}
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
		load      : () => dispatch({type : `${CONNECTION}_IS_LOAD_RUN`}),
		loadStop  : () => dispatch({type : `${CONNECTION}_IS_LOAD_STOP`}),
		showError : message => dispatch({
			type : `${ALERT}_OPEN`,
			data : {
				message,
				showIcon : ICON_TYPES.BAD,
				type : TYPES.BAD
			}
		}),
		setFiles    : (data) => dispatch({type : `${SETTINGS}_SET_FILES`, data}),
		setPackages : ({data}) => dispatch({type : `${PACKAGES}_INIT`, data : {data}}),
		hasConfig   : (data) => dispatch({type : `${CONNECTION}_HAS_CONFIG`, data}),
		connected   : (data) => dispatch({type : `${CONNECTION}_CONNECTED`, data}),
	})
)(withStyles(classes, { withTheme: true })(List))
