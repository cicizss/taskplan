import _ from 'lodash';
import PropTypes from 'prop-types';
import {DatePicker} from 'antd';
import {Form, Icon, Input, Button} from 'antd';
import UseCommon from '../containers/UseCommon';
import {build_controller} from '../controllers/BuildTask';
import {details_controller} from '../controllers/TaskDetails';
import {UpdateTask_controller}from '../controllers/UpdateTask';
import {Use_Responsible} from '../action';
import img8 from '../images/upload.png';
import img9 from '../images/move.png';
import img10 from '../images/close.png';
import moment from 'moment';
import {Select} from 'antd';
import React from 'react';
const Option = Select.Option;
const {TextArea} = Input;
const FormItem = Form.Item;
const {RangePicker} = DatePicker;


class BuildTask extends React.Component {

    static contextTypes = {
        router: PropTypes.object,
        store: PropTypes.object
    };
    state = {
        currentInput: 1,
        //保存当前已经输入的人名，respnsible表示第一个
        Responsible: [], //责任人
        Executor: [], //执行者
        Auditor: [], //审核者
        Participant: [] //参与者

    };

    componentDidMount() {
        const {form} = this.props;
        const id = this.props.location.query.id;
        if (id === undefined)return;
        details_controller(id, (err, values) => {
            if (err) {
                this.setState({
                    data: values,
                });
                console.log(this.state.data);
                const taskRoles = this.state.data.taskRoles;
                const Responsible = []; //责任人
                const Executor = []; //执行者
                const Auditor = []; //审核者
                const Participant = []; //参与者
                for (var i = 0; i < taskRoles.length; i++) {
                    if (taskRoles[i].role == 1) {
                        let name = taskRoles[i].realName;
                        Responsible.push(name);
                        this.state.Responsible.push(taskRoles[i]);
                    }
                    if (taskRoles[i].role == 2) {
                        let name = taskRoles[i].realName;
                        Executor.push(name);
                        this.state.Executor.push(taskRoles[i]);
                    }
                    if (taskRoles[i].role == 3) {
                        let name = taskRoles[i].realName;
                        Auditor.push(name);
                        this.state.Auditor.push(taskRoles[i]);
                    }
                    if (taskRoles[i].role == 4) {
                        let name = taskRoles[i].realName;
                        Participant.push(name);
                        this.state.Participant.push(taskRoles[i]);
                    }
                }
                form.setFieldsValue({
                    content: this.state.data.content,
                    startEndTime: [moment(this.state.data.startTime), moment(this.state.data.endTime)],
                    responsible: Responsible,
                    executor: Executor,
                    auditor: Auditor,
                    participant: Participant
                })


            }
        });
    }

    onChange = (value, dateString) => {

    };

    onOk = (value) => {
        console.log('onOk: ', value);
    };

    handleSubmit = (e) => {
        e.preventDefault();

        this.props.form.validateFields((err, values) => {
            if (!err) {

                const {handleAdd, common} = this.props;
                const id = this.props.location.query.id;

                const {currentInput, Responsible, Executor, Auditor, Participant} = this.state;//责任人，执行者，审核者，参与者
                let executorIds = [];
                let auditorIds = [];
                let ParticipantIds = [];
                Executor.forEach((item) => {
                    if (item && item.userId) {
                        executorIds.push(item.userId)
                    }
                });

                Auditor.forEach((item) => {
                    if (item.userId) {
                        auditorIds.push(item.userId)
                    }
                });

                Participant.forEach((item) => {
                    if (item.userId) {
                        ParticipantIds.push(item.userId)
                    }
                });

                if(e.currentTarget.innerText=='新建任务'){
                    build_controller({
                        content: values.content,
                        startTime: values.startEndTime[0].format('YYYY-MM-DD HH:MM:ss'),
                        endTime: values.startEndTime[1].format('YYYY-MM-DD HH:MM:ss'),
                        executor: executorIds,//执行者
                        checker: auditorIds,//审核者
                        participant: ParticipantIds,//参与者
                        principal: Responsible[0].userId,//责任人


                    }, (bool, result) => {
                        if (bool) {
                            handleAdd(values);

                            this.context.router.replace('/TaskList');
                        } else {
                            alert('创建失败');
                        }
                    });
                }else{
                    const id = this.props.location.query.id;
                    UpdateTask_controller({
                        content: values.content,
                        startTime: values.startEndTime[0].format('YYYY-MM-DD HH:MM:ss'),
                        endTime: values.startEndTime[1].format('YYYY-MM-DD HH:MM:ss'),
                        executor: executorIds,//执行者
                        checker: auditorIds,//审核者
                        participant: ParticipantIds,//参与者
                        principal: Responsible[0].userId,//责任人
                        taskId:id,
                    }, (bool, result) => {
                        if (bool) {
                            console.log(bool)
                            handleAdd(values);
                            this.context.router.replace('/TaskList');
                        } else {
                            alert('编辑失败');
                        }
                    });
                }


            }
        });
    }

