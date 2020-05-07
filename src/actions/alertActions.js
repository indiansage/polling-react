import { constants } from '../constants';

export const alertActions = {
    success,
    error,
    clear
};

function success(message) {
    return { type: constants.SUCCESS, message };
}

function error(message) {
    return { type: constants.ERROR, message };
}

function clear() {
    return { type: constants.CLEAR };
}
