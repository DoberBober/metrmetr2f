import React, { Component } from 'react';
import { NavLink } from "react-router-dom";

import Logo from './logo.svg';
import './nav.styl';

import { API } from '../../helpers/const';

import { connect } from 'react-redux';
import { fetchFilterData } from './actions.js';
import { changeFilter } from './actions.js';

const mapStateToProps = (state) => {
	return {
		filterData: state.filterData,
		hasError: state.hasError,
		isLoading: state.isLoading,
		filterState: state.filterState
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		fetchData: (url) => dispatch(fetchFilterData(url)),
		changeFilter: (value, type) => dispatch(changeFilter(value, type))
	}
}

class Nav extends Component {
	componentDidMount(){
		this.props.fetchData(API + 'filterData')
	}
	filter(evt, type){
		switch(type){
			case 'minPrice':
				this.props.changeFilter(evt.target.value, 'minPrice')
				break
			case 'maxPrice':
				this.props.changeFilter(evt.target.value, 'maxPrice')
				break
			case 'rooms':
				this.props.changeFilter(evt.target.value, 'rooms')
				break
			case 'stage':
				this.props.changeFilter(evt.target.value, 'stage')
				break
			case 'district':
				this.props.changeFilter(evt.target.value, 'district')
				break
			case 'house':
				this.props.changeFilter(evt.target.value, 'house')
				break
			default:
				break
		}
	}
	render() {
		return (
			<header className="mainHeader">
				<div className="mainHeader__container container">
					<div className="logo">
						<a className="logo__link">
							<Logo width="348" height="55" />
						</a>
						<p className="logo__text">База новостроек Махачкалы и Каспийска</p>
						<p className="logo__text logo__text--secondary">Рады новым знакомствам, идеям и предложениям <a href="mailto:info@metrmetr2.ru">info@metrmetr2.ru</a>
						</p>
					</div>
					<form action="http://localhost:8000/api/v0/filter" className="filter">
						{this.props.filterData.maxPrice &&
							<section className="form__section">
								<p className="form__label">Цена</p>
								<div className="form__group">
									<input
										className="form__input form__input--price"
										type="number"
										name="minPrice"
										pattern="[0-9]"
										min="0"
										placeholder="0"
										aria-label="Минимальная цена"
										onChange={(evt) => this.filter(evt, "minPrice")}
									/>
									<input
										className="form__input form__input--price"
										type="number"
										name="maxPrice"
										pattern="[0-9]"
										min="0"
										max={this.props.filterData.maxPrice}
										placeholder={this.props.filterData.maxPrice}
										aria-label="Максимальная цена"
										onChange={(evt) => this.filter(evt, "maxPrice")}
									/>
								</div>
							</section>
						}
						{this.props.filterData.rooms &&
							<section className="form__section">
								<p className="form__label">Количество комнат</p>
								<div className="form__group form__group--rooms">
									{this.props.filterData.rooms.map((room) => {
										return(
											<React.Fragment key={room}>
												<input
													className="form__checkbox visually-hidden"
													type="checkbox"
													name="rooms"
													id={"room-" + room}
													value={room}
													onChange={(evt) => this.filter(evt, "rooms")}
												/>
												<label className="form__input" htmlFor={"room-" + room}>{room}</label>
											</React.Fragment>
										)
									})}
								</div>
							</section>
						}

						{this.props.filterData.stages &&
							<section className="form__section">
								<label className="form__label" htmlFor="stage">Этап</label>
								<select
									className="form__input form__input--select"
									name="stage"
									id="stage"
									onChange={(evt) => this.filter(evt, "stage")}
								>
									<option value="" defaultValue >Не выбрано</option>
									{this.props.filterData.stages.map((stage) => {
										return <option key={stage.id} value={stage.name}>{stage.name}</option>
									})}
								</select>
							</section>
						}

						{this.props.filterData.districts &&
							<section className="form__section">
								<label className="form__label" htmlFor="district">Район</label>
								<select
									className="form__input form__input--select"
									name="district"
									id="district"
									onChange={(evt) => this.filter(evt, "district")}
								>
									<option value="" defaultValue >Не выбрано</option>
									{this.props.filterData.districts.map((district) => {
										return <option key={district.id} value={district.name}>{district.name}</option>
									})}
								</select>
							</section>
						}

						{this.props.filterData.houses &&
							<section className="form__section">
								<label className="form__label" htmlFor="house">ЖК</label>
								<select
									className="form__input form__input--select"
									name="house"
									id="house"
									onChange={(evt) => this.filter(evt, "house")}
								>
									<option value="" defaultValue >Не выбрано</option>
									{this.props.filterData.houses.map((house) => {
										return <option key={house.id} value={house.name}>{house.name}</option>
									})}
								</select>
							</section>
						}
					</form>
				</div>
			</header>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Nav)
