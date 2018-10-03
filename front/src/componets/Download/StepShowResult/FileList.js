
import React from 'react';
import {connect} from 'react-redux';
import ListItem from "@material-ui/core/ListItem/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon/ListItemIcon";

import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import List from "@material-ui/core/List/List";
import Icon from '@material-ui/icons/Delete';
import IconButton from "@material-ui/core/IconButton/IconButton";
import Panel from '../../Panel'
import {PREFIX_STEP_RESULT as RESULT} from "../../../const/prefix";

const FileList = (state) => {
	const {classes} = state;
	const {files} = state.store;

	return (
		<div>
			<Panel title={'Show file list'} titleBlue={false}>
				<List component="nav">
				{
					files
						.sort((a, b) => a.name.localeCompare(b.name))
						.map(({fileId, name, version, classes}) => {
							return (
								<ListItem key={`file_${fileId}`}>
									<ListItemIcon>
										<IconButton aria-label="Filter list" key={`move_file_${fileId}`}
											onClick={() => state.moveFile(fileId)}
										>
											<Icon />
										</IconButton>
									</ListItemIcon>
									<ListItemText >{name}@{version}</ListItemText>
								</ListItem>
							);
						})
				}
				</List>
			</Panel>
			{/*<h3>File list</h3>*/}
			{/*<List component="nav">*/}
				{/*{files.sort((a, b) => a.name.localeCompare(b.name)).map(({fileId, name, version, classes}) => {*/}
					{/*return (*/}
						{/*<ListItem key={`file_${fileId}`}>*/}
							{/*<ListItemIcon>*/}
								{/*<IconButton aria-label="Filter list" key={`move_file_${fileId}`}*/}
								            {/*onClick={() => state.moveFile(fileId)}*/}
								{/*>*/}
									{/*<Icon />*/}
								{/*</IconButton>*/}
							{/*</ListItemIcon>*/}
							{/*<ListItemText >{name}@{version}</ListItemText>*/}
						{/*</ListItem>*/}
					{/*);*/}
				{/*})}*/}
			{/*</List>*/}
		</div>
	);
};

export default connect(
	state => ({
		store: state.StepResult
	}),
	dispatch => ({
		moveFile   : (data) => dispatch({type : `${RESULT}_MOVE_FILE`, data}),
	})
)(FileList);
