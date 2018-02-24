

import PropTypes from 'prop-types';
import React, {Component} from 'react'
import Comment from './Comment'
import { Tabs } from 'antd';
const TabPane = Tabs.TabPane;


export default class CommentList extends Component {

    static propTypes = {}

    static defaultProps = {}

    render() {
        const {commentDate} = this.props;
        const {comments} = commentDate;
        const list = (comments) ? comments.map((comment, i) => {
            return (
                <Comment comment={comment} key={i} index={i}/>
            );
        }) : '';

        return (
            <div>
                <div className="wrap-comment">
                    <div className='comment-field'>
                        <Tabs defaultActiveKey="1">
                            <TabPane tab="回复" key="1"></TabPane>
                        </Tabs>
                    </div>
                    {list}
                </div>
            </div>
        )
    }
}
