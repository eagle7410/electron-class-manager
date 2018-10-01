
import React from 'react';
import {connect} from 'react-redux';
import Grid from "@material-ui/core/Grid/Grid";
import {classes} from "../../const/styles";
import Button from "@material-ui/core/Button/Button";
import {PREFIX_STEPS as PREFIX} from "../../const/prefix";

const SteShowResult = (state) => {
   return (
	   <Grid item md={12} xs={3}>
		   <h1>Build list</h1>
		   <div className={classes.actionsContainer}>
			   <div>
				   <Button
					   disabled={false}
					   onClick={state.handleBack}
					   className={classes.button}
				   >
					   Back
				   </Button>
				   <Button
					   variant="contained"
					   color="primary"
					   onClick={state.handleNext}
					   className={classes.button}
				   >Next

				   </Button>
			   </div>
		   </div>
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
)(SteShowResult);
