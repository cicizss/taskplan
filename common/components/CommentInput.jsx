import PropTypes from 'prop-types';
import React, {Component} from 'react'
import {Comment_Input} from '../action';

export default class CommentInput extends Component {

    static contextTypes = {
        store: PropTypes.object//子组件声明了contextTypes后可以通过this.context.store访问store
    };

    state = {
        content: ''
    };

    handleContentChange = (event) => {
        this.setState({
            content: event.target.value
        });
    };

    handleSubmit = () => {
        const {content} = this.state;
        this.context.store.dispatch(Comment_Input(content));
        this.setState({content: ''});
    };

    render() {
        return (
            <div className='comment-input'>
                <div className='comment-field'>
                    <input
                        value={this.state.content}
                        onChange={this.handleContentChange}
                    />
                    <div className='comment-field-button'>
                        <button
                            onClick={this.handleSubmit}>
                            发布
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}
