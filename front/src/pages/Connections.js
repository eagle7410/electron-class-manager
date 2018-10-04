import React from 'react';
import List from '../componets/Connections/List'
import Grid from "@material-ui/core/Grid/Grid";

const Connections = () => {
	return (
		<div>
			<h1>Page "Connections"</h1>
			<Grid container spacing={0}>
				<Grid item md={12} xs={12}>
					<List />
				</Grid>
			</Grid>

		</div>
	);
};

export default Connections;
