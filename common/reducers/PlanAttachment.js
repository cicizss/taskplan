/**
 * Created by zfp on 2017/9/16.
 */
const initState = {
  attachment:{}
};

const reducer = (state = initState, action = {}) => {
    switch (action.type) {
        case 'PLAN_ATTACHMENT':
            return {...state, attachment: action.attachment};
        default:
            return state;
    }
};

export default {initState, reducer};