import authReducer from './authReducer';
import mapReducer from './mapReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    auth: authReducer,
    map: mapReducer
});

export default rootReducer;