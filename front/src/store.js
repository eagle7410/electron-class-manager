import {reducer} from "./reducers";
import {composeWithDevTools} from "redux-devtools-extension";
import {routerMiddleware, syncHistoryWithStore} from "react-router-redux";
import {createStore, applyMiddleware} from 'redux';
import { createBrowserHistory as createHistory } from 'history';

const browserHistory = createHistory();
const middleware = routerMiddleware(browserHistory);
const store = createStore(reducer, composeWithDevTools(applyMiddleware(middleware)));
const history = syncHistoryWithStore(browserHistory, store);

export {store, history}
