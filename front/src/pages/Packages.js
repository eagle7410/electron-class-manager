import React from 'react';
import Grid from "@material-ui/core/Grid/Grid";
import List from '../componets/Packages/List'

const Packages = () => {
	return (
		<div>
			<h1>Page "Packages"</h1>
			<Grid container spacing={24}>
				<List />
			</Grid>
		</div>
	);
};

export default Packages
