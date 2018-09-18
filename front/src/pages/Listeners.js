import React from 'react';
import {connect} from 'react-redux';
import Panel from '../componets/Panel'
import ReactJson from "react-json-view";
import {classes} from "../const/styles";
import DeleteIcon from '@material-ui/icons/Delete';
import Button from "@material-ui/core/Button/Button";
import {PREFIX_EVENT_ROOM as PREFIX} from '../const/prefix'
import FormControl from "@material-ui/core/FormControl/FormControl";

const Listeners = (state) => {

	const handlerChangeBody = () => false;

	let list = <Panel title={`No event`} key={`room_event_empty`} expanded={false} disabled={true} />;

	if (state.store.events.length) {
		list = state.store.events.map(({label, data, event}, inx) =>
			(<Panel title={`Connect : ${label}, Event : ${event}`} key={`room_event_${inx}`} >
				<Button variant="contained" color="secondary" className={classes.button}
				        onClick={() => state.onDelete(inx)}
				>

					<DeleteIcon className={classes.leftIcon} />
					Delete
				</Button>
				<FormControl fullWidth={true} margin={'normal'}>
					<ReactJson src={data}
					           name="data"
					           onEdit={handlerChangeBody}
					           onAdd={handlerChangeBody}
					           onDelete={handlerChangeBody}
					/>
				</FormControl>
			</Panel>)
		)
	}
	return (
		<div>
			<h1>Page "Listeners events"</h1>
			{list}
		</div>
	);
};

export default connect(
	state => ({
		store: state.Events
	}),
	dispatch => ({
		onDelete : (index) => dispatch({type : `${PREFIX}_REMOVE`, index}),
	})
)(Listeners);
