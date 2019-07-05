import React from 'react';
import Grid from "@material-ui/core/Grid/Grid";
import Form from "../componets/Github/Form";

const Github = () => {
	return (
		<div>
			<h1>Page "Github"</h1>
			<Grid container spacing={0}>
				<Grid item md={12} xs={12}>
					<Form />
				</Grid>
			</Grid>
		</div>
	);
};

export default Github
