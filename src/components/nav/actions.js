export function isLoading(bool){
	return {
		type: 'IS_LOADING',
		isLoading: bool
	}
}

export function hasError(bool){
	return {
		type: 'ERROR',
		hasError: bool
	}
}

export function filterDataFetchSuccess(filterData){
	return {
		type: 'FILTER_DATA_FETCH_SUCCESS',
		filterData
	}
}

export function errorAfterFiveSecond(){
	return (dispatch) => {
		setTimeout(() => {
			dispatch(hasError(true))
		}, 5000)
	}
}

export function changeFilter(value, type){
	switch(type){
		case 'minPrice':
			return {
				type: 'FILTER_CHANGE_MIN_PRICE',
				value
			}
			break
		case 'maxPrice':
			return {
				type: 'FILTER_CHANGE_MAX_PRICE',
				value
			}
			break
		case 'rooms':
			return {
				type: 'FILTER_CHANGE_ROOMS',
				value
			}
			break
		case 'stage':
			return {
				type: 'FILTER_CHANGE_STAGE',
				value
			}
			break
		case 'district':
			return {
				type: 'FILTER_CHANGE_DISTRICT',
				value
			}
			break
		case 'house':
			return {
				type: 'FILTER_CHANGE_HOUSE',
				value
			}
			break
	}
}

export function fetchFilterData(url){
	return async (dispatch) => {
		await fetch(url)
			.then((response) => {
				if(!response.ok) {
					throw Error(response.statusText)
				}
				return response
			})
			.then((response) => response.json())
			.then((filterData) => {
				dispatch(filterDataFetchSuccess(filterData))
				dispatch(hasError(false))
			})
			.catch(() => {
				dispatch(hasError(true))
			})
	}
}
