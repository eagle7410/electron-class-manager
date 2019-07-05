import Panel from "../Panel";
import React from "react";
import {connect} from "react-redux";

import {
	PREFIX_GITHUB as PREFIX
} from "../../const/prefix";
import classNames from 'classnames';
import {withStyles} from "@material-ui/core";
import {classes} from "../../const/styles";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import FormControl from "@material-ui/core/FormControl";
import IconVisibility from '@material-ui/icons/Visibility';
import IconVisibilityOff from '@material-ui/icons/VisibilityOff';
import Button from "@material-ui/core/Button";
import Api from '../../Api'

const Form = (state) => {
	const {classes, store} = state;
	const {login, pass, isShowPass} = store;

	const handlerSave = () => {
		Api.setLocalItem(Api.githubLabel, JSON.stringify({login, pass}))
	};

	return (
		<Panel title={'Github account'} expanded={true}>
			<FormControl fullWidth={true} margin={'normal'}>
				<TextField
					id="git-login"
					className={classNames(classes.margin, classes.textField)}
					variant="outlined"
					label="login"
					onChange={(event) => state.formChangeField('login', event.target.value)}
					value={login}
				/>
			</FormControl>
			<FormControl fullWidth={true} margin={'normal'}>
				<TextField
					id="git-pass"
					className={classNames(classes.margin, classes.textField)}
					variant="outlined"
					label="Password"
					onChange={(event) => state.formChangeField('pass', event.target.value)}
					type={isShowPass ? 'text' : 'password'}
					InputProps={{
						startAdornment: (
							<InputAdornment position="start">
								<IconButton
									aria-label="Get path"
									onClick={state.toggleShow}
								>
								{ isShowPass ? <IconVisibilityOff/> : <IconVisibility />}
								</IconButton>
							</InputAdornment>
						),
					}}
					value={pass}
				/>
			</FormControl>
			<Button variant="contained" color="primary" className={classes.button}
			        onClick={() => handlerSave()}
			>
				Save
			</Button>
		</Panel>
	);
};

export default connect(
	state => ({
		store : state.Github,
	}),
	dispatch => ({
		setData : (data) => dispatch({type : `${PREFIX}_INIT`, data}),
		formChangeField: (name, value) => dispatch({type : `${PREFIX}_CHANGE_FIELD`, data : {name, value}}),
		toggleShow : () => dispatch({type : `${PREFIX}_TOGGLE_SHOW`}),
	})
)(withStyles(classes, { withTheme: true })(Form))

