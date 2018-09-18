import { routerReducer } from 'react-router-redux';
import {combineReducers} from 'redux';
import {Menu} from './Menu'
import {Events} from './Events'
import {Connections} from './Connections'
import {Auth} from './Auth'
import {Alert} from './Alert'
import {Emitter} from './Emitter'

const reducer = combineReducers({
	routing: routerReducer,
	Emitter,
	Alert,
	Auth,
	Connections,
	Menu,
	Events
});

export {reducer};
