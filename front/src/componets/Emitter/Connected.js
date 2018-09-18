import React from 'react';
import {connect} from 'react-redux';
import Api from "../../Api";
import FormControl from "@material-ui/core/FormControl/FormControl";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import Select from "@material-ui/core/Select/Select";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import LoadAnimation from "../../tools/LoadAnimation";
import {
	PREFIX_ALERT as ALERT,
	PREFIX_AUTH as AUTH,
} from "../../const/prefix";
import Panel from '../Panel'
import {ICON_TYPES, TYPES} from "../../const/alert";
import {withStyles} from "@material-ui/core";
import {classes} from "../../const/styles";

const Connected = (state) => {
	const handlerChangeUsers = (ev) => {
		state.loadRun();

		setTimeout(async () => {
			try {
				const label = ev.target.value;

				state.changeAuthUser(label);

				if (!label) {
					return true;
				}

				const id = await Api.auth(state.store.list.find(u => u.label === label));

				state.isUserAuth(id);

			} catch (e) {
				console.error('{Err} handlerChangeUsers', e);
				state.showError(e.message || e);
			} finally {
				state.loadStop();
			}
		});
	};

	let contentAuth = (<div>
		<FormControl fullWidth={true} margin={'normal'}>
			<InputLabel htmlFor="connection-helper">Use connection</InputLabel>
			<Select
				onChange={ev => handlerChangeUsers(ev)}
				value={state.auth.connection}
				style={{minWidth: 200}}
				inputProps={{
					name: 'connection',
					id: 'connection-simple',
				}}
			>
				<MenuItem value=""><em>None</em></MenuItem>

				{
					state.store.list.map((item, inx) =>
						<MenuItem value={item.label} key={`connection_${inx}`}>{item.label}</MenuItem>
					)
				};
			</Select>
		</FormControl>
	</div>);

	if (state.auth.isLoading)
		contentAuth = (<div><LoadAnimation /></div>);

	return (
		<Panel title={`Connected to :"${state.auth.connection}", ID is "${state.auth.id}"`}>
			{contentAuth}
		</Panel>
	);
};
export default connect(
	state => ({
		store: state.Connections,
		auth : state.Auth,
	}),
	dispatch => ({
		loadStop : () => dispatch({type : `${AUTH}_LOAD_STOP`}),
		loadRun  : () => dispatch({type : `${AUTH}_LOAD_RUN`}),
		isUserAuth : (id) => dispatch({type : `${AUTH}_IS_ID`, id}),
		showError : message => dispatch({
			type : `${ALERT}_OPEN`,
			data : {
				message,
				showIcon : ICON_TYPES.BAD,
				type : TYPES.BAD
			}
		}),

		openAlert : ({
			             message, type = TYPES.OK, showIcon = ICON_TYPES.OK
		             }) => dispatch({type : `${ALERT}_OPEN`, data : {message, showIcon, type }}),
		changeAuthUser : user => dispatch({type :`${AUTH}_CHANGE_USER`, data: user}),
	})
)(withStyles(classes, { withTheme: true })(Connected))
