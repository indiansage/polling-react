import { combineReducers } from 'redux';
import { registration } from './registrationReducer';
import { authentication } from './authReducer';
import { users } from './userReducer';
import { polls } from './pollReducer';
import { alert } from './alertReducer';

export default combineReducers({
    registration,
    alert,
    authentication,
    users,
    polls
});
