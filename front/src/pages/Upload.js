import React from 'react';
import Grid from '@material-ui/core/Grid';
import {withStyles} from "@material-ui/core";
import {classes} from "../const/styles";
import FormUpload from '../componets/Upload/FormUpload'

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

export default withStyles(classes, { withTheme: true })(Upload)

