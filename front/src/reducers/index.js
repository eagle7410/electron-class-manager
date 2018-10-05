import { routerReducer } from 'react-router-redux';
import {combineReducers} from 'redux';
import {Menu} from './Menu'
import {Connections} from './Connections'
import {Auth} from './Auth'
import {Alert} from './Alert'
import {Upload} from './Upload'
import {DialogAddToJson} from './DialogAddToJson'
import {DialogAddClassDependency} from './DialogAddClassDependency'
import {Steps} from './Steps'
import {StepSetting} from './StepSetting'
import {StepResult} from './StepResult'
import {StepReport} from './StepReport'

const reducer = combineReducers({
	routing: routerReducer,
	StepReport,
	StepResult,
	StepSetting,
	Steps,
	DialogAddClassDependency,
	DialogAddToJson,
	Upload,
	Alert,
	Auth,
	Connections,
	Menu,
});

export {reducer};
