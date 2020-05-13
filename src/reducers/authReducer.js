import { constants } from '../constants';

let user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { loggedIn: true, user } : {};

export function authentication(state = initialState, action) {
    switch (action.type) {
        case constants.LOGIN_REQUEST:
            //console.log(action.user);
            return {
                loggingIn: true,
                user: action.user
            };
        case constants.LOGIN_SUCCESS:
            console.log(action.user);
            return {
                loggedIn: true,
                user: action.user
            };
        case constants.LOGIN_FAILURE:
            return {};
        case constants.LOGOUT:
            return {};
        default:
            return state;
    }
}
