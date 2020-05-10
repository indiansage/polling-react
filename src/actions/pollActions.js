import { constants } from '../constants';
import { pollService } from '../services/pollService';
//import { alertActions } from './alertActions';

export const pollActions = {
    getAllPolls
};

function getAllPolls() {
    return (dispatch) => {
        dispatch(request());

        pollService.getAll().then(
            (users) => dispatch(success(users)),
            (error) => dispatch(failure(error.toString()))
        );
    };

    function request() {
        return { type: constants.POLLS_GETALL_REQUEST };
    }
    function success(users) {
        return { type: constants.POLLS_GETALL_SUCCESS, users };
    }
    function failure(error) {
        return { type: constants.POLLS_GETALL_FAILURE, error };
    }
}
