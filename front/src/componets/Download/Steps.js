import React from 'react';
import {connect} from 'react-redux';
import {withStyles} from "@material-ui/core";
import {classes} from "../../const/styles";
import Stepper from '@material-ui/core/Stepper';
import StepSelectSetting from './StepSelectSetting'
import StepShowResult from './StepShowResult'
import StepReport from './StepReport'
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';

const steps =  ['Settings download', 'Show result', 'Report'];
function getStepContent(step) {
	switch (step) {
		case 0:
			return <StepSelectSetting />;
		case 1:
			return <StepShowResult />;
		case 2:
			return <StepReport />;
		default:
			return <div>'Unknown step'</div>;
	}
}

const Steps = (state) => (
	<div style={{width : '80%'}}>
		<Stepper activeStep={state.store.activeStep} orientation="vertical">
			{steps.map((label, index) => {
				return (
					<Step key={label}>
						<StepLabel>{label}</StepLabel>
						<StepContent>
							{getStepContent(index)}
						</StepContent>
					</Step>
				);
			})}
		</Stepper>
	</div>
);

export default connect(
	state => ({store : state.Steps})
)(withStyles(classes, { withTheme: true })(Steps))

