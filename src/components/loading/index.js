import React, { Component } from 'react';

import Spinner from './spinner.svg';

const loadingStyles = {
	margin: '50px auto',
}

class Loading extends Component {
	render() {
		return (
			<div className="loadingApp">
				<Spinner width="100" height="100" style={loadingStyles} aria-label="Загрузка" />
			</div>
		)
	}
}

export default Loading;
