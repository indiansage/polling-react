import { combineReducers } from 'redux';
import { registration } from './registrationReducer';
//import { } from './alertReducer';
import { alert } from './alertReducer';

export default combineReducers({
    registration,
    alert
});
