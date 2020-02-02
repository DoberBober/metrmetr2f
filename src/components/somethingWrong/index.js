import React, { Component } from 'react';

class SomethingWrong extends Component {
	render() {
		return (
			<div className="errorApp">
				<p>К сожалению, что-то пошло не так. Пожалуйста, <a href="javascript:document.location.reload(true);">перезагрузите</a> страницу.</p>
			</div>
		)
	}
}

export default SomethingWrong;