    handleFocus1 = () => {
        this.setState({currentInput: 1});
    };

    handleFocus2 = () => {
        this.setState({currentInput: 2});
    };

    handleFocus3 = () => {
        this.setState({currentInput: 3});
    };

    handleFocus4 = () => {
        this.setState({currentInput: 4});
    };

    BuildTask = () => {

    };

    handleResponsibleChange = (value) => {
        const {Responsible} = this.state;
        const _Responsible = [];
        value.forEach((e) => {
            _Responsible.push(Responsible[_.findIndex(Responsible, {realName: e})]);
        });
        this.state.Responsible = _Responsible;
    };

    handleExecutorChange = (value) => {
        const {Executor} = this.state;
        const _Executor = [];
        value.forEach((e) => {
            _Executor.push(Executor[_.findIndex(Executor, {realName: e})]);
        });
        this.state.Executor = _Executor;
    };

    handleAuditorChange = (value) => {
        const {Auditor} = this.state;
        const _Auditor = [];
        value.forEach((e) => {
            _Auditor.push(Auditor[_.findIndex(Auditor, {realName: e})]);
        });
        this.state.Auditor = _Auditor;
    };

    handleParticipantChange = (value) => {
        const {Participant} = this.state;
        const _Participant = [];
        value.forEach((e) => {
            _Participant.push(Participant[_.findIndex(Participant, {realName: e})]);
        });
        this.state.Participant = _Participant;
    };

