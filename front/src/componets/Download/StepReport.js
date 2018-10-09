
import React from 'react';
import {connect} from 'react-redux';
import Grid from "@material-ui/core/Grid/Grid";
import {classes} from "../../const/styles";
import Button from "@material-ui/core/Button/Button";
import {PREFIX_STEPS as PREFIX} from "../../const/prefix";
import Paper from "@material-ui/core/Paper/Paper";
import Typography from "@material-ui/core/Typography/Typography";
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import {withStyles} from "@material-ui/core";

const StepReport = (state) => {
	const { classes } = state;
	const {report} = state.store;

	return (
		<Grid item md={12} xs={12} lg={12}>
			<Paper square elevation={0} className={classes.resetContainer}>
				<FormControl fullWidth className={classes.margin}>
					<TextField
						id="outlined-multiline-flexible"
						fullWidth
						multiline
						rowsMax="20"
						value={report.join('\n')}
						className={classes.textField}
						style={{width:'100%'}}
						margin="normal"
						variant="outlined"
					/>
				</FormControl>

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
		store: state.StepReport
	}),
	dispatch => ({
		handleReset : () => dispatch({type : `${PREFIX}_RESET`}),
	})
)(withStyles(classes, { withTheme: true })(StepReport));
