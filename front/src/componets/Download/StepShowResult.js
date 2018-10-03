import React from 'react';
import {connect} from 'react-redux';
import Grid from "@material-ui/core/Grid/Grid";
import {classes} from "../../const/styles";
import Button from "@material-ui/core/Button/Button";
import {
	PREFIX_STEPS as PREFIX,
	PREFIX_STEP_RESULT as RESULT,
	PREFIX_STEP_REPORT as REPORT,
	PREFIX_ALERT as ALERT,
	PREFIX_SEND_FORM as FORM
} from "../../const/prefix";

import ProblemList from './StepShowResult/ProblemList'
import FileList from './StepShowResult/FileList'
import ReactJson from 'react-json-view'
import FormControl from "@material-ui/core/FormControl/FormControl";
import {ICON_TYPES, TYPES} from "../../const/alert";
import LoadAnimation from "../../tools/LoadAnimation";
import Api from '../../Api'

const SteShowResult = (state) => {

	const {isHasProblems, files, npm, isLoad} = state.result;
	const {pathProject, saveDir} = state.settings;

	const handlerChangeJson = (item) => {
		const newVal = item.updated_src;

		if (!newVal) return false;

		state.changeNpm(newVal);

		return true;
	};

	const handleNext = async () => {
		if (isHasProblems) return false;
		state.load();

		try {
			const {report} = await Api.fromCloud({
				pathProject,
				saveDir,
				files : files.map(({fileId, name, ext}) => ({fileId, name, ext})),
				npm,
			});

			state.setReport(report);
			state.handleNext();

		} catch (e) {
			state.showError(e.message || e);
		} finally {
			state.loadStop();
		}
	};

	if (isLoad) return <LoadAnimation/>;

	return (
		<Grid item md={12} xs={12}>
			<ProblemList/>
			<FileList/>
			<h3>Npm dependency</h3>
			<FormControl fullWidth={true} margin={'normal'}>
				<ReactJson src={state.result.npm}
				           style={{marginBottom: 40}}
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
						onClick={() => handleNext()}
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
		result: state.StepResult,
		settings : state.StepSetting,
	}),
	dispatch => ({
		setReport : (data) => dispatch({type :`${REPORT}_SET_REPORT`, data}),
		load     : () => dispatch({type :`${RESULT}_IS_LOAD_RUN`}),
		loadStop : () => dispatch({type :`${RESULT}_IS_LOAD_STOP`}),
		changeNpm  : (data) => dispatch({type : `${RESULT}_CHANGE_NPM`, data}),
		handleNext : () => dispatch({type : `${PREFIX}_NEXT`}),
		handleBack : () => dispatch({type : `${PREFIX}_BACK`}),
		showError : message => dispatch({
			type : `${ALERT}_OPEN`,
			data : {
				message,
				showIcon : ICON_TYPES.BAD,
				type : TYPES.BAD
			}
		})
	})
)(SteShowResult);
