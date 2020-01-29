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
