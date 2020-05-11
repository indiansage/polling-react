import { constants } from '../constants';

const initialState = { showCreatePollModal: false };

export function polls(state = initialState, action) {
    switch (action.type) {
        case constants.POLLS_GETALL_REQUEST:
            return { ...state, loading: true };
        case constants.POLLS_GETALL_SUCCESS:
            const livePolls = action.polls.filter((poll) => poll.live);
            const closedPolls = action.polls.filter((poll) => !poll.live);
            return { ...state, loading: false, livePolls, closedPolls };
        case constants.POLLS_GETALL_FAILURE:
            return { ...state, loading: false, error: action.error };
        case constants.POLL_CREATE_REQUEST:
            return { ...state, creating: true };
        case constants.POLL_CREATE_SUCCESS:
            return { ...state, creating: false };
        case constants.POLL_CREATE_FAILURE:
            return { ...state, creating: false, error: action.error };
        case constants.POLL_CLOSE_REQUEST:
            return { ...state, closing: true };
        case constants.POLL_CLOSE_SUCCESS:
            return { ...state, closing: false };
        case constants.POLL_CLOSE_FAILURE:
            return { ...state, closing: false, error: action.error };
        case constants.TOGGLE_CREATE_POLL_MODAL:
            return {
                ...state,
                showCreatePollModal: !state.showCreatePollModal
            };
        case constants.CLEAR_ALL_POLLS:
            return {
                ...initialState
            };
        default:
            return state;
    }
}
