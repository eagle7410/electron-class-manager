
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
import Badge from '@material-ui/core/Badge';

import IconUsers  from '@material-ui/icons/SettingsInputComponent';
import IconEvents from '@material-ui/icons/NotificationImportant';
import IconSend from '@material-ui/icons/Send';

import MenuMainItem from './MenuMainItem'

const MenuMain = (state) => {

	const { classes, theme } = state;
	const countEvent = state.eventRoom.events.length;

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
				<MenuMainItem label={'Connections'} path={'/connections'}>
					<IconUsers />
				</MenuMainItem>
				<MenuMainItem label={'Emitter'} path={'/emitter'}>
					<IconSend />
				</MenuMainItem>
				<MenuMainItem label={'Listen'} path={'/listen'}>
					{
						countEvent
							?
								<Badge badgeContent={countEvent} color="secondary" classes={{ badge: classes.badge }}>
									<IconEvents />
								</Badge>
							: <IconEvents />
					}

				</MenuMainItem>
			</List>
		</Drawer>
	);
};

export default connect(
	state => ({
		store: state.Menu,
		eventRoom: state.Events
	}),
	dispatch => ({
		close : () => dispatch({type :`${PREFIX}_CLOSE`}),
		open  : () => dispatch({type :`${PREFIX}_OPEN`})
	})
)(withStyles(classes, { withTheme: true })(MenuMain))
