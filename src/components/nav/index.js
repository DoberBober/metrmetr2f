import React, { Component } from 'react';
import { NavLink } from "react-router-dom";

import Logo from './logo.svg';
import './nav.styl';

class Nav extends Component {
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
					<form action="#" className="filter">
						<section className="form__section">
							<p className="form__label">Цена</p>
							<div className="form__group">
								<input className="form__input form__input--price" type="number" pattern="[0-9]" min="0" step="100000" placeholder="0" aria-label="Минимальная цена" />
								<input className="form__input form__input--price" type="number" pattern="[0-9]" min="0" step="100000" placeholder="1" aria-label="Максимальная цена" />
							</div>
						</section>
						<section className="form__section">
							<p className="form__label">Количество комнат</p>
							<div className="form__group">
								<input className="form__checkbox visually-hidden" type="checkbox" name="rooms" id="Ст" value="Ст"/>
								<label className="form__input" htmlFor="Ст">Ст</label>
								<input className="form__checkbox visually-hidden" type="checkbox" name="rooms" id="1" value="1"/>
								<label className="form__input" htmlFor="1">1</label>
								<input className="form__checkbox visually-hidden" type="checkbox" name="rooms" id="2" value="2"/>
								<label className="form__input" htmlFor="2">2</label>
								<input className="form__checkbox visually-hidden" type="checkbox" name="rooms" id="3" value="3"/>
								<label className="form__input" htmlFor="3">3</label>
							</div>
						</section>
						<section className="form__section">
							<label className="form__label" htmlFor="stage">Этап</label>
							<select className="form__input form__input--select" name="stage" id="stage">
								<option value="Фундамент">Фундамент</option>
							</select>
						</section>
						<section className="form__section">
							<label className="form__label" htmlFor="district">Район</label>
							<select className="form__input form__input--select" name="district" id="district">
								<option value="Редукторный">Редукторный</option>
							</select>
						</section>
						<section className="form__section">
							<label className="form__label" htmlFor="house">ЖК</label>
							<select className="form__input form__input--select" name="house" id="house">
								<option value="Московский">Московский</option>
							</select>
						</section>
					</form>
				</div>
			</header>
		)
	}
}

export default Nav
