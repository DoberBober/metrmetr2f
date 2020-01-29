import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import { hasError, isLoading } from './common';
import { filterData, filterState } from './filterData';
import { apartments } from './apartments';

export default combineReducers({
	routing: routerReducer,
	hasError,
	isLoading,
	filterData,
	filterState,
	apartments
})
