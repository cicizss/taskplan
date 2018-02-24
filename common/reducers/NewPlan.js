/**
 * Created by Administrator on 2017/8/21 0021.
 */
const initState = {
    plan: {}
};

const reducer = (state = initState, action = {}) => {
    switch (action.type) {
        case 'SAVE_NEW_PLAN':
            return {...state, plan: action.plan};
        default:
            return state;
    }
};

export default {initState, reducer};