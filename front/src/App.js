import React,{Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import {Route, Switch, } from 'react-router-dom';
import {withRouter} from 'react-router'
import Api from './Api'
import Header from './componets/Header'
import MenuMain from './componets/MenuMain'
import Alert from './componets/Alert'
import {store} from './store';

import {ICON_TYPES, TYPES} from "./const/alert";
import {
PREFIX_CONNECTION as CONNECTION,
PREFIX_ALERT as ALERT,
	PREFIX_GITHUB as GITHUB
} from "./const/prefix";

import {
	Packages,
	Github,
	Connections,
	Download,
	Upload,
} from './pages'

import {classes} from './const/styles'


class App extends  Component {

	async componentDidMount() {
		try {
			const data = JSON.parse(Api.getLocalItem(Api.githubLabel));

			if (data) {
				store.dispatch({type : `${GITHUB}_INIT`, data});
			}

			const {connections, fileTypes} = await Api.init();

			store.dispatch({type : `${CONNECTION}_SET`, data : connections, fileTypes});

			return true;

		} catch (e) {

			console.error('Error INIT', e);

			store.dispatch({
				type : `${ALERT}_OPEN`,
				data : {
					message : e.message || 'Error INIT',
					showIcon : ICON_TYPES.BAD,
					type : TYPES.BAD
				}
			});
		}
	}

	render () {
		const { classes } = this.props;

		return (
			<div className={classes.root}>
				<Header/>
				<MenuMain/>
				<main className={classes.content}>
					<div className={classes.toolbar} />
					<Switch>
						<Route path="/" exact component={Connections}/>
						<Route path="/connections"  component={Connections}/>
						<Route path="/upload"  component={Upload}/>
						<Route path="/download"  component={Download}/>
						<Route path="/packages"  component={Packages}/>
						<Route path="/github"  component={Github}/>
						<Route path="*" component={Connections} />
					</Switch>
				</main>
				<Alert/>
			</div>
		);
	}
}

export default withStyles(classes, { withTheme: true })(withRouter(App));