    componentWillReceiveProps(nextProps) { //属性改变的时候触发
        const {common} = nextProps; //员工列表发送过来的员工信息


        const {currentInput, Responsible, Executor, Auditor, Participant} = this.state;
        if (!common) return;

        if (_.findIndex(Responsible, {realName: common.realName}) !== -1 ||
            _.findIndex(Executor, {realName: common.realName}) !== -1 ||
            _.findIndex(Auditor, {realName: common.realName}) !== -1 ||
            _.findIndex(Participant, {realName: common.realName}) !== -1)
            return this.context.store.dispatch(Use_Responsible(null)); //重置common为null;

        switch (currentInput) {
            case 1:
                Responsible.push(common);
                break;
            case 2:
                Executor.push(common);
                break;
            case 3:
                Auditor.push(common);
                break;
            case 4:
                Participant.push(common);
                break;
            default:
                break;
        }
        this.context.store.dispatch(Use_Responsible(null)); //重置common为null

        this.props.form.setFieldsValue({
            'responsible': Responsible.map((item) => {
                return item.realName;
            })
        });

        this.props.form.setFieldsValue({
            'executor': Executor.map((item) => {
                return item.realName;
            })
        });

        this.props.form.setFieldsValue({
            'auditor': Auditor.map((item) => {
                return item.realName;
            })
        });

        this.props.form.setFieldsValue({
            'participant': Participant.map((item) => {
                return item.realName;
            })
        });
    }
    handleReturn=()=>{
        return this.context.router.push('/TaskList');
    }
    render() {
        const {getFieldDecorator, getFieldsError, getFieldError, isFieldTouched} = this.props.form;
        const userNameError = isFieldTouched('userName') && getFieldError('userName');
        const id = this.props.location.query.id;
        return (
            <div>
                <Form layout="inline" onSubmit={this.handleSubmit}>
                    <div className="Build-top">
                        <div className="Build-left">
                            <div className="Build-img1"></div>
                            <div className="arrow-left">
                                <Icon type="left"/>
                            </div>
                            <div className="arrow-right">
                                <Icon type="right"/>
                            </div>
                            <div className="arrow-upload">
                                <img src={img8}/>
                            </div>
                            <div className="Build-left-word">新建任务</div>
                        </div>
                        <div className="Build-img2">
                            <img src={img9}/>
                            <img src={img10}/>
                        </div>
                    </div>
                    <div className="Build-content">
                        <div className="Build-content-word">
                            <div className="Build-slip" onClick={this.handleReturn}> >返回 </div>
                            <div className="Build-plancontent">
                                <div className="Build-wrapcontent">任务内容:</div>
                                <FormItem

                                >
                                    {getFieldDecorator('content', {})(
                                        <TextArea style={{width: 400, height: 100,left:-66,top:64}}/>
                                    )}
                                </FormItem>


                                <div className="Build-selecttime">选择时间:</div>

                                <div className="Build-movetime">
                                    <FormItem>
                                        {getFieldDecorator('startEndTime', {})(
                                            <RangePicker
                                                showTime={{format: 'HH:mm'}}
                                                format="YYYY-MM-DD HH:mm"
                                                placeholder={['开始时间', '结束时间']}
                                                onChange={this.onChange}
                                                onOk={this.onOk}
                                            />
                                        )}
                                    </FormItem>
                                </div>

                                <div className="Build-task">
                                    <div className="task-tip">责任人:
                                        <FormItem>
                                            <div className="select-tip">
                                                {getFieldDecorator('responsible', {})(
                                                    <Select mode="tags"
                                                            onFocus={this.handleFocus1}
                                                            dropdownStyle={{height: 0,}}
                                                            style={{
                                                                width: 176
                                                            }}

                                                            onChange={this.handleResponsibleChange}
                                                    >
                                                    </Select>
                                                )}
                                            </div>
                                        </FormItem>
                                    </div>

                                    <div className="task-sap">执行者:
                                        <div className="select-sap">
                                            <FormItem>

                                                {getFieldDecorator('executor', {
                                                    rules: [{required: true, message: '执行者必填'}]
                                                })(
                                                    <Select mode="tags"
                                                            onFocus={this.handleFocus2}
                                                            style={{width: 366}}
                                                            dropdownStyle={{height: 0,}}

                                                            onChange={this.handleExecutorChange}
                                                    >
                                                    </Select>
                                                )}
                                            </FormItem>
                                        </div>
                                    </div>

                                    <div className="task-exam">审核者:
                                        <div className="select-exam">
                                            <FormItem>
                                                {getFieldDecorator('auditor', {})(
                                                    <Select mode="tags"
                                                            onFocus={this.handleFocus3}
                                                            style={{width: 366}}
                                                            dropdownStyle={{height: 0}}

                                                            onChange={this.handleAuditorChange}
                                                    >
                                                    </Select>
                                                )}
                                            </FormItem>
                                        </div>
                                    </div>

                                    <div className="task-join">参与者:
                                        <div className="select-join">
                                            <FormItem>
                                                {getFieldDecorator('participant', {})(
                                                    <Select mode="tags"
                                                            onFocus={this.handleFocus4}
                                                            style={{width: 366}}
                                                            dropdownStyle={{height: 0}}
                                                            onChange={this.handleParticipantChange}
                                                    >
                                                    </Select>
                                                )}
                                            </FormItem>
                                        </div>
                                    </div>

                                </div>
                                <div className="add-leave">
                                    <UseCommon currentEditor={this.state.currentInput || ''}/>
                                </div>
                            </div>
                            <FormItem>
                                <div className="Build-plan">

                                    <Button

                                        type="primary"
                                        htmlType="submit"
                                        onClick={this.handleSubmit}

                                    >
                                        { id?'编辑任务':'新建任务'}

                                            </Button>
                                </div>
                            </FormItem>
                        </div>

                    </div>
                </Form>
            </div>
        );
    }
}

let Fillinformation = Form.create({})(BuildTask);

export default Fillinformation;