/**
 * Created by Administrator on 2017/8/22 0022.
 */

import PropTypes from 'prop-types';
import React from 'react';
import CommentInput  from '../containers/CommentInput';
import CommentList  from '../containers/CommentList';

class CommentApp extends React.Component {

    render() {
        const {commentDate} = this.props;

        const input = (commentDate.loginUserRole != 4) ? <CommentInput /> : '';  //判断角色是否有回复框，参与者为4不能回复

        return (
            <div>
                <CommentList commentDate={commentDate} />
                {input}
            </div>
        )
    }
}

export default CommentApp;