import { combineReducers } from 'redux';
import loginReducer from './components/login/reducer';
import registerReducer from './components/register/reducer';

export default combineReducers({
    loginReducer,
    registerReducer
});
