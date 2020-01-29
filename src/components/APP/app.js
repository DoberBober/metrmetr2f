import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Nav from '../nav/';
import Apartments from '../apartments/';

import NotFound from '../404/';

class App extends React.Component {
	render() {
		return (
			<Router history={this.props.history}>
				<Nav />
				<Switch>
					<Route exact path='/' render={props => {
						return(
							<React.Fragment>
								<Apartments />
							</React.Fragment>
						)
					}} />

					<Route component={NotFound} />
				</Switch>
			</Router>
		)
	}
}

export default App
