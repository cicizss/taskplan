import {Tabs, Radio} from 'antd';
import PropTypes from 'prop-types';
import React from 'react';
import {Select} from 'antd';
import {list_controller} from '../controllers/TaskPlan';
import {executor_controller} from '../controllers/TaskExecutor';
import {imageUrl}from '../../server/config.js';
import img1 from '../images/move.png';
import img2 from '../images/close.png';
import moment from 'moment';
const TabPane = Tabs.TabPane;
const Option = Select.Option;
class TaskPerson extends React.Component {

    static propTypes = {};

    static contextTypes = {
        router: PropTypes.object
    };

    state = {
        data:[],
        selelct:[],
        curShow:[],
        curList:[],
        curName:''
    };
    componentWillMount(){
        this.showBasicInfo();
        this.showListInfo();
    }

  showBasicInfo=()=>{
        const id = this.props.location.query.taskId;

        list_controller(id,(err,values)=>{
            if(err){

                this.setState({
                    data: values
                })
            }
        });
    };


     showListInfo=()=>{

         let userId = this.props.location.query.userId;
         let taskId = this.props.location.query.taskId;
         executor_controller({userId,taskId},(err,values)=>{
         if(err){


         this.setState({
           select:values || []
                 });
             console.log(this.state.select)
         }
         });
     };


    handleChange=(value)=> {
        let temp = [];
        if( value == '全部'){

                this.state.curName && this.state.data.forEach( item =>{

                    if( item.realName == this.state.curName ){
                        temp.push(item)
                    }
                } );
               if( !this.state.curName ){
                   temp = this.state.data
               }
            this.state.curShow.length == 0 && this.setState({
                curShow:temp
            },function(){
                if(this.state.curShow.length == 0){
                    alert("无适配结果")
                }
                this.setState({
                    dataSource: temp
                })
            });

            return;
        }


        value = value == '已完成'? 0:1;

        this.state.curShow.length !=0 && this.state.curShow.forEach( item =>{

            if( item.status == value ){
                temp.push(item)
            }
        } );
        this.state.curShow.length ==0 && this.state.data.forEach( item =>{

            if( item.status == value ){
                temp.push(item)
            }
        } );
        this.setState({
            curShow:temp,
        },function(){
            if(this.state.curShow.length == 0){
                alert("无适配结果")
            }})
    };

    handleBlur=()=> {
        console.log('blur');
    };

    handleFocus=()=> {
        console.log('focus');
    };
    handleAdd=(value)=>{
        let temp = [];
        this.setState({
            curName:value,
        });

        this.state.curShow.length !=0 && this.state.curShow.forEach( item =>{

            if( item.realName == value ){
                temp.push(item)
            }
        } );
        this.state.curShow.length ==0 && this.state.data.forEach( item =>{

            if( item.realName == value ){
                temp.push(item)
            }
        } );
        this.setState({
            curShow:temp,
        },function(){
            if(this.state.curShow.length == 0){
                alert("无适配结果")
            }})
    };
    handleReturn=()=>{
       this.context.router.push('/TaskDetails');

};
    render() {



        let data = this.state.curShow.length != 0 ? this.state.curShow:this.state.data;


        let select =this.state.curList.length ==  0 ? this.state.select:this.state.curList;
        select = select || [];
        let  list = data.map((item, index) => {


            return (
                <div className="user-list" style={{display:'flex'}}>
                    <h1 className="left">
                        <img style={{width:38,height:38}} src={imageUrl+item.portrait} />
                        <div>{item.realName}</div>
                    </h1>
                    <div style={{flex:1}}>
                        <h3 style={{
                            margin:'10px 0',
                        }}
                            >
                            {item.name}</h3>
                        <p style={{
                            margin: '18px 0'
                        }}>
                            {item.content}
                        </p>
                        <div style={{
                            margin:'-9px 0'
                        }}>
                            <span style={{marginRight:5}}>开始时间：</span><span style={{marginRight:45}}> {moment(item.startTime).format('YYYY年MM月DD hh:mm')}</span>
                            <span style={{marginRight:5}}>截止时间 ：</span><span style={{marginRight:45}}> {moment(item.endTime).format('YYYY年MM月DD hh:mm')}</span>
                            <span  style={{marginLeft:75}}>{item.planComments.length}条回复</span>
                        </div>
                    </div>
                    <div>
                        <div style={{
                            display:'inline-block',
                            padding:'4px 15px',
                            'text-align':'center',
                            marginTop:10,
                            marginRight:10
                        }}>
                            {item.status == 0 ?'已完成' : item.status == 1 ? '未完成' : ''}
                        </div>
                        <div style={{
                            marginTop: 45,
                            marginRight:10
                        }}>
                            {moment(item.createdAt).format('YYYY年MM月DD hh:mm')}
                        </div>
                    </div>
                </div>
            )
        });
        let array = select.map((item ,index)=>{
            return (

                <Option value={item.realName} key={index}>{item.realName}</Option>

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
                    <div className="ReturnPerson" onClick={this.handleReturn}> >返回</div>
                    <div className="main-content">
                        <div className="slector">
                            执行者: <Select defaultValue="请选择人名" style={{ width: 120,marginTop:10, marginLeft:10}}  onChange={this.handleAdd}>
                            {array}
                        </Select>
                        </div>

                        <div className="listStatus">
                            <div className="MyStatus">计划状态:</div>
                            <Select
                                showSearch
                                style={{ width: 200 }}
                                placeholder="请选择"
                                optionFilterProp="children"
                                onChange={this.handleChange}
                                onFocus={this.handleFocus}
                                onBlur={this.handleBlur}
                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            >


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
                        <div className="createMy">
                            {list}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


export default TaskPerson;