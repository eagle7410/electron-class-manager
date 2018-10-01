import { routerReducer } from 'react-router-redux';
import {combineReducers} from 'redux';
import {Menu} from './Menu'
import {Connections} from './Connections'
import {Auth} from './Auth'
import {Alert} from './Alert'
import {Upload} from './Upload'
import {DialogAddToJson} from './DialogAddToJson'
import {Steps} from './Steps'
import {StepSetting} from './StepSetting'

const reducer = combineReducers({
	routing: routerReducer,
	StepSetting,
	Steps,
	DialogAddToJson,
	Upload,
	Alert,
	Auth,
	Connections,
	Menu,
});

export {reducer};
