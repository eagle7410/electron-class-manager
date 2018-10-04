import React from 'react';
import Grid from '@material-ui/core/Grid';
import connect from "react-redux/es/connect/connect";
import {withStyles} from "@material-ui/core";
import {classes} from "../const/styles";
import FormUpload from '../componets/FormUpload'

const Upload = () => (
	<div>
		<h1>Page "To cloud" </h1>
		<Grid container spacing={24}>
			<Grid item md={12} xs={12}>
				<FormUpload />
			</Grid>
		</Grid>
	</div>
);

export default connect(
	state => ({
		form : state.Emitter
	})
)(withStyles(classes, { withTheme: true })(Upload))

