import { constants } from '../constants';
import { userService } from '../services/userService';
import { alertActions } from './alertActions';
import { pollActions } from './pollActions';

export const userActions = {
    register,
    login,
    logout,
    getAllUsers,
    removeUser,
    toggleAdminUser
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

function getAllUsers() {
    return (dispatch) => {
        dispatch(request());

        userService.getAllUsers().then(
            (users) => dispatch(success(users)),
            (error) => dispatch(failure(error.toString()))
        );
    };

    function request() {
        return { type: constants.GET_ALL_USERS_REQUEST };
    }
    function success(users) {
        return { type: constants.GET_ALL_USERS_SUCCESS, users };
    }
    function failure(error) {
        return { type: constants.GET_ALL_USERS_FAILURE, error };
    }
}

function removeUser(id) {
    return (dispatch) => {
        dispatch(request(id));

        userService.removeUser(id).then(
            (user) => dispatch(success(id)),
            (error) => dispatch(failure(id, error.toString()))
        );
    };

    function request(id) {
        return { type: constants.REMOVE_USER_REQUEST, id };
    }
    function success(id) {
        return { type: constants.REMOVE_USER_SUCCESS, id };
    }
    function failure(id, error) {
        return { type: constants.REMOVE_USER_FAILURE, id, error };
    }
}

function toggleAdminUser(id, isAdmin) {
    return (dispatch) => {
        dispatch(request(id));

        userService.toggleAdminUser(id, isAdmin).then(
            (user) => dispatch(success(id)),
            (error) => dispatch(failure(id, error.toString()))
        );
    };

    function request(id) {
        return { type: constants.TOGGLE_ADMIN_USER_REQUEST, id };
    }
    function success(id) {
        return { type: constants.TOGGLE_ADMIN_USER_SUCCESS, id };
    }
    function failure(id, error) {
        return { type: constants.TOGGLE_ADMIN_USER_FAILURE, id, error };
    }
}
