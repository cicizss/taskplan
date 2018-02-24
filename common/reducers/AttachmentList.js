/**
 * Created by Administrator on 2017/8/23 0023.
 */
const initState = {
    list: {}
};

const reducer = (state = initState, action = {}) => {
    switch (action.type) {
        case 'ATTACHMENT_LIST':
            return {...state, list: action.list};
        default:
            return state;
    }
};

export default {initState, reducer};