import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import { hasError, isLoading } from './common';
import { mainInfo } from './mainInfo';
import { apartments } from './apartments';

export default combineReducers({
	routing: routerReducer,
	hasError,
	isLoading,
	mainInfo,
	apartments
})
