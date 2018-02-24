import React from 'react';
import PropTypes from 'prop-types';
import img1 from '../images/close.png';
import img2 from '../images/move.png';
import img3 from '../images/plan.png';
import img4 from '../images/taskadd.png';
import CommentApp from '../containers/CommentApp';
import {plan_controller} from '../controllers/PlanDetails';
import {BuildComments_controller} from '../controllers/BuildComment';
import {CheckPlan_controller}from '../controllers/CheckPlan';
import {imageUrl}from '../../server/config.js';
import {Comment_Input} from '../action';
import { Button } from 'antd';

class PlanDetails extends React.Component {

    static contextTypes = {
        router: PropTypes.object,
        store: PropTypes.object
    };

    state = {
        data: [
            // {
            //     taskContent: '',
            //     creator: {name: '', icon: ''},
            //     content: '',
            //     startTime: '',
            //     endTime: '',
            //     state: '',
            //     comment: [{name: '', icon: '', content: ''}]
            // }
        ]

    };

    componentWillMount() {
        this.showBasicInfo();
        //this.showCheck();
    }

    componentWillReceiveProps(nextProps) {
        const {comment} = nextProps;
        if (comment !== '') {
            this.CommentSave(comment);
        }
        else {
            this.context.store.dispatch(Comment_Input(''));
        }
    }
/*
    showCheck = () => {
        const id = this.props.location.query.id;
        console.log(id)
        CheckPlan_controller(id, (err, values) => {

            if (err) {
                this.setState({
                    data: values,
                })
                console.log(values)
            }
        });
    }
    */
    showBasicInfo = () => {
        const id = this.props.location.query.id;
        plan_controller(id, (err, values) => {
            if (err) {
                this.setState({
                    data: values,
                })
                console.log(values)
            }
        });
    }
    handle = (e) => {
        const _id = e.target.dataset.id.split('&&'),
          TaskId = _id[0],
          UserId = _id[1];
        return this.context.router.push('/AttachmentList?taskId=' + TaskId + '&userId=' + UserId);

    }
    CommentSave = (comment) => {
        const {id} = this.state.data; //taskId
        BuildComments_controller({planId: id, content: comment}, (err, values) => {
            this.showBasicInfo();
        });
    }

    handleTip = () => {
        this.context.router.push('/PlanList');
    }
    hanldeEditor=(e)=>{
        const _id = e.currentTarget.dataset.id;
        console.log(_id);
        return this.context.router.push('/NewPlan?id='+_id);
    }
    render() {

        const {data} = this.state;

        return (
            <div>
                <div className="details-main">

                    <div className="header-content">
                        <div className="header-left">计划详情</div>
                        <div className="header-right">
                            <img src={img1}/>
                            <img src={img2}/>
                        </div>
                    </div>
                    <div className="content">
                        <div className="DetailsReturn" onClick={this.handleTip}> >返回</div>
                        <div className="content-main">

                            <div className="plan_one">
                                <img src={img3}/>计划
                            </div>
                            <div className="content-title">
                                今天完成财务报表分析

                            </div>
                            <div className="content-middle">
                                {data.name}
                            </div>
                            <div className="attachment" data-id={data.taskId + "&&" + data.userId}
                                 onClick={this.handle}><img src={img4}/>查看附件
                            </div>
                        </div>
                    </div>
                    <div className="content-tip">
                        <img className="header-img" src={imageUrl+data.portrait}/>
                        <div className="createperson">
                            <span>创建者</span>
                            <span>{data.realName}</span>
                            <Button  type="primary" data-id={data.id} style={{marginLeft:500,marginTop:-42,display:((data.loginUserId==data.userId) || data.loginUserRole==1)?'block':'none'}} onClick={this.hanldeEditor}>编辑</Button>
                            <div className="createState" data-id={data.id}
                                 style={{display: data.loginUserRole == 1 ? 'block' : 'none'}}>{data.status == false ? '审核通过' : ''}</div>
                        </div>
                        <div className="tasklist">
                            <div className="formTask">来自任务</div>
                            <span>{data.content}</span>
                        </div>
                    </div>
                    <div className="PlanComment">
                        {<CommentApp commentDate={data}/>}
                    </div>
                </div>
            </div>
        );
    }
}

export default PlanDetails;