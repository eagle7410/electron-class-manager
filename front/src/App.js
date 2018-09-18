import React,{Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import {Route, Switch} from 'react-router-dom';
import {withRouter} from 'react-router'
import Api from './Api'
import Header from './componets/Header'
import MenuMain from './componets/MenuMain'
import Alert from './componets/Alert'

import {store} from './store';

import {ICON_TYPES, TYPES} from "./const/alert";
import {
PREFIX_CONNECTION as USERS,
PREFIX_ALERT as ALERT,
PREFIX_EVENT_ROOM as EVENT_ROOM
} from "./const/prefix";
import {
	Connections,
	Listeners,
	Emitter
} from './pages'

import {classes} from './const/styles'


class App extends  Component {

	async componentDidMount() {
		try {

			const data = await Api.getUsers();

			store.dispatch({type : `${USERS}_SET`, data});

			window.addEventListener(
				Api.eventRoom(),
				event => store.dispatch({type : `${EVENT_ROOM}_ADD`, data: event.detail})
			);

			return true;

		} catch (e) {

			console.error('Error get users', e);

			store.dispatch({
				type : `${ALERT}_OPEN`,
				data : {
					message : e.message || 'Error get users',
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
						<Route path="/emitter"  component={Emitter}/>
						<Route path="/listen"  component={Listeners}/>
					</Switch>
				</main>
				<Alert/>
			</div>
		);
	}
}

export default withStyles(classes, { withTheme: true })(withRouter(App));
