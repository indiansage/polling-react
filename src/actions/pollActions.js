import { constants } from '../constants';
import { pollService } from '../services/pollService';
import { alertActions } from './alertActions';

export const pollActions = {
    getAllPolls,
    createPoll,
    closePoll,
    vote,
    getVotes,
    getClosedPollsWithVotes,
    toggleCreatePollModal,
    clearAllPolls
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
        return { type: constants.POLL_CREATE_REQUEST };
    }
    function success() {
        return { type: constants.POLL_CREATE_SUCCESS };
    }
    function failure(error) {
        return { type: constants.POLL_CREATE_FAILURE, error };
    }
}

function closePoll(pollId) {
    return (dispatch) => {
        dispatch(request());
        pollService.close(pollId).then(
            () => {
                dispatch(success());
                dispatch(alertActions.success('Poll closed successfully!'));
                dispatch(getAllPolls());
            },
            (error) => {
                dispatch(failure(error.toString()));
                dispatch(alertActions.error(error.toString()));
            }
        );
    };

    function request() {
        return { type: constants.POLL_CLOSE_REQUEST, pollId };
    }
    function success() {
        return { type: constants.POLL_CLOSE_SUCCESS, pollId };
    }
    function failure(error) {
        return { type: constants.POLL_CLOSE_FAILURE, pollId, error };
    }
}

function vote(pollId, option) {
    return (dispatch) => {
        dispatch(request());
        pollService.vote(pollId, option).then(
            () => {
                dispatch(success());
                dispatch(alertActions.success('Voted!'));
                dispatch(getAllPolls());
            },
            (error) => {
                dispatch(failure(error.toString()));
                dispatch(alertActions.error(error.toString()));
            }
        );
    };

    function request() {
        return { type: constants.POLL_VOTE_REQUEST, pollId };
    }
    function success() {
        return { type: constants.POLL_VOTE_SUCCESS, pollId };
    }
    function failure(error) {
        return { type: constants.POLL_VOTE_FAILURE, pollId, error };
    }
}

function getVotes(pollId) {
    return (dispatch) => {
        dispatch(request());
        pollService.getVotes(pollId).then(
            (votes) => {
                dispatch(success(votes));
            },
            (error) => {
                dispatch(failure(error.toString()));
                dispatch(alertActions.error(error.toString()));
            }
        );
    };

    function request() {
        return { type: constants.GET_VOTES_REQUEST };
    }
    function success(votes) {
        return { type: constants.GET_VOTES_SUCCESS, votes };
    }
    function failure(error) {
        return { type: constants.GET_VOTES_FAILURE, error };
    }
}

function getClosedPollsWithVotes() {
    return (dispatch) => {
        dispatch(request());
        pollService.getAllClosedPollsWithVotes().then(
            (items) => {
                dispatch(success(items));
            },
            (error) => {
                dispatch(failure(error.toString()));
                dispatch(alertActions.error(error.toString()));
            }
        );
    };

    function request() {
        return { type: constants.GET_ALL_CLOSED_POLLS_WITH_VOTES_REQUEST };
    }
    function success(items) {
        return {
            type: constants.GET_ALL_CLOSED_POLLS_WITH_VOTES_SUCCESS,
            items
        };
    }
    function failure(error) {
        return {
            type: constants.GET_ALL_CLOSED_POLLS_WITH_VOTES_FAILURE,
            error
        };
    }
}

function toggleCreatePollModal() {
    return { type: constants.TOGGLE_CREATE_POLL_MODAL };
}

function clearAllPolls() {
    return { type: constants.CLEAR_ALL_POLLS };
}
