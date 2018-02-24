/**
 * Created by Administrator on 2017/8/21 0021.
 */
const initState = {
    task: {}
};

const reducer = (state = initState, action = {}) => {
    switch (action.type) {
        case 'SANE_TASK_LIST':
            return {...state, task: action.task};
        default:
            return state;
    }
};

export default {initState, reducer};