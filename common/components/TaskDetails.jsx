import React from 'react';
import {Card} from 'antd';
import PropTypes from 'prop-types';
import moment from 'moment';
import {Anchor, Button, Icon, Modal} from 'antd';
import img2 from '../images/close.png';
import img3 from '../images/move.png';
import img4 from '../images/upload.png';
import img5 from '../images/task.png';
import img6 from '../images/taskadd.png';
import img7 from '../images/all.png';
import {Tabs} from 'antd';
import CommentApp from '../containers/CommentApp';
import UseCommon from '../containers/UseCommon';
import {details_controller} from '../controllers/TaskDetails';
import {BuildComments_controller} from '../controllers/BuildComment';
import {deleteRole_controller} from '../controllers/DeleteTaskRole';
import {TaskChange_controller} from '../controllers/TaskChange';
import {addTaskRole_controller} from '../controllers/addTaskRole';
import {imageUrl}from '../../server/config.js';
import {Comment_Input} from '../action';
const TabPane = Tabs.TabPane;
const confirm = Modal.confirm;
const {Link} = Anchor;
class TaskDetails extends React.Component {
    static propTypes = {
        /*        loading: PropTypes.bool.isRequired,
         error: PropTypes.bool.isRequired*/
    };

    static contextTypes = {
        router: PropTypes.object,
        store: PropTypes.object
    };

    constructor(props, context) {

        super(props, context);
        this.state = {
            curredtId: '',
            showHide: 'none',
            visible: false,
            show:true,
            data: {

                // id: '',
                // content: '',
                // startTime: '',
                // endTime: '',
                // createdAt: '',
                // creator: '',
                // state: '',
                // portrait: '',
                // realName: '',
                // loginUserRole: '',
                // loginUserId: '',
                // taskRoles: [],
                // taskComments: [{
                //     id: '',
                //     taskId: '',
                //     creator: '',
                //     content: ''
                // }]


            },
            hidden:'none',
            common: '',
            curRole: 0,
        }

    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    };
    handleOk = () => {
        let id = this.state.data.id;
        let  status  =this.state.data.status;
        TaskChange_controller({id,status}, (err, values) => {
            if (err) {
                this.setState({
                    show:false,
                });
                console.log(this.state.data)
            }
        });
        this.setState({
            visible: false,
        });
    };
    handleCancel = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };
    callback = (key) => {
        if(key != 1 ){
            this.setState({
                show:true,
                curRole: key
            })
        }else{
            this.setState({
                show:false,
            })
        }
        console.log(key);
    };
    showNav = () => {
        if (this.state.showHide == 'block') {
            this.setState({showHide: 'none'})
        } else {
            this.setState({
                showHide: 'block'
            })
        }
    };

    PlayWatch = (e) => {

        let {data} = this.state;
        const taskId = data.id;
        const loginUserRole = data.loginUserRole;
        const _id = e.currentTarget.dataset.id;
        const arr = _id.split('&&');
        const itemUserId = arr[0];
        const itemRole = arr[1];
        console.log(taskId, itemUserId, itemRole);
        if (loginUserRole === 1 && itemRole === '1') {
            return this.context.router.push('/TaskPerson?taskId=' + taskId);//当前角色是责任人，查看计划， 是指全局查看所有执行者的计划
        } else {
            return this.context.router.push('/TaskPlan?taskId=' + taskId + '&&userId=' + itemUserId);//所有人点击 执行者模块 查看计划，指查看点击的执行者的计划了列表
        }
    };
    handleAll=(e)=>{
        let {data} = this.state;
        const taskId = data.id;
        return this.context.router.push('/TaskPerson?taskId=' + taskId);
    }
    playAdd = (e) => {
        const _id = e.currentTarget.dataset.id;
        console.log(_id);
        return this.context.router.push('/NewPlan?taskid=' + _id);
    };
    handlePlay = (e) => {
        const _id = e.currentTarget.dataset.id;
        console.log(_id);
        return this.context.router.push('/AttachmentList?taskId=' + _id);
    };
    handleEditor = (e) => {
        // let {content}=this.state.data.content;
        // let {startTime}=this.state.data.startTime;
        // let {endTime}=this.state.data.endTime;
        // console.log({content})
        // UpdateTask_controller({content, startTime, endTime}, (err, values) => {
        //     if (err) {
        //         this.setState({
        //             data: values,
        //         })
        //         console.log(values)
        //     }
        // });
       //  const { handleDetails}=this.props;
       //  handleDetails(this.state.data);
       // console.log( handleDetails+'nishishuwduf')
        const _id = e.currentTarget.dataset.id;
        console.log(_id);
        return this.context.router.push('/BuildTask?id='+_id);
    };
    //handle=()=>{
    // return this.context.router.push('/TaskPlan')
    //  }
    // handlePlan=()=>{
    // return this.context.router.push('/NewPlan')
    // }
    showConfirm = () => {
        confirm({
            title: '你确定要将李明友移除任务?',

            onOk() {
                console.log('确定');
            },
            onCancel() {
                console.log('取消');
            },
        });
    };

    componentWillMount() {
        this.showBasicInfo();

    }
    // addTaskRole=()=>{
    //   console.log(this.state.data+'woshishui');
    //     const taskId =this.state.data.taskId;
    //     const userId=this.state.data.userId;
    //     const taskRoles=this.state.data.taskRoles;
    //         for(let i=0;i<taskRoles.length;i++){
    //             let role =taskRoles[i].role;
    //           Roles.push(role)
    //         }
    //     addTaskRole_controller({} ,(err, values) => {
    //         if (err) {
    //             this.setState({
    //                 data: values,
    //             })
    //             console.log(this.state.data)
    //         }
    //     });
    // }

    componentWillReceiveProps(nextProps) {
        const {comment} = nextProps;
        const {common} = nextProps;
        let arr=this.state.data.id;
        let tip = this.state.data,temp = common;

        this.setState({
            common:common
        },()=>{
            if (this.state.curRole != 0 && this.state.common) {

                switch (this.state.curRole) {
                    case '2':
                        temp.role = 2;
                        tip.taskRoles.push(temp);
                        this.setState({
                            data:tip,
                            common:null
                        });
                        break;
                    case '3':
                        temp.role = 3;
                        tip.taskRoles.push(temp);
                        this.setState({
                            data:tip,
                            common:null
                        });
                        break;
                    case '4':
                        temp.role = 4;
                        tip.taskRoles.push(temp);
                        this.setState({
                            data:tip,
                            common:null
                        });
                        break;
                }
            }
        });

        addTaskRole_controller({taskId:arr,userId:(common && common.userId) || [],role:this.state.curRole}, (err, values) => {
            if (err) {
                this.setState({
                     values,
                });
            }
        });
        if (comment !== '') {
            this.CommentSave(comment);
        }
        else {
            this.context.store.dispatch(Comment_Input(''));
        }
    }

    showBasicInfo = () => {
        const id = this.props.location.query.id;
        details_controller(id, (err, values) => {
            if (err) {
                this.setState({
                    data: values,
                });
                console.log(this.state.data)
            }
        });
    };


    CommentSave = (comment) => {
        const {id} = this.state.data; //taskId
        BuildComments_controller({taskId: id, content: comment}, (err, values) => {
            this.showBasicInfo();
        });
    };
    showDeleteConfirm = (e) => {
        let id = e.currentTarget.dataset.id.split("&&");

        let self = this;
        confirm({
            title: '你确定要删除吗?',
            okText: '确定',
            cancelText: '取消',
            onOk() {

                deleteRole_controller({
                    taskId: id[0],
                    userId: id[1]
                }, (err, values) => {
                    if (err) {
                        self.showBasicInfo()

                    }
                });
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };

    render() {

        let navState = this.state.showHide;
        let hiddenState=this.state.hidden;
        let {data} = this.state;
        let tip = data.taskRoles; //任务计划中全部的人
        //  let commentapp = data.taskComments
        let tempRole;
        let temp = ['责任人', '执行者', '审核者', '参与者'];
        let cc = this.state.common;
        // tip.map( function(item,index){
        //     // console.log(index+"%c","color:red")
        //     item['role'] = temp[index];
        // })

        let CardAdd = (item, length) => {
            //item, data.taskRoles数组里面的每一个元素  //
            //data 全局数据
            //data.loginUserRole//登录人的角色
            //data.loginUserId//登录人
            //移交任务： transferTask
            //查看计划： viewPlan
            //删除： deleted
            //做计划： doPlan

            //const people = _.find(data.taskRoles, {userId: data.loginUserId});//这个确认当前登录用户是否是taskRoles里面的人，没有必要，只有任务相关人才能看得见任务，就是说当前用户一定在这个数组中，这个值一定是真；

            const people = (item.userId === data.loginUserId) ? true : false;//在任务中找登录用户与当前item 的userId匹配上
            const itemRole = item.role;//这个是当前显示（责任人模块 角色为1 等等）的角色
            console.log('people', people, 'itemRole', itemRole);
            console.log('role', data.loginUserRole, 'userId', data.loginUserId);

            //当前角色为责任人（role=1）
            //const transferTask = (data.loginUserRole === 1) && people;
            //const viewPlan = transferTask;
            //const deleted = (data.loginUserRole === 1) && (itemRole !== 1);
            //const doPlan = 做计划是执行者独有，只有当登录角色是执行者时，才有做计划

            //当前角色为执行者（role= 2)
            //const transferTask = 移交任务是责任人独有，只有当登录角色是责任人时，才有移交任务
            //const viewPlan = (data.loginUserRole === 2 ) && (itemRole === 2);
            //const deleted = 没有删除操作,删除是角色为责任人时独有
            //const doPlan = (data.loginUserRole === 2) && people;

            //当前角色为审核者（role= 3)
            //const transferTask = 移交任务是责任人独有，只有当登录角色是责任人时，才有移交任务
            // const viewPlan = (data.loginUserRole === 3 ) && (itemRole === 2) 查看计划只有执行者有这个按钮，只有在执行者哪里才看的见，就是说审核者可以查看计划，但是在执行者界面看到
            //const deleted = 没有删除操作
            //const doPlan = 做计划是执行者独有，只有当登录角色是执行者时，才有做计划

            //当前角色为参与者 （role= 4)
            //const transferTask = 移交任务是责任人独有，只有当登录角色是责任人时，才有移交任务
            // const viewPlan = (data.loginUserRole === 4 ) && (itemRole === 2)  查看计划只有执行者有这个按钮，只有在执行者哪里才看的见，就是说审核者可以查看计划，但是在执行者界面看到
            //const deleted = 没有删除操作
            //const doPlan = 做计划是执行者独有，只有当登录角色是执行者时，才有做计划

            return (
                <Card style={{width: 300}}>
                    <div className="editor">
                        <div className="editor-left">
                            <img className="editor-head" src={imageUrl+item.portrait}/>
                            <div className="editor-name">{item.realName}</div>
                            <div className="editor-plan" data-id={item.userId + "&&" + item.role}
                                 style={{display: (((data.loginUserRole === 1) && people) || (((data.loginUserRole === 1) && (itemRole === 2))) || ((data.loginUserRole === 2 ) && (itemRole === 2)) || ((data.loginUserRole === 3 ) && (itemRole === 2)) || ((data.loginUserRole === 4 ) && (itemRole === 2)) || ((data.loginUserRole === 5) && (itemRole === 2)) || ((data.loginUserRole ===5) && people)) ? 'block' : 'none'}}
                                 onClick={this.PlayWatch}>查看计划
                            </div>
                        </div>

                        <div className="editor-right">
                            <div className="editor-delete"
                                 style={{display: ((this.state.show)&&(data.loginUserRole === 1) && (itemRole !== 1)) ? 'block' : 'none'}}
                                 onClick={this.showDeleteConfirm} data-id={data.id + '&&' + item.userId}
                            >
                                删除
                            </div>
                            <div className="editor-button">
                                <Button type="primary"
                                        style={{display: ((this.state.show)&&(data.loginUserRole === 2) && people) ? 'block' : 'none'}}
                                        data-id={data.id} onClick={this.playAdd}>做计划</Button>
                                <div className="editor-task"
                                     style={{display: ((data.loginUserRole === 1) && people) ? 'block' : 'none'}}>移交任务
                                </div>
                            </div>
                        </div>
                        <div className="clear"></div>
                    </div>
                </Card>
            )
        }


        const Arr1 = [];
        const Arr2 = [];
        const Arr3 = [];
        const Arr4 = [];

        if (tip !== undefined && tip.length > 0) {
            tip.map(function (item) {
                switch (item.role) {
                    case 1:
                        Arr1.push(CardAdd(item, Arr1.length));
                        break;
                    case 2:
                        Arr2.push(CardAdd(item, Arr1.length));
                        break;
                    case 3:
                        Arr3.push(CardAdd(item, Arr1.length));
                        break;
                    case 4:
                        Arr4.push(CardAdd(item, Arr1.length));
                        break;
                    default:
                        break;
                }
            });
        }


        return (
            <div className="text-content">
                <div className="test-header">
                    <div className="test-left">
                        <div className="test-arrow">
                            <Icon type="left"/>
                        </div>
                        <div className="test-arrive">
                            <Icon type="right"/>
                        </div>
                        <div className="test-upload">
                            <img src={img4}/>
                        </div>
                        <div className="test-task">任务详情</div>
                    </div>
                    <div className="test-right">
                        <img src={img2}/>
                        <img src={img3}/>
                    </div>


                </div>
                <div className="test-container">
                    <div className="test-main">
                        <div className="test-anchor">
                            <Anchor >
                                <Link href="#first-task" title='任务' className="AnchorTask"></Link>
                                <Link href="#second-person" title='人员'  className="AnchorPerson"></Link>
                                <Link href="#CommentApp" title='回复'   className="AnchorReply"></Link>
                            </Anchor>
                        </div>
                        <div className="first-task" id="first-task">
                            <div className="task-map">任务</div>
                            <img src={img5} className="ImgTask"/>
                            <div style={{
                                color: data.status == 0 ? '#F82B7E' : '#A6B8CD', width: 68,
                                height: 23,
                                backgroundColor: data.status == 0 ? '#FBD4DC' : '#99A0AE',  marginLeft: 726,textAlign:'center',fontSize:14
                            }}>
                                {data.status == 0 ? '正在进行' : data.status == 1 ? '已结束' : ''}
                            </div>

                            <div className="title">
                            </div>
                            <div className="select-content">{data.content}</div>
                            <div className="first-time">
                                <div className="starttime">
                                    开始时间:{moment(data.startTime).format('YYYY年MM月DD hh:mm')}</div>
                                <div className="endtime">结束时间:{moment(data.endTime).format('YYYY年MM月DD hh:mm')}</div>
                            </div>
                            <div className="fist-head">
                                <img className="my-head" src={imageUrl+data.portrait}></img>
                                <div className="my-name">{data.realName}</div>
                                <div className="my-time">{moment(data.createdAt).format('YYYY年MM月DD hh:mm')}</div>
                            </div>
                            <div className="killname">
                                <Button type="primary"
                                        style={{display: data.loginUserRole == 1 ? 'block' : 'none'}}
                                        data-id={data.id}
                                        onClick={this.handleEditor}>编辑</Button>
                            </div>
                            <div className="killeditor">
                                <Button type="primary" onClick={this.showModal}
                                        style={{display: data.loginUserRole == 1 ? 'block' : 'none'}}>归档</Button>
                                <Modal
                                    title="归档提示"
                                    visible={this.state.visible}
                                    onOk={this.handleOk}
                                    onCancel={this.handleCancel}
                                >
                                    <p>归档后不可对任务再次编辑你确定要将任务归档吗?</p>

                                </Modal>
                            </div>

                        </div>
                        <div className="select-person" id="second-person">
                            <div className="addperson" onClick={this.showNav}>
                                <Tabs defaultActiveKey="1" style={{display:(hiddenState) && (this.state.show?'block':'none') }}>
                                    <TabPane tab="添加成员" key="1" ></TabPane>
                                </Tabs>
                            </div>
                            <div style={{'z-index':1,position:'relative'}}>
                            <div style={{display: navState,position:'relative','z-index':1000}}>
                                <UseCommon/>
                            </div>
                            </div>
                            <div className="temp-list">
                            <Tabs defaultActiveKey="1" onChange={this.callback}>


                                <TabPane tab="责任人" key="1" style={{display: 'flex'}}>{Arr1}</TabPane>
                                <TabPane tab="执行者" key="2" style={{display: 'flex'}}
                                         onClick={this.handleRole}>{Arr2}</TabPane>
                                <TabPane tab="审核者" key="3" style={{display: 'flex'}}
                                         onClick={this.handleRole}>{Arr3}</TabPane>
                                <TabPane tab="参与者" key="4" style={{display: 'flex'}}
                                         onClick={this.handleRole}>{Arr4}</TabPane>


                            </Tabs>
                            </div>
                            <div className="watchlist" data-id={data.id} onClick={this.handlePlay}>查看所有附件</div>
                            <img src={img6} className="ImgList"/>
                            <div className="watchall" onClick={this.handleAll}>查看所有计划</div>
                            <img src={img7} style={{position: 'absolute',
                                left: 234,
                                top: 441}}/>
                        </div>
                    </div>
                    <div id="CommentApp">
                        {<CommentApp commentDate={data}/>}
                    </div>

                </div>
            </div>
        )
    }
}
export default TaskDetails;