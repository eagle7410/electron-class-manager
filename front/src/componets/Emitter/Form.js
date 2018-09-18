import React from 'react';
import {connect} from 'react-redux';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Panel from '../Panel'
import ReactJson from 'react-json-view'
import IconSend from '@material-ui/icons/Send';
import Api from "../../Api";
import {
	PREFIX_ALERT as ALERT,
	PREFIX_SEND_FORM as FORM
} from "../../const/prefix";
import {ICON_TYPES, TYPES} from "../../const/alert";
import {withStyles} from "@material-ui/core";
import {classes} from "../../const/styles";

const Form = (state) => {
	const handlerChangeField = (field, ev) =>
		state.formChangeField(field, ev.target.value);

	const handlerChangeBody = (item) => {
		const newVal = item.updated_src;

		if (!newVal) return false;

		state.formChangeField('body', newVal);

		return true;
	};

	const handlerSend = async () => {
		try {
			await Api.send(state.form);
		} catch (e) {
			state.showError(e.message || e);
		}
	};

	return (<Panel title={'Form'} disabled={!state.auth.isUserAuth} expanded={state.auth.isUserAuth}>

		<FormControl fullWidth={true} margin={'normal'}>
			<TextField
				value={state.form.event}
				onChange={ev => handlerChangeField('event', ev)}
				helperText="Event name"
			/>
		</FormControl>
		<FormControl fullWidth={true} margin={'normal'}>
			<ReactJson src={state.form.body}
			           name="body"
			           onEdit={handlerChangeBody}
			           onAdd={handlerChangeBody}
			           onDelete={handlerChangeBody}
			/>
		</FormControl>
		<Button variant="contained" color="primary" className={classes.button}
		        onClick={handlerSend}
		>
			Send
			<IconSend />
		</Button>
	</Panel>);
};

export default connect(
	state => ({
		auth : state.Auth,
		form : state.Emitter
	}),
	dispatch => ({
		formChangeField : (field, value) => dispatch({type : `${FORM}_CHANGE_FIELD`, data : {field, value}}),
		showError : message => dispatch({
			type : `${ALERT}_OPEN`,
			data : {
				message,
				showIcon : ICON_TYPES.BAD,
				type : TYPES.BAD
			}
		})
	})
)(withStyles(classes, { withTheme: true })(Form))
