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
        case constants.POLLS_CREATE_REQUEST:
            return { ...state, creating: true };
        case constants.POLLS_CREATE_SUCCESS:
            return { ...state, creating: false };
        case constants.POLLS_CREATE_FAILURE:
            return { ...state, creating: false, error: action.error };
        case constants.TOGGLE_CREATE_POLL_MODAL:
            return {
                ...state,
                showCreatePollModal: !state.showCreatePollModal
            };
        // case constants.DELETE_REQUEST:
        //     // add 'deleting:true' property to user being deleted
        //     return {
        //         ...state,
        //         items: state.items.map((user) =>
        //             user.id === action.id ? { ...user, deleting: true } : user
        //         )
        //     };
        // case constants.DELETE_SUCCESS:
        //     // remove deleted user from state
        //     return {
        //         items: state.items.filter((user) => user.id !== action.id)
        //     };
        // case constants.DELETE_FAILURE:
        //     // remove 'deleting:true' property and add 'deleteError:[error]' property to user
        //     return {
        //         ...state,
        //         items: state.items.map((user) => {
        //             if (user.id === action.id) {
        //                 // make copy of user without 'deleting:true' property
        //                 const { deleting, ...userCopy } = user;
        //                 // return copy of user with 'deleteError:[error]' property
        //                 return { ...userCopy, deleteError: action.error };
        //             }

        //             return user;
        //         })
        //     };
        default:
            return state;
    }
}
