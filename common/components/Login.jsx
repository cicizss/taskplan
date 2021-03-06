/**
 * Created by chenlizan on 2017/6/18.
 */

import PropTypes from 'prop-types';
import React from 'react';
import {Form, Icon, Input, Button, Checkbox} from 'antd';
import {serverAddress} from '../utils/httpRequest';

const FormItem = Form.Item;

class LoginForm extends React.Component {
    static propTypes = {
        loading: PropTypes.bool.isRequired,
        error: PropTypes.bool.isRequired
    };

    static contextTypes = {
        router: PropTypes.object
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.handleSaveLoginInfo(values);
                console.log('Received values of form: ', values);
                const userInfo = {
                    user: values.userName,
                    password: values.password
                };
                serverAddress('/restful/oauth/login', {}, 'POST', userInfo, (error, data) => {
                    if (data.result && data.result.token) {
                        console.log(data.result.token);
                        (typeof localStorage === 'object') ? localStorage.setItem('token', data.result.token) : ''
                    }
                });
            }
        });
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <FormItem>
                    {getFieldDecorator('userName', {
                        rules: [{required: true, message: 'Please input your username!'}],
                    })(
                        <Input prefix={<Icon type="user" style={{fontSize: 13}}/>} placeholder="Username"/>
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('password', {
                        rules: [{required: true, message: 'Please input your Password!'}],
                    })(
                        <Input prefix={<Icon type="lock" style={{fontSize: 13}}/>} type="password"
                               placeholder="Password"/>
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: true,
                    })(
                        <Checkbox>Remember me</Checkbox>
                    )}
                    <a className="login-form-forgot" href="">Forgot password</a>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Log in
                    </Button>
                    Or <a href="">register now!</a>
                </FormItem>
            </Form>
        );
    }
}

const WrappedLoginForm = Form.create()(LoginForm);

export default WrappedLoginForm;
