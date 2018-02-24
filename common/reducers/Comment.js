/**
 * Created by Administrator on 2017/8/22 0022.
 */

const initState = {
    comments: []
};

const reducer = (state = initState, action = {}) => {
    switch (action.type) {
        case ' INIT_COMMENTS':
            // 初始化评论
            return {comments: action.comments}
        case 'ADD_COMMENT':
            // 新增评论
            return {
                comments: [...state.comments, action.comment]
            }

        default:
            return state
    }
};

export default {initState, reducer};