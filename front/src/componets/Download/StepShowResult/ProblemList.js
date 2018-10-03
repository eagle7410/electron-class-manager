
import React from 'react';
import {connect} from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import Icon from '@material-ui/icons/Error';

import {COLOR_WHITE, BG_COLOR_ERROR} from '../../../const/colors'

const ProblemList = (state) => {
	const {classes} = state;
	const {isHasProblems, problems} = state.store;


	if(!isHasProblems)
		return (<div/>);

	return (<div>
		<h3>Problems</h3>
		<List component="nav">
			{problems.map(({message}, inx) => {
				return (
					<ListItem className={classes.problem} key={`propblem_${inx}`}>
						<ListItemIcon><Icon /></ListItemIcon>
						<ListItemText >{message}</ListItemText>
					</ListItem>
				);
			})}
		</List>
	</div>);

};

const styles = theme => ({
	problem: {
		color : COLOR_WHITE,
		backgroundColor : BG_COLOR_ERROR
	},
});


export default connect(
	state => ({
		store: state.StepResult
	})
)(withStyles(styles)(ProblemList));
