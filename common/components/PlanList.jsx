import {Tabs, Radio} from 'antd';
import React from 'react';
import {Select} from 'antd';
import PropTypes from 'prop-types';
import moment from 'moment';
import {test_controller} from '../controllers/PLanList';
import img1 from '../images/move.png';
import img2 from '../images/close.png';
const TabPane = Tabs.TabPane;
const Option = Select.Option;

class PlanList extends React.Component {
    static propTypes = {};

    static contextTypes = {
        router: PropTypes.object
    };

    state = {

        data: [{
            id: '',
            startTime: '',
            endTime: '',
            content: '',
            status: '',

            realName: '',
            task: [{
                content: '',
                endTime: '',
                startTime: '',
                endTime: '',
                status: '',

            }],
            planComments: []
        }],
        curShow: []

    };

    componentWillMount() {
        this.showBasicInfo();
        const token = this.props.location.query.token;
        if (token === undefined) return;
        if (typeof localStorage === 'object')
            localStorage.setItem('token', token);
    }

    showBasicInfo = () => {
        test_controller((err, values) => {
            if (err) {
                console.log(values)
                this.setState({
                    data: values
                });

            }
        });
    }

    handleChange = (value) => {
        let temp = [];
        value = value == '已完成' ? true : value == '未完成' ? false : '全选';
        this.state.data.forEach(item => {

            if (item.status == value) {
                temp.push(item)
            }
        })
        this.setState({
            curShow: temp,
        })

    }

    handleBlur = () => {
        console.log('blur');
    }

    handleFocus = () => {
        console.log('focus');
    }
    handleSubmit = (e) => {
        const _id = e.currentTarget.dataset.id;
        console.log(_id)
        return this.context.router.push('/PlanDetails?id=' + _id);
    }

    render() {

        const status = this.state.data.map(
            item => item.status
        );
        let stat = Array.from(new Set(status));

        let data = this.state.curShow.length == 0 ? this.state.data : this.state.curShow;

        let list = data.map((item, index) => {


            return (
                <div className="want-room"
                     key={index} data-id={item.id}
                     style={{display:'flex'}}
                     onClick={this.handleSubmit}>
                    <div style={{flex:1}}>
                        <h5>{item.content}</h5>
                        <div>
                          <span style={{marginRight:5}}>开始时间：</span>
                            <span style={{marginRight:25}}>
                                { moment(item.startTime).format('YYYY年MM月DD hh:mm')}
                            </span>
                            <span style={{marginRight:5}}>结束时间：</span>
                            <span style={{marginRight:25}}>
                             { moment(item.endTime).format('YYYY年MM月DD hh:mm') }
                            </span>
                            <span style={{marginRight:25}}>
                                {item.planComments.length}条回复
                            </span>
                        </div>
                        <div>
                            <span style={{fontWeight:'bold',marginRight:10}}>来自任务</span>
                            <span>{item.name }</span>
                        </div>
                    </div>

                    <div className="want-reply">
                      <span  style={{color:item.status == true?'#F82B7E':'#A6B8CD'}}>
                         {item.status == false ? '未通过' : '已通过'}
                      </span>
                        <div>下午5：00</div>
                    </div>
                </div>
            )
        });
        return (

            <div>
                <div className="list-top">
                    <div className="list-left">计划列表</div>
                    <div className="list-right">
                        <img src={img1}/>
                        <img src={img2}/>
                    </div>
                </div>
                <div className="main">
                    <div className="main-content">
                        <Tabs
                            defaultActiveKey="1"

                            style={{ width: 840}}
                        >
                            <TabPane tab="我创建的" key="1">

                            </TabPane>


                        </Tabs>
                        <div className="listtask">
                            <div className="listtask-status">计划状态</div>
                            <Select
                                showSearch
                                style={{width: 200}}
                                placeholder="选择"
                                optionFilterProp="children"
                                onChange={this.handleChange}
                                onFocus={this.handleFocus}
                                onBlur={this.handleBlur}
                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            >

                                {
                                    // stat.map(
                                    //     (item,index) => {
                                    //         let temp = item == false ? '未完成':'已完成';
                                    //         return(
                                    //             <Option value={temp} key={index}>
                                    //                 {temp}
                                    //             </Option>
                                    //         )
                                    //     }
                                    // )
                                }
                                <Option value='未完成'>
                                    未完成
                                </Option>
                                <Option value='已完成'>
                                    已完成
                                </Option>
                                <Option value='全部'>
                                   全部
                                </Option>
                            </Select>
                        </div>
                        <div className="createTask">
                            {list}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default PlanList;