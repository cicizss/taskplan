/**
 * Created by Administrator on 2017/8/23 0023.
 */
const initState = {
    build: '',
    common: null,
    currentInput: 0,
    responsible: [],
    executor: [],
    participant: [],
    principal: []
};

const reducer = (state = initState, action = {}) => {
    switch (action.type) {
        case 'BUILD_TASK':
            return {...state, build: action.build};
        case  'CURRENT_INPUT':
            return {...state, currentInput: action.currentInput};
        case 'USE_COMMON':
            return {...state, common: action.common};
        default:
            return state;
    }
};

export default {initState, reducer};