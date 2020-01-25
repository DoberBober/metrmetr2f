import React from 'react';
import { hot } from 'react-hot-loader/root';
import { Route, Switch } from "react-router-dom";

import App from './components/APP/app.js';
import './styles/styles.styl';


class Root extends React.Component {
	render() {
		return (
			<App />
		)
	}
}

export default hot(Root);
