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
        case constants.POLL_VOTE_REQUEST:
            return { ...state, voting: true };
        case constants.POLL_VOTE_SUCCESS:
            return { ...state, voting: false, votes: action.votes };
        case constants.POLL_VOTE_FAILURE:
            return { ...state, voting: false, error: action.error };
        case constants.GET_ALL_CLOSED_POLLS_WITH_VOTES_REQUEST: {
            const closedPollsWithVotes = {};
            closedPollsWithVotes.loading = true;
            return { ...state, closedPollsWithVotes };
        }
        case constants.GET_ALL_CLOSED_POLLS_WITH_VOTES_SUCCESS: {
            const closedPollsWithVotes = {};
            closedPollsWithVotes.loading = false;
            //console.log('act', action.items);
            closedPollsWithVotes.items = action.items;
            return { ...state, closedPollsWithVotes };
        }
        case constants.GET_ALL_CLOSED_POLLS_WITH_VOTES_FAILURE: {
            const closedPollsWithVotes = {};
            closedPollsWithVotes.loading = false;
            closedPollsWithVotes.error = action.error;
            return { ...state, closedPollsWithVotes };
        }
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
