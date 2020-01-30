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
	apartmentClick(evt){
		if(!evt.currentTarget.classList.contains('table__item--open')){
			let anotherApartments = document.querySelectorAll('.table__item--visible')

			if(anotherApartments.length){
				document.querySelector('.table__item--open').classList.remove('table__item--open')
				for(let i=0; i<anotherApartments.length; i++){
					anotherApartments[i].classList.remove('table__item--visible')
					anotherApartments[i].classList.add('table__item--hidden')
				}
			}
		}

		let apartments = document.querySelectorAll(`.table__item[data-apartmentname="${evt.currentTarget.dataset.apartmentname}"]:not(.table__item--main)`)
		if(apartments.length){
			evt.currentTarget.classList.toggle('table__item--open')
			for(let i=0; i<apartments.length; i++){
				apartments[i].classList.toggle('table__item--hidden')
				apartments[i].classList.toggle('table__item--visible')
			}
		}
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
							<div className="table__cell table__cell--legend">Этаж</div>
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
							return item.apartments.map((apartment) => {
								return(
									<React.Fragment key={apartment.id}>
										<section
											className={apartment.floors.length ? "table__item table__item--main table__item--spoiler" : "table__item table__item--main"}
											data-apartmentname={item.slug + '-' + apartment.id}
											onClick={apartment.floors.length ? this.apartmentClick : null}
											onKeyDown={apartment.floors.length ? (evt) => { evt.keyCode == 13 ? this.apartmentClick(evt) : null } : null}
											tabIndex={apartment.floors.length ? "0" : ""}
										>
											<div className="table__cell">{item.name}</div>

											<div className="table__cell">{apartment.rooms}</div>
											<div className="table__cell">
												{

													(apartment.floors.length ? apartment.floors[0]['floor'] : '')
													+
													(apartment.floors.length>1 ? ('...' + apartment.floors[apartment.floors.length-1]['floor']) : '')

												}
											</div>
											<div className="table__cell">{apartment.square}</div>
											<div className="table__cell">{apartment.floors.length ? ('от ' + apartment.price) : apartment.price}</div>
											<div className="table__cell">{apartment.floors.length ? ('от ' + apartment.cost) : apartment.cost}</div>

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
												<a href={'tel:' + item.phone.replace(/[-()\s]/g, '')}>{item.phone}</a>
											</div>
										</section>
										{apartment.floors.map((floor, index) => {
											return(
												<section
													className="table__item table__item--hidden"
													key={floor.id}
													data-apartmentname={item.slug + '-' + apartment.id}
												>
													<div className="table__cell">{item.name}</div>

													<div className="table__cell">{apartment.rooms}</div>
													<div className="table__cell">{floor.floor}</div>
													<div className="table__cell">{apartment.square}</div>
													<div className="table__cell">{floor.price}</div>
													<div className="table__cell">{floor.cost}</div>

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
														<a href={'tel:' + item.phone.replace(/[-()\s]/g, '')}>{item.phone}</a>
													</div>
												</section>
											)
										})}
									</React.Fragment>
								)
							})
						})}
					</div>
				</div>
			</article>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Apartments)
