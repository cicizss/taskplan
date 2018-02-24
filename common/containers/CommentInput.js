/**
 * Created by Administrator on 2017/8/22 0022.
 */

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import CommentInput from '../components/CommentInput';
import {addComment} from '../action/index';

function mapStateToProps(state) {
    return {
        // account: state.Login.account
        comments: state.Comment.comments
    };
}

function mapDispatchToProps(dispatch) {
    return {
        onSubmit: bindActionCreators(addComment, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentInput);