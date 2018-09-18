import React from 'react';
import TextField from '@material-ui/core/TextField';
import {connect} from "react-redux";

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Actions from './Actions'
import {PREFIX_RUNS as PREFIX} from "../const/prefix";

const ListCommand = (state) => {

	let runs = (
		<ExpansionPanel disabled={true}>
			<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
				<Typography>
					No runs
				</Typography>
			</ExpansionPanelSummary>
		</ExpansionPanel>
	);

	if (state.store.data.length) {
		runs = state.store.data.map((run,inx) => {
			return <ExpansionPanel
				key={`run_${inx}`}
				expanded={run.isOpen}
				>
				<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} onClick={ev => {
					ev.preventDefault();

					if(['actions', 'action'].includes(ev.target.getAttribute('role')) ) return false;

					state.changeOpenPanel({isOpen : !run.isOpen, inx});

				}}>
					<Typography>
						<Actions run={run} inx={inx}/>
						{run.label}
					</Typography>
				</ExpansionPanelSummary>
				<ExpansionPanelDetails>
					<div>
						<TextField
							id={`cmd_${inx}`}
							label="Command"
							value={run.cmd}
							fullWidth={true}
							className="field_cmd"
							onChange={ev => state.input({inx, field : 'cmd', value : ev.target.value})}
						/>
						<TextField
							id={`comment_${inx}`}
							label="Comment"
							value={run.comment}
							fullWidth={true}
							multiline={true}
							className="field_cmd"
							onChange={ev => state.input({inx, field : 'comment', value : ev.target.value})}
						/>
					</div>
				</ExpansionPanelDetails>
			</ExpansionPanel>
		});
	}

	return (
		<div style={{marginTop : 45}} >
			{runs}
		</div>
	);
};

export default connect(
	state => ({
		store : state.runs,
	}),
	dispatch => ({
		changeOpenPanel : (data) => dispatch({type :`${PREFIX}_CHANGE_OPEN_PANEL`, data}),
		input : data => dispatch({type :`${PREFIX}_CHANGE_FIELD`, data})
	})
)(ListCommand)

