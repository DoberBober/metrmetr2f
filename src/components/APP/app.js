import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Nav from '../nav/';
import Apartments from '../apartments/';

import NotFound from '../404/';

import { API } from '../../helpers/const';

import { connect } from 'react-redux';
import { fetchMainInfo } from './actions.js';

const mapStateToProps = (state) => {
	return {
		mainInfo: state.mainInfo,
		hasError: state.hasError,
		isLoading: state.isLoading
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		fetchData: (url) => dispatch(fetchMainInfo(url)),
		showMap: (id) => dispatch(showMap(id)),
	}
}

class App extends React.Component {
	componentDidMount(){
		this.props.fetchData(API + 'all')
	}
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

export default connect(mapStateToProps, mapDispatchToProps)(App)
