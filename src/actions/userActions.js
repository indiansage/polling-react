import { constants } from '../constants';
import { userService } from '../services/userService';
import { alertActions } from './alertActions';
import { pollActions } from './pollActions';

export const userActions = {
    register,
    login,
    logout,
    getAll,
    delete: _delete
};
function register(user, history) {
    let userDetails = {
        username: user.username,
        password: user.password,
        isAdmin: false
    };

    return (dispatch) => {
        dispatch(request(userDetails));

        userService.register(userDetails).then(
            (userDetails) => {
                dispatch(success());
                history.push('/login');
                dispatch(alertActions.success('Registration successful'));
            },
            (error) => {
                dispatch(failure(error.toString()));
                dispatch(alertActions.error(error.toString()));
            }
        );
    };

    function request(user) {
        return { type: constants.REGISTER_REQUEST, user };
    }
    function success(user) {
        return { type: constants.REGISTER_SUCCESS, user };
    }
    function failure(error) {
        return { type: constants.REGISTER_FAILURE, error };
    }
}

function login(username, password, history) {
    return (dispatch) => {
        dispatch(request({ username }));

        userService.login(username, password).then(
            (user) => {
                dispatch(success(user));
                history.push('/');
            },
            (error) => {
                dispatch(failure(error.toString()));
                dispatch(alertActions.error(error.toString()));
            }
        );
    };

    function request(user) {
        return { type: constants.LOGIN_REQUEST, user };
    }
    function success(user) {
        return { type: constants.LOGIN_SUCCESS, user };
    }
    function failure(error) {
        return { type: constants.LOGIN_FAILURE, error };
    }
}

function logout() {
    return (dispatch) => {
        userService.logout();
        dispatch(pollActions.clearAllPolls());
        dispatch(removeUserFromState());
    };
    function removeUserFromState() {
        return { type: constants.LOGOUT };
    }
}

function getAll() {
    return (dispatch) => {
        dispatch(request());

        userService.getAll().then(
            (users) => dispatch(success(users)),
            (error) => dispatch(failure(error.toString()))
        );
    };

    function request() {
        return { type: constants.GETALL_REQUEST };
    }
    function success(users) {
        return { type: constants.GETALL_SUCCESS, users };
    }
    function failure(error) {
        return { type: constants.GETALL_FAILURE, error };
    }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return (dispatch) => {
        dispatch(request(id));

        userService.delete(id).then(
            (user) => dispatch(success(id)),
            (error) => dispatch(failure(id, error.toString()))
        );
    };

    function request(id) {
        return { type: constants.DELETE_REQUEST, id };
    }
    function success(id) {
        return { type: constants.DELETE_SUCCESS, id };
    }
    function failure(id, error) {
        return { type: constants.DELETE_FAILURE, id, error };
    }
}
