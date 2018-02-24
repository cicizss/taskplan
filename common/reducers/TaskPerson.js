/**
 * Created by Administrator on 2017/9/14 0014.
 */
const initState = {
    person: {}
};

const reducer = (state = initState, action = {}) => {
    switch (action.type) {
        case 'TASK_PERSON':
            return {...state, person: action.person};
        default:
            return state;
    }
};

export default {initState, reducer};