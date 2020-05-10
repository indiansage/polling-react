import { constants } from '../constants';
import { pollService } from '../services/pollService';
//import { alertActions } from './alertActions';

export const pollActions = {
    getAllPolls
    //createPoll
};

function getAllPolls() {
    return (dispatch) => {
        dispatch(request());

        pollService.getAll().then(
            (polls) => dispatch(success(polls)),
            (error) => dispatch(failure(error.toString()))
        );
    };

    function request() {
        return { type: constants.POLLS_GETALL_REQUEST };
    }
    function success(polls) {
        return { type: constants.POLLS_GETALL_SUCCESS, polls };
    }
    function failure(error) {
        return { type: constants.POLLS_GETALL_FAILURE, error };
    }
}

// function createPoll(poll, history) {
//     let poll = {
//         username: user.username,
//         password: user.password,
//         isAdmin: false
//     };

//     return (dispatch) => {
//         dispatch(request(userDetails));

//         userService.register(userDetails).then(
//             (userDetails) => {
//                 dispatch(success());
//                 history.push('/login');
//                 dispatch(alertActions.success('Registration successful'));
//             },
//             (error) => {
//                 dispatch(failure(error.toString()));
//                 dispatch(alertActions.error(error.toString()));
//             }
//         );
//     };

//     function request(user) {
//         return { type: constants.REGISTER_REQUEST, user };
//     }
//     function success(user) {
//         return { type: constants.REGISTER_SUCCESS, user };
//     }
//     function failure(error) {
//         return { type: constants.REGISTER_FAILURE, error };
//     }
// }
