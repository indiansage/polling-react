import { constants } from '../constants';

export function users(state = {}, action) {
    switch (action.type) {
        case constants.GET_ALL_USERS_REQUEST:
            return {
                loading: true
            };
        case constants.GET_ALL_USERS_SUCCESS:
            return {
                items: action.users
            };
        case constants.GET_ALL_USERS_FAILURE:
            return {
                error: action.error
            };
        case constants.REMOVE_USER_REQUEST:
            // add 'deleting:true' property to user being deleted
            return {
                ...state,
                items: state.items.map((user) =>
                    user.id === action.id ? { ...user, deleting: true } : user
                )
            };
        case constants.REMOVE_USER_SUCCESS:
            // remove deleted user from state
            return {
                items: state.items.filter((user) => user.id !== action.id)
            };
        case constants.REMOVE_USER_FAILURE:
            // remove 'deleting:true' property and add 'deleteError:[error]' property to user
            return {
                ...state,
                items: state.items.map((user) => {
                    if (user.id === action.id) {
                        // make copy of user without 'deleting:true' property
                        const { deleting, ...userCopy } = user;
                        // return copy of user with 'deleteError:[error]' property
                        return { ...userCopy, deleteError: action.error };
                    }

                    return user;
                })
            };
        case constants.TOGGLE_ADMIN_USER_REQUEST:
            // add 'togglingAdmin:true' property to user
            return {
                ...state,
                items: state.items.map((user) =>
                    user.id === action.id
                        ? { ...user, togglingAdmin: true }
                        : user
                )
            };
        case constants.TOGGLE_ADMIN_USER_SUCCESS:
            return {
                ...state,
                items: state.items.map((user) => {
                    if (user.id === action.id) {
                        const { togglingAdmin, ...userCopy } = user;
                        return { ...userCopy, isAdmin: !user.isAdmin };
                    } else {
                        return user;
                    }
                })
            };
        case constants.TOGGLE_ADMIN_USER_FAILURE:
            // remove 'deleting:true' property and add 'deleteError:[error]' property to user
            return {
                ...state,
                items: state.items.map((user) => {
                    if (user.id === action.id) {
                        // make copy of user without 'togglingAdmin:true' property
                        const { togglingAdmin, ...userCopy } = user;
                        // return copy of user with 'toggleAdminError:[error]' property
                        return { ...userCopy, toggleAdminError: action.error };
                    }
                    return user;
                })
            };
        default:
            return state;
    }
}
