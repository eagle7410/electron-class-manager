import React from "react";
import {connect} from "react-redux";
import {withStyles} from "@material-ui/core";
import {classes} from "../../const/styles";
import Table from './Table/Table';
import AlertDeployOk from './AlertDeployOk';

const List = (state) => {
	return (
		<div>
			<Table
				title="Editable Example"
				columns={state.store.header}
				data={state.store.data}
			/>
			<AlertDeployOk />
		</div>
	);
};

export default connect(
	state => ({
		store : state.Packages
	}),
	dispatch => ({})
)(withStyles(classes, { withTheme: true })(List))

