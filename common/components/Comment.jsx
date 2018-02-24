import React, {Component} from 'react'
import moment from 'moment';
import {imageUrl}from '../../server/config.js';
export default class Comment extends Component {

    render() {
        const {comment} = this.props;
        return (
            <div className='comment'>
                <div className='comment-user'>
                    <img alt="1" className="comment-img" src={imageUrl+comment.portrait}/>
                </div>
                <span className='comment-username'>
                        <div style={{marginTop:15+'px'}}>{comment.realName}</div>
                        <span className='comment-content'>
                            {comment.content}
                        </span>
                </span>
                <span className='comment-createdtime'>
                    {moment(comment.createdAt).format('YYYY年MM月DD hh:mm')}
                </span>
            </div>
        )
    }
}
