import React, { Component } from 'react';
import { NavLink } from "react-router-dom";

import './nav.styl';

class Nav extends Component {
	render() {
		return (
			<header className="mainHeader">
				<div className="mainHeader__container container">
					<div className="logo">
						<a>
							<img src="" alt="metrmetr2"/>
						</a>
						<p>База новостроек Махачкалы и Каспийска</p>
						<p>Рады новым знакомствам, идеям и предложениям info@metrmetr2.ru</p>
					</div>
				</div>
			</header>
		)
	}
}

export default Nav
