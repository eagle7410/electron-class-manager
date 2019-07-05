
import React from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames';
import {PREFIX_MENU as PREFIX} from "../const/prefix";
import {withStyles} from "@material-ui/core";
import {classes} from "../const/styles";
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import IconUsers  from '@material-ui/icons/SettingsInputComponent';
import IconToCloud from '@material-ui/icons/CloudDownload';
import IconFromCloud from '@material-ui/icons/CloudUpload';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithubSquare, } from '@fortawesome/free-brands-svg-icons'
import { faBoxes } from '@fortawesome/free-solid-svg-icons'

import MenuMainItem from './MenuMainItem'
const styleFaIcon = { fontSize: 28 };

const MenuMain = (state) => {

	const { classes, theme } = state;

	return (
		<Drawer
			variant="permanent"
			classes={{
				paper: classNames(classes.drawerPaper, !state.store.open && classes.drawerPaperClose),
			}}
			open={state.store.open}
		>
			<div className={classes.toolbar}>
				<IconButton onClick={state.close}>
					{theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
				</IconButton>
			</div>
			<Divider />
			<List>
				<MenuMainItem label={'Github'} path={'/github'} >
					<FontAwesomeIcon icon={faGithubSquare} style={styleFaIcon}/>
				</MenuMainItem>
				<MenuMainItem label={'Connections'} path={'/connections'}>
					<IconUsers />
				</MenuMainItem>
				<MenuMainItem label={'To cloud'} path={'/upload'} disabled={!state.store.isConnected}>
					<IconFromCloud />
				</MenuMainItem>
				<MenuMainItem label={'From cloud'} path={'/download'} disabled={!state.store.isConnected}>
					<IconToCloud />
				</MenuMainItem>
				<MenuMainItem label={'Packages'} path={'/packages'} disabled={!state.store.isConnected}>
					<FontAwesomeIcon icon={faBoxes} style={styleFaIcon}/>
				</MenuMainItem>
			</List>
		</Drawer>
	);
};

export default connect(
	state => ({
		store: state.Menu,
	}),
	dispatch => ({
		close : () => dispatch({type :`${PREFIX}_CLOSE`}),
		open  : () => dispatch({type :`${PREFIX}_OPEN`})
	})
)(withStyles(classes, { withTheme: true })(MenuMain))
