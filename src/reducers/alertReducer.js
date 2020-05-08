import { constants } from '../constants';

export function alert(state = {}, action) {
    switch (action.type) {
        case constants.SUCCESS:
            return {
                type: 'is-success',
                message: action.message
            };
        case constants.ERROR:
            return {
                type: 'is-danger',
                message: action.message
            };
        case constants.CLEAR:
            return {};
        default:
            return state;
    }
}
