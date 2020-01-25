import React, { Component } from 'react';

class SomethingWrong extends Component {
	render() {
		return (
			<article>
				<div className="container">
					<p>К сожалению, что-то пошло не так. Пожалуйста, <a href="javascript:document.location.reload(true);">перезагрузите</a> страницу.</p>
				</div>
			</article>
		)
	}
}

export default SomethingWrong;
