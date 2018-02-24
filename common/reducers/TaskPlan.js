/**
 * Created by lenovo on 2017/9/10.
 */
const initState = {
    more: {}
};

const reducer = (state = initState, action = {}) => {
    switch (action.type) {
        case 'TASK_PLAN':
            return {...state, more: action.more};
        default:
            return state;
    }
};

export default {initState, reducer};