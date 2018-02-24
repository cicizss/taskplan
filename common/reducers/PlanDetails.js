/**
 * Created by Administrator on 2017/8/22 0022.
 */
const initState = {
    details: {},
    comment: ''
};

const reducer = (state = initState, action = {}) => {
    switch (action.type) {
        case 'PLAN_DETAILS':
            return {...state, details: action.details};
        case 'COMMENT_INPUT':
            return {...state, comment: action.comment};
        default:
            return state;
    }
};

export default {initState, reducer};