export function filterData(state = {}, action){
	switch(action.type){
		case 'FILTER_DATA_FETCH_SUCCESS':
			return action.filterData
		default:
			return state
	}
}
