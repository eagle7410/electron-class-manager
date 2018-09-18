import React from 'react';
import {render} from 'react-dom';
import {  HashRouter as Router, } from 'react-router-dom';
import './index.css';
import App from './App';
import {ListeningRouter} from './tools/ListeningRouter';
import registerServiceWorker from './registerServiceWorker';

import {Provider} from 'react-redux';
import {store, history} from './store';

render(
	<Router history={history}>
		<Provider store={store}>
			<ListeningRouter>
				<App/>
			</ListeningRouter>
		</Provider>
	</Router>
	,
	document.getElementById('root')
);

registerServiceWorker();
