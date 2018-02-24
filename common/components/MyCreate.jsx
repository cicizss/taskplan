import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {test_controller} from '../controllers/TaskList';
import moment from 'moment';
import img1 from '../images/reply.png';

class MyCreate extends React.Component {
    static propTypes = {
        /*        loading: PropTypes.bool.isRequired,
         error: PropTypes.bool.isRequired*/
    };

    static contextTypes = {
        router: PropTypes.object
    };

    constructor(props, context) {
        super(props, context);
        this.state = {
            data: [

            ]
        }

    }
    componentWillMount() {
        this.showBasicInfo();
    }

    componentWillReceiveProps(nextProps) {
        this.showBasicInfo(nextProps.create);
    }

    showBasicInfo = (status = 'a') => {
        test_controller(status, (err, values) => {
            if (err) {
                this.setState({
                    data: values
                });
            }
        });
    }


    handleAdd = (e) => {
        const _id = e.currentTarget.dataset.id;

        return this.context.router.push('/TaskDetails?id=' + _id);
    }

    render() {
        // const {data} = this.state;
        //let {task} = this.props;
        //console.log("%c" + this.props.task, 'color:green;');
        // let temp = data[0].taskRoles;
        // let add = data[0].taskComments;

        // let reply = add.map((item, index) => {
        //     return (
        //         <div className="use-add" key={index}>
        //             <div className="use-reply">{item.add}</div>
        //         </div>
        //     )
        // });

        // let arr = ['执行者', '审核者', '参与者']; // 2 , 3 , 4
        //
        // const select = arr.map((item, index) => {
        //
        //     const person = _.groupBy(this.state.data.taskRoles, {role: (index + 1)});
        //     return (
        //         <div className="user-room">
        //             <div className="user-role">{item}</div>
        //             <div className="user-realName">{person.realName}</div>
        //         </div>
        //     )
        // });

        // _.find()
        //
        // let select = this.state.data.taskRoles.map((item, index) => {
        //     item['role'] = arr[index];
        //     return (
        //         <div className="user-room" key={index}>
        //             <div className="user-role">{item.role}</div>
        //             <div className="user-realName">{item.realName}</div>
        //         </div>
        //     )
        // })


        // const selectAdd = (index, e , pe)


        const list = this.state.data.map((item, index) => {

            let arr = ['责任人', '执行者', '审核者', '参与者']; //1, 2 , 3 , 4

            const select = [];
            arr.forEach((e, index) => {
                let _person;
                const person = _.find(item.taskRoles, {role: (index + 1)});
                const count = _.countBy(item.taskRoles, {role: (index + 1)})['true'];
                if (count >= 1) {
                    _person = '' + person.realName + ' 等' + count + '人';
                    select.push(
                        <span key={index}>
                            <span style={{fontWeight: 'bolder', marginRight: 5 + 'px',fontSize:15}}>{e}</span>
                            <span style={{marginRight: 30 + 'px'}}>{_person}</span>
                        </span>);
                }
            });

            return (
                <div className="user-list" key={index} data-id={item.id} onClick={this.handleAdd}>
                    <div className="user-left">
                        <div className="user-content">{item.content}</div>
                        <div style={{marginTop: 15 + 'px'}}>
                            <span style={{marginRight: 100 + 'px'}}><span
                                style={{marginRight: 5 + 'px'}}>开始时间:</span>{moment(item.startTime).format('YYYY年MM月DD hh:mm')}</span>
                            <span><span
                                style={{marginRight: 5 + 'px'}}>结束时间:</span>{moment(item.endTime).format('YYYY年MM月DD hh:mm')}</span>
                        </div>
                        <div style={{marginTop: 15 + 'px'}}>

                            {select}
                            <img  style={{width:18,marginTop:0,marginRight:5,verticalAlign:'sub',padding:0}}src={img1}/>
                            <span>{item.taskComments.length}条回复</span>
                        </div>

                    </div>
                    <div className="user-right">
                        <div style={{color : item.status == 0 ? '#F82B7E' : '#CCCCCC', width: 68,
                            height:23,
                            backgroundColor: item.status == 0 ? '#FFF0F5' : '#F7F7F7',  textAlign:'center', fontSize:14,marginLeft:14}}>
                            {item.status == 0 ? '正在进行' : item.status == 1 ? '已结束' : ''}
                        </div>
                        <div style={{marginRight: 8, color:'#99A0AE',marginTop:41}}>
                            {moment(item.createdAt).format('YYYY年MM月DD hh:mm')}
                        </div>
                    </div>
                </div>
            )
        });

        return (
            <div>
                <div className="map-use">
                    {list}
                </div>
            </div>
        )
    }
}
export default MyCreate;