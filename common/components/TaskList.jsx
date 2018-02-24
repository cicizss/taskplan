import {Tabs, Radio} from 'antd';
const TabPane = Tabs.TabPane;
import React from 'react';
import {Select} from 'antd';
import {Link} from 'react-router';
const Option = Select.Option;
import PropTypes from 'prop-types';
import MyCreate  from '../containers/MyCreate';
import MyReceive from '../containers/MyReceive';
import {test_controller} from '../controllers/TaskList';

import img1 from '../images/move.png';
import img2 from '../images/close.png';

class TaskList extends React.Component {
    static propTypes = {};

    static contextTypes = {
        router: PropTypes.object
    };

    state = {
        status: ''
    };

    //从URL获取TOKEN保存到localStorage,为了HTTP请求携带的TOKEN
    componentWillMount() {
        const token = this.props.location.query.token;
        if (token === undefined) return;
        if (typeof localStorage === 'object')
            localStorage.setItem('token', token);
    }

    handleChange = (value) => {
        const {handleCreate} = this.props;
        handleCreate(value);
    }

    handleAdd = () => {
        this.context.router.push('/BuildTask');
    }

    render() {
        return (
            <div>
                <div className="list-top">
                    <div className="list-left">任务列表</div>
                    <div className="list-right">
                        <img src={img1}/>
                        <img src={img2}/>
                    </div>
                </div>
                <div className="main">
                    <div className="main-content">
                        <Tabs
                            defaultActiveKey="1"

                            style={{height: 577, width: 840,}}
                        >
                            <TabPane tab="我创建的" key="1">
                                <MyCreate/>
                            </TabPane>
                            <TabPane tab="我收到的" key="2">
                                <MyReceive/>
                            </TabPane>


                        </Tabs>
                        <div className="listtask">
                            <div className="listtask-status">任务状态</div>
                            <Select
                                showSearch
                                style={{width: 200}}
                                placeholder="不限"
                                optionFilterProp="children"
                                onChange={this.handleChange.bind(this)}
                                onFocus={this.handleFocus}
                                onBlur={this.handleBlur}
                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            >

                                <Option value="0">正在进行</Option>
                                <Option value="1">已结束</Option>
                            </Select>
                        </div>
                        <div className="addtips" onClick={this.handleAdd}>
                            +新建任务
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default TaskList;