import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import { hasError, isLoading } from './common';
import { filterData } from './filterData';
import { apartments } from './apartments';

export default combineReducers({
	routing: routerReducer,
	hasError,
	isLoading,
	filterData,
	apartments
})
