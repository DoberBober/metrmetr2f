import React from 'react';
import { render } from 'react-dom';
// import { render } from 'react-snapshot';
import Root from './root';
import { BrowserRouter } from 'react-router-dom';

import './styles/styles.styl';

import { Provider } from 'react-redux';

import { store } from './helpers/createStore';
import { syncHistoryWithStore } from 'react-router-redux';
import { createBrowserHistory } from 'history';

const history = syncHistoryWithStore(createBrowserHistory(), store);


render(
	<Provider store={store}>
		<BrowserRouter>
			<Root history={history} />
		</BrowserRouter>
	</Provider>,
	document.getElementById('app')
);

if (module.hot) {
	module.hot.accept();
}
