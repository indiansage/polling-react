export default (state = {}, action) => {
    switch (action.type) {
        case 'ACTION':
            return {
                result: action.payload
            };
        default:
            return state;
    }
};
