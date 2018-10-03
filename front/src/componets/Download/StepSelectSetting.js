import React from 'react';
import {connect} from 'react-redux';
import {withStyles} from "@material-ui/core";
import {classes} from "../../const/styles";
import {
	PREFIX_STEPS as PREFIX,
	PREFIX_STEP_SETTINGS as STEP_SETTINGS,
	PREFIX_STEP_RESULT as STEP_RESULT,
	PREFIX_ALERT as ALERT
} from '../../const/prefix'

import Grid from "@material-ui/core/Grid/Grid";
import TextField from "@material-ui/core/TextField/TextField";
import InputAdornment from "@material-ui/core/InputAdornment/InputAdornment";
import IconButton from "@material-ui/core/IconButton/IconButton";
import FormControl from "@material-ui/core/FormControl/FormControl";
import classNames from 'classnames';
import GetPath from '@material-ui/icons/GetApp';
import Button from "@material-ui/core/Button/Button";
import Table from './Table/Table'
import {ICON_TYPES, TYPES} from "../../const/alert";
import Api from "../../Api";

const StepSelectSetting = (state) => {
	const {selected, data} = state.store;

	const handleNext = () => {
		let list = [];

		for(let file of data )
			if (selected.includes(file.fileId))
				list.push(file);

		state.setSelectedList(list);
		state.handleNext();
	};

	const handlerSetPathProject = async () => {
		try {
			const {path} = await Api.pathOpen({
				openFile: false,
				openDirectory : true,
				filters: [],
				properties : ['openDirectory']
			});

			if (!path) return false;

			state.setProjectPath(path);
		} catch (e) {
			state.showError(e.message || e);
		}
	}

	return (
		<Grid item md={12} xs={3}>
			<FormControl fullWidth={true} margin={'normal'}>
				<TextField
					id="pathProject"
					disabled={true}
					className={classNames(classes.margin, classes.textField)}
					variant="outlined"
					label="Path save to project"
					value={state.store.pathProject}
					helperText={state.store.errors['pathProject']}
					error={Boolean(state.store.errors['pathProject'])}
					InputProps={{
						startAdornment: (
							<InputAdornment position="start">
								<IconButton
									aria-label="Get path"
									onClick={() => handlerSetPathProject()}
								>
									<GetPath />
								</IconButton>
							</InputAdornment>
						),
					}}
				/>
			</FormControl>
			<FormControl fullWidth={true} margin={'normal'}>
				<TextField
					id="upload-folder"
					className={classNames(classes.margin, classes.textField)}
					variant="outlined"
					label="Save to folder"
					helperText={'Save to folder'}
					error={false}
					value={state.store.saveDir}
					onChange={(event) => state.changeSaveDir(event.target.value)}
				/>
			</FormControl>
			<Table />
			<div className={classes.actionsContainer} style={{marginTop: 10}}>
				<div>
					<Button disabled={true} className={classes.button}>
						Back
					</Button>
					<Button
						variant="contained"
						color="primary"
						onClick={handleNext}
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
		store : state.StepSetting
	}),
	dispatch => ({
		handleNext : () => dispatch({type : `${PREFIX}_NEXT`}),
		setSelectedList: (list) => dispatch({type : `${STEP_RESULT}_INIT`, data: list}),
		setProjectPath : (path) => dispatch({type : `${STEP_SETTINGS}_SET_PATH_PROJECT`, data:path}),
		changeSaveDir : (dir) => dispatch({type : `${STEP_SETTINGS}_CHANGE_SAVE_DIR`, data:dir}),
		showError : message => dispatch({
			type : `${ALERT}_OPEN`,
			data : {
				message,
				showIcon : ICON_TYPES.BAD,
				type : TYPES.BAD
			}
		})
	})
)(withStyles(classes, { withTheme: true })(StepSelectSetting))

