
import React from 'react';
import {connect} from 'react-redux';
import {withStyles} from "@material-ui/core";
import {classes} from "../../const/styles";
import {
	PREFIX_STEPS as PREFIX,
	PREFIX_STEP_SETTINGS as STEP_SETTINGS
} from '../../const/prefix'

// import Table_ from './Table_'
import Grid from "@material-ui/core/Grid/Grid";
import TextField from "@material-ui/core/TextField/TextField";
import InputAdornment from "@material-ui/core/InputAdornment/InputAdornment";
import IconButton from "@material-ui/core/IconButton/IconButton";
import FormControl from "@material-ui/core/FormControl/FormControl";
import classNames from 'classnames';
import GetPath from '@material-ui/icons/GetApp';
import Button from "@material-ui/core/Button/Button";
import Table from './Table/Table'

const StepSelectSetting = (state) => {
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
									onClick={() =>alert('Get path')}
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
					value={'classes'}
					onChange={(event) => alert('handler folder')}
				/>
			</FormControl>
			<Table />
			<div className={classes.actionsContainer} style={{marginTop: 10}}>
				<div>
					<Button
						disabled={true}
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
		store : state.StepSetting
	}),
	dispatch => ({
		handleNext : () => dispatch({type : `${PREFIX}_NEXT`}),
		handleBack : () => dispatch({type : `${PREFIX}_BACK`}),
		handleReset : () => dispatch({type : `${PREFIX}_RESET`}),
	})
)(withStyles(classes, { withTheme: true })(StepSelectSetting))

