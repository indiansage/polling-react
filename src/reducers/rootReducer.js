import { combineReducers } from 'redux';
import { registration } from './registrationReducer';
import { authentication } from './authReducer';
import { polls } from './pollReducer';
import { alert } from './alertReducer';

export default combineReducers({
    registration,
    alert,
    authentication,
    polls
});
