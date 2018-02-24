/**
 * Created by Administrator on 2017/8/21 0021.
 */
const initState = {
    receive: {}
};

const reducer = (state = initState, action = {}) => {
    switch (action.type) {
        case 'MY_RECEIVE':
            return {...state, receive: action.receive};
        default:
            return state;
    }
};

export default {initState, reducer};