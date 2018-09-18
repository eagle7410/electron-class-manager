import React from 'react';
import {
	ICON_TYPES, TYPES
} from '../const/alert'
import {
	PREFIX_ALERT as PREFIX
} from '../const/prefix'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import IconOk from '@material-ui/icons/DoneOutline';
import IconWarn from '@material-ui/icons/Warning';
import IconErr from '@material-ui/icons/Error';
import {
	BG_COLOR_SUCCESS,
	BG_COLOR_WARNING,
	BG_COLOR_ERROR,
	BG_COLOR_DEFAULT,
	COLOR_BLACK,
	COLOR_WHITE
} from '../const/colors'

import connect from "react-redux/es/connect/connect";
import {withStyles} from "@material-ui/core";
import {classes} from "../const/styles";

const iconStyle = {
	marginRight : 2
};

const Alert = (state) => {
	const { classes } = state;
	const scroll      = 'paper';

	let icon = '';
	let styleButton = {
		backgroundColor : BG_COLOR_DEFAULT,
		color : COLOR_BLACK
	};

	if (state.store.isShowIcon) {

		// eslint-disable-next-line
		switch (state.store.showIcon) {
			case ICON_TYPES.OK:
				icon = <IconOk style={iconStyle}/>;
				break;
			case ICON_TYPES.BAD:
				icon = <IconErr style={iconStyle}/>;
				break;
			case ICON_TYPES.WARN:
				icon = <IconWarn style={iconStyle}/>;
				break;
		}
	}

	// eslint-disable-next-line
	switch (state.store.type) {
		case TYPES.OK:
			styleButton ={
				backgroundColor : BG_COLOR_SUCCESS,
				color : COLOR_WHITE
			};
			break;
		case TYPES.BAD:
			styleButton ={
				backgroundColor : BG_COLOR_ERROR,
				color : COLOR_WHITE
			};
			break;

		case TYPES.WARN:
			styleButton ={
				backgroundColor : BG_COLOR_WARNING,
				color : COLOR_BLACK
			};
			break;
	}

	return (
		<div>
			<Dialog
				open={state.store.isOpen}
				onClose={state.close}
				scroll={scroll}
				aria-labelledby="scroll-dialog-title"
			>
				<DialogTitle id="scroll-dialog-title">System message</DialogTitle>
				<DialogContent>
					<DialogContentText>
						{state.store.message}
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<div>
						<Button
							className={classes.button}
							style={styleButton}
							onClick={state.close}
						>
							{icon}
							{state.store.labelOk}
						</Button>
					</div>
				</DialogActions>
			</Dialog>
		</div>
	);
};

export default connect(
	state => ({
		store : state.Alert
	}),
	dispatch => ({
		close : () => dispatch({type : `${PREFIX}_CLOSE`}),
	})
)(withStyles(classes, { withTheme: true })(Alert))
