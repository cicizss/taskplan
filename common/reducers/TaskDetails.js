const initState = {
    use: undefined,
    comment: ''
};

const reducer = (state = initState, action = {}) => {
    switch (action.type) {
        case 'TASK_DETAILS':
            return {...state, use: action.use};
        case 'COMMENT_INPUT':
            return {...state, comment: action.comment};
        case 'USE_COMMON':
            return {...state, common: action.common};
        default:
            return state;
    }
};

export default {initState, reducer};