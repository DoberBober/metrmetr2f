export function filterData(state = {}, action){
	switch(action.type){
		case 'FILTER_DATA_FETCH_SUCCESS':
			return action.filterData
		default:
			return state
	}
}

export function filterState(state = {
	minPrice: 0,
	maxPrice: 0,
	rooms: [],
	stage: '',
	district: '',
	house: ''
}, action){
	switch(action.type){
		case 'FILTER_CHANGE_MIN_PRICE':
			return Object.assign({}, state, {
				minPrice: action.value
			})
		case 'FILTER_CHANGE_MAX_PRICE':
			return Object.assign({}, state, {
				maxPrice: action.value
			})
		case 'FILTER_CHANGE_ROOMS':
			if(state.rooms.indexOf(action.value) < 0){
				return Object.assign({}, state, {
					rooms: [...state.rooms, action.value]
				})
			} else {
				let newRoomsValue = state.rooms
				newRoomsValue.splice(state.rooms.indexOf(action.value), 1)
				return Object.assign({}, state, {
					rooms: newRoomsValue
				})
			}
		case 'FILTER_CHANGE_STAGE':
			return Object.assign({}, state, {
				stage: action.value
			})
		case 'FILTER_CHANGE_DISTRICT':
			return Object.assign({}, state, {
				district: action.value
			})
		case 'FILTER_CHANGE_HOUSE':
			return Object.assign({}, state, {
				house: action.value
			})
		default:
			return state
	}
}
