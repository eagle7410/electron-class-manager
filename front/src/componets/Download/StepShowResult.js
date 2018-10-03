
import React from 'react';
import {connect} from 'react-redux';
import Grid from "@material-ui/core/Grid/Grid";
import {classes} from "../../const/styles";
import Button from "@material-ui/core/Button/Button";
import {
	PREFIX_STEPS as PREFIX,
	PREFIX_STEP_RESULT as RESULT
} from "../../const/prefix";

import ProblemList from './StepShowResult/ProblemList'
import FileList from './StepShowResult/FileList'
import ReactJson from 'react-json-view'
import FormControl from "@material-ui/core/FormControl/FormControl";

const SteShowResult = (state) => {
	const handlerChangeJson = (item) => {
		const newVal = item.updated_src;

		if (!newVal) return false;

		state.changeNpm(newVal);

		return true;
	};

   return (
	   <Grid item md={12} xs={12}>
			<ProblemList />
			<FileList />
		   <h3>Npm dependency</h3>
		   <FormControl fullWidth={true} margin={'normal'}>
			   <ReactJson src={state.result.npm}
			              style={{marginBottom : 40}}
			              name="NPM"
			              onAdd={(item) => handlerChangeJson(item, 'npm')}
			              onEdit={(item) => handlerChangeJson(item, 'npm')}
			              onDelete={(item) => handlerChangeJson(item, 'npm')}
			   />
		   </FormControl>
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
		store: state.Steps,
		result: state.StepResult
	}),
	dispatch => ({
		changeNpm  : (data) => dispatch({type : `${RESULT}_CHANGE_NPM`, data}),
		handleNext : () => dispatch({type : `${PREFIX}_NEXT`}),
		handleBack : () => dispatch({type : `${PREFIX}_BACK`}),
	})
)(SteShowResult);
