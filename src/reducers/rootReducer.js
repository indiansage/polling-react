import { combineReducers } from 'redux';
import { registration } from './registrationReducer';
import { authentication } from './authReducer';
import { alert } from './alertReducer';

export default combineReducers({
    registration,
    alert,
    authentication
});
