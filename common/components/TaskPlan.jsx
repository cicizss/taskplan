import {Tabs, Radio} from 'antd';
const TabPane = Tabs.TabPane;
import React from 'react';
import {Select} from 'antd';
const Option = Select.Option;
import PropTypes from 'prop-types';
import {TaskPlan_controller} from '../controllers/TaskPeoplePlanList';
import {imageUrl}from '../../server/config.js';


import img1 from '../images/move.png';
import img2 from '../images/close.png';
import img3 from '../images/reply.png';
import moment from 'moment'

class TaskPlan extends React.Component {
    static propTypes = {};

    static contextTypes = {
        router: PropTypes.object
    };

    state = {

        data: {
                content:'',
                name:'',
                portrait:'',
                planList:[{

                }]
        }

    };

    componentDidMount() {
        this.showBasicInfo();
    }

    showBasicInfo = () => {

        let taskId = this.props.location.query.taskId;
        let userId = this.props.location.query.userId;
        // console.log('query接收', taskId, userId)
        const {handleData} = this.props;
        TaskPlan_controller({taskId, userId}, (err, values) => {

            if (err) {
                var c = handleData(values);

                this.setState({
                    data: handleData(values)['more']
                })
                // console.log(this.state.data)
            }
        });
    };

    handleChange = (value) => {
        console.log(`selected ${value}`);

    };

    handleBlur = () => {
        console.log('blur');
    };

    handleFocus = () => {
        console.log('focus');
    };

    handleWear=()=>{
        return this.context.router.push('/TaskDetails');
    };
    render() {
      console.log(this.state.data);
      const  {content,name,portrait}=this.state.data;
        /*
       let arr=this.state.data.content

        const itemA = (content, startTime, endTime) => {  //每行的纯组件
            return (
                <div>
                    <div className="createconten">{content}</div>
                    <div className="createtime">{startTime}</div>
                    <div className="createend">{endTime}</div>
                </div>
            );
        }

        let list = [];
        */
        let list = [];
        if (this.state.data && this.state.data.planList && this.state.data.planList.length) {
            list = this.state.data.planList.map((item, index) => {
              //  return itemA(item.content, item.startTime, item.endTime);
                       console.log(item+'woshishui');
                            return (

                                <div className="user-list" style={{display:'flex',marginTop:10}}>

                                    <div style={{flex:1 ,marginTop:26,fontSize:16,}}>

                                        <div style={{fontSize:15,marginBottom:21}}>{item.content}
                                        </div>
                                        <div>
                                            <span style={{fontSize:14}}>开始时间：</span><span style={{marginRight:5,paddingRight:14,fontSize:14}} >{moment(item.startTime).format('YYYY年MM月DD hh:mm')}</span>
                                            <span style={{marginRight:5,fontSize:14}}>截止时间 ：</span><span style={{marginRight:5,fontSize:14}}>{moment(item.endTime).format('YYYY年MM月DD hh:mm')}</span>
                                            <span><img src={img3}/>{item.planComments && item.planComments.length}条回复</span>
                                        </div>
                                    </div>
                                    <div>
                                        <div style={{
                                            display:'inline-block',
                                            padding:'4px 15px',
                                            color:'red',
                                            'text-align':'center',
                                            marginTop:26,
                                            marginLeft:9
                                        }}>
                                            {item.status == false ? '未完成':'已完成'}
                                        </div>
                                        <div style={{marginTop:23,marginRight:11}}>
                                            {moment(item.createdAt).format('YYYY年MM月DD hh:mm')}
                                        </div>
                                    </div>
                                </div>

                            )
            });
        }

       //list.push(itemA('sssss','1927年','1938年')); //测试用的组件
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
                    <div className="endButton" onClick={this.handleWear}> >返回</div>
                    <div className="main-content">

                        <div className="united">
                             <div className="united-left">
                            <img className="united-image" src={imageUrl+portrait}/>
                             </div>
                            <div className="united-right">
                            <div className="united-name">{name}</div>
                            <div className="united-use"><span className="united-say">来自任务</span> {content}</div>
                            </div>
                        <div className="clear">
                        </div>
                            <div className="united-create">
                                {list}
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        )
    }
}

export default TaskPlan;