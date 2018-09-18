import React from 'react';
import Grid from '@material-ui/core/Grid';
import connect from "react-redux/es/connect/connect";
import {withStyles} from "@material-ui/core";
import {classes} from "../const/styles";
import Connected from '../componets/Emitter/Connected'
import Form from '../componets/Emitter/Form'

const Emitter = (state) => {

	return (
		<div>
			<h1>Page "Emitter" </h1>
			<Grid container spacing={24}>
				<Grid item md={12} xs={12}>
					<Connected />
					<Form />
				</Grid>
			</Grid>
		</div>
	);
};

export default connect(
	state => ({
		form : state.Emitter
	})
)(withStyles(classes, { withTheme: true })(Emitter))

