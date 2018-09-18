import React from 'react';
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails/ExpansionPanelDetails";
import ExpansionPanel from "@material-ui/core/ExpansionPanel/ExpansionPanel";
import {
	BG_COLOR_BLUE,
	COLOR_WHITE
} from '../const/colors'
const Panel = (state) => {
	let props = {disabled : state.disabled, };

	if (state.hasOwnProperty('expanded'))
		props.expanded = state.expanded;

	let style = {};

	if (state.titleBlue)
		style = {background: BG_COLOR_BLUE, color: COLOR_WHITE};

	return (
		<ExpansionPanel {...props} >
			<ExpansionPanelSummary style={style}>
				<h2>{state.title}</h2>
			</ExpansionPanelSummary>
			<ExpansionPanelDetails>
				<div>{state.children}</div>
			</ExpansionPanelDetails>
		</ExpansionPanel>
	);
};

export default Panel
