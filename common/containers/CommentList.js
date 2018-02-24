/**
 * Created by Administrator on 2017/8/22 0022.
 */

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import CommentList from '../components/CommentList';
import {initComments,deleteComment} from '../action/index';
function mapStateToProps(state) {
    return {
        comments: state.Comment.comments
    };
}

function mapDispatchToProps(dispatch) {
    return {
        initComments:  bindActionCreators(initComments, dispatch),

        onDeleteComment:bindActionCreators(deleteComment, dispatch)

    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentList);
