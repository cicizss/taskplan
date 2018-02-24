/**
 * Created by Administrator on 2017/8/25 0025.
 */
const initState = {
    selelct: {}
};

const reducer = (state = initState, action = {}) => {
    switch (action.type) {
        case 'PLAN_LIST':
            return {...state,select: action.select};
        default:
            return state;
    }
};

export default {initState, reducer};