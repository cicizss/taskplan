/**
 * Created by Administrator on 2017/8/21 0021.
 */

const initState = {
    create: 'a'
};

const reducer = (state = initState, action = {}) => {
    switch (action.type) {
        case 'MY_CREATE':
            return {...state, create: action.create};
        default:
            return state;
    }
};

export default {initState, reducer};