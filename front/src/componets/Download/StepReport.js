
import React from 'react';
import {connect} from 'react-redux';
import Grid from "@material-ui/core/Grid/Grid";
import {classes} from "../../const/styles";
import Button from "@material-ui/core/Button/Button";
import {PREFIX_STEPS as PREFIX} from "../../const/prefix";
import Paper from "@material-ui/core/Paper/Paper";
import Typography from "@material-ui/core/Typography/Typography";

const StepReport = (state) => {
	return (
		<Grid item md={12} xs={3}>
			<Paper square elevation={0} className={classes.resetContainer}>
				<Typography>All steps completed - you&quot;re finished</Typography>
				<Button onClick={state.handleReset} className={classes.button}>
					Reset
				</Button>
			</Paper>
		</Grid>

	);
};

export default connect(
	state => ({
		store: state.Steps
	}),
	dispatch => ({
		handleNext : () => dispatch({type : `${PREFIX}_NEXT`}),
		handleBack : () => dispatch({type : `${PREFIX}_BACK`}),
		handleReset : () => dispatch({type : `${PREFIX}_RESET`}),
	})
)(StepReport);
