import React, { Component } from 'react';
import { Link } from "react-router-dom";

import './apartments.styl';

import Hirepurchase from './hirepurchase.svg';
import Mortgage from './mortgage.svg';
import Maternal from './maternal.svg';

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
			<article className="table">
				<div className="container">
					<div className="table__list">
						{/* We need subgrids! */}
						<section className="table__item table__item--head">
							<div className="table__cell table__cell--legend">ЖК</div>
							<div className="table__cell table__cell--legend">Комн</div>
							<div className="table__cell table__cell--legend">м²</div>
							<div className="table__cell table__cell--legend">Цена&nbsp;за&nbsp;м², ₽</div>
							<div className="table__cell table__cell--legend">Стоимость, ₽</div>
							<div className="table__cell table__cell--legend">Этап</div>
							<div className="table__cell table__cell--legend">Сдача</div>
							<div className="table__cell table__cell--legend">Адрес</div>
							<div className="table__cell table__cell--legend">Способы оплаты</div>
							<div className="table__cell table__cell--legend">Застройщик</div>
							<div className="table__cell table__cell--legend">Телефон</div>
						</section>
						{this.props.apartments.map((item) => {
							return(
								<section className="table__item" key={item.id}>
									<div className="table__cell">{item.name}</div>

												<div className="table__cell">К1</div>
												<div className="table__cell">П120</div>
												<div className="table__cell">Ц20 000</div>
												<div className="table__cell">С8 000 000</div>

{/*									{item.apartments.map((item) => {
										return(
											<React.Fragment key={item.id}>
												<div className="table__cell">{item.rooms}</div>
												<div className="table__cell">{item.square}</div>
												<div className="table__cell">{item.price}</div>
												<div className="table__cell">{item.cost}</div>
											</React.Fragment>
										)
									})}*/}
									<div className="table__cell">{item.stage}</div>
									<div className="table__cell">{item.completion}</div>
									<div className="table__cell">{item.district}<br />{item.address}</div>
									<div className="table__cell table__cell--options">
										{item.hirepurchase &&
											<Hirepurchase width="25" aria-label="Рассрочка" title="Рассрочка" />
										}
										{item.mortgage &&
											<Mortgage width="25" aria-label="Ипотека" title="Ипотека" />
										}
										{item.maternalcapital &&
											<Maternal width="25" aria-label="Материнский капитал" title="Материнский капитал" />
										}
									</div>
									<div className="table__cell">{item.company}</div>
									<div className="table__cell">
										<a href="tel:88002000600">8(800)200-06-00</a>
									</div>
								</section>
							)
						})}
					</div>
				</div>
			</article>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Apartments)
