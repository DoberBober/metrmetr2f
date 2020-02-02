import React, { Component } from 'react';
import { Link } from "react-router-dom";

import './apartments.styl';

import Hirepurchase from './hirepurchase.svg';
import Mortgage from './mortgage.svg';
import Maternal from './maternal.svg';

import Empty from '../empty/';
import Loading from '../loading/';
import SomethingWrong from '../somethingWrong/';

import { API } from '../../helpers/const';

import { connect } from 'react-redux';
import { fetchApartments } from './actions.js';

const mapStateToProps = (state) => {
	return {
		apartments: state.apartments,
		filterState: state.filterState,
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
		evt.currentTarget.classList.toggle('table__item--open')
	}
	render() {
		if (this.props.hasError) {
			return <SomethingWrong />;
		}

		if (this.props.isLoading) {
			return <Loading />;
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
						{!this.props.apartments.length &&
							<Empty />
						}
						{/* Опа, говнокод! */}
						{this.props.apartments
							.filter((apartment) => {
								if(this.props.filterState.stage){
									return apartment.stage == this.props.filterState.stage
								} else {
									return apartment
								}
							})
							.filter((apartment) => {
								if(this.props.filterState.house){
									return apartment.name == this.props.filterState.house
								} else {
									return apartment
								}
							})
							.filter((apartment) => {
								if(this.props.filterState.district){
									return apartment.district == this.props.filterState.district
								} else {
									return apartment
								}
							})
							.map((item) => {
								return item.apartments
									.filter((apartment) => {
										if(this.props.filterState.minPrice){
											return apartment.cost >= this.props.filterState.minPrice
										} else {
											return apartment
										}
									})
									.filter((apartment) => {
										if(this.props.filterState.maxPrice){
											return apartment.cost <= this.props.filterState.maxPrice
										} else {
											return apartment
										}
									})
									.filter((apartment) => {
										if(this.props.filterState.rooms && this.props.filterState.rooms.length){
											return this.props.filterState.rooms.indexOf(String(apartment.rooms)) > -1
										} else {
											return apartment
										}
									})
									.map((apartment) => {
										return(
											<section className="table__group" key={apartment.id}>
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
												{apartment.floors
													.filter((floor) => {
														if(this.props.filterState.maxPrice){
															return floor.cost <= this.props.filterState.maxPrice
														} else {
															return floor
														}
													})
													.map((floor, index) => {
														return(
															<section
																className="table__item table__item--options"
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
													})
												}
											</section>
										)
									})
							})
						}
					</div>
				</div>
			</article>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Apartments)
