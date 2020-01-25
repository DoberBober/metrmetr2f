import React, { Component } from 'react';
import { Link } from "react-router-dom";

import './apartments.styl'

import { API } from '../../helpers/const';

import { connect } from 'react-redux';
import { fetchApartments } from './actions.js';

const mapStateToProps = (state) => {
	return {
		apartments: state.apartments,
		hasError: state.hasError,
		isLoading: state.isLoading
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		fetchData: (url) => dispatch(fetchApartments(url))
	}
}

class Apartments extends Component {
	componentDidMount(){
		this.props.fetchData(API + 'all')
	}
	render() {
		if (this.props.hasError) {
			return <p>К сожалению, что-то пошло не так. Пожалуйста, <a href="javascript:document.location.reload(true);">перезагрузите</a> страницу.</p>;
		}

		if (this.props.isLoading) {
			return <p>Загрузка...</p>;
		}
		return (
			<article>
				{this.props.apartments.map((item) => {
					return(
						<h1 key={item.id}>{item.title}</h1>
					)
				})}
			</article>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Apartments)
