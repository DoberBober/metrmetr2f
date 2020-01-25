export function apartments(state = [], action){
	switch(action.type){
		case 'APARTMENTS_FETCH_DATA_SUCCESS':
			return action.apartments
		default:
			return state
	}
}
