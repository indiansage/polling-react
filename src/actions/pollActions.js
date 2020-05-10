import { constants } from '../constants';
import { pollService } from '../services/pollService';
import { alertActions } from './alertActions';

export const pollActions = {
    getAllPolls,
    createPoll,
    toggleCreatePollModal
};

function getAllPolls() {
    return (dispatch) => {
        dispatch(request());

        pollService.getAll().then(
            (polls) => dispatch(success(polls)),
            (error) => {
                dispatch(failure(error.toString()));
                dispatch(alertActions.error(error.toString()));
            }
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

function createPoll(poll) {
    poll.live = true;
    return (dispatch) => {
        dispatch(request());
        pollService.create(poll).then(
            () => {
                dispatch(success());
                dispatch(toggleCreatePollModal());
                dispatch(alertActions.success('Creation of poll successful'));
                dispatch(getAllPolls());
            },
            (error) => {
                dispatch(failure(error.toString()));
                dispatch(alertActions.error(error.toString()));
            }
        );
    };

    function request() {
        return { type: constants.POLLS_CREATE_REQUEST };
    }
    function success() {
        return { type: constants.POLLS_CREATE_SUCCESS };
    }
    function failure(error) {
        return { type: constants.POLLS_CREATE_FAILURE, error };
    }
}

function toggleCreatePollModal() {
    return { type: constants.TOGGLE_CREATE_POLL_MODAL };
}
