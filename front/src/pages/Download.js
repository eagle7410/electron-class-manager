import React from 'react';
import Steps from '../componets/Download/Steps'
import Grid from "@material-ui/core/Grid/Grid";

const Download = () => {
	return (
		<div>
			<h1>Page "From cloud"</h1>
			<Grid container spacing={24}>
				<Steps />
			</Grid>
		</div>
	);
};

export default Download
