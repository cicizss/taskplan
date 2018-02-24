import {DatePicker} from 'antd';
import {Form, Icon, Input, Checkbox} from 'antd';
import PropTypes from 'prop-types';
import {Upload, message, Button} from 'antd';
import React from 'react';
import {create_controller} from '../controllers/NewPlan';
import {plan_controller} from '../controllers/PlanDetails';
import {UpdatePlan_controller} from '../controllers/UpdataPlan';
import img3 from '../images/close.png';
import img4 from '../images/move.png';
import img5 from '../images/upload.png';
import img2 from '../images/arrow.png';
import {uploadUrl}from '../../server/config.js';
import moment from 'moment';

const {RangePicker} = DatePicker;
const FormItem = Form.Item;
const {TextArea} = Input;

class DateRange extends React.Component {
    static propTypes = {};

    static contextTypes = {
        router: PropTypes.object
    };
    state = {
        fileList: []
    };



    onOk = (value) => {
        console.log('onOk: ', value);
    }

    onChange = (value, dateString) => {
        console.log('Selected Time: ', value);
        console.log('Formatted Selected Time: ', dateString);
    }

    handleChange = ({fileList}) => this.setState({fileList})


    componentDidMount() {
        this.props.form.validateFields();
        const {form} = this.props;
        const id = this.props.location.query.id;
        if (id === undefined)return;

        plan_controller(id, (err, values) => {
            if (err) {
                this.setState({
                    data: values,
                });
                const accessories=this.state.data.accessories;
                const temp=[];
                for (var i = 0; i <accessories .length; i++){
                    temp.push(accessories[i].url)
                }
                form.setFieldsValue({
                    name:this.state.data.name,
                    content:this.state.data.content,
                    startEndTime:[moment(this.state.data.startTime), moment(this.state.data.endTime)],
                    accessory:temp
                })

            }
        });
    }
    handleSubmit = (e) => {
        e.preventDefault();
        const {fileList} = this.state;
        this.props.form.validateFields((err, values) => {

            if (!err) {

                if(e.currentTarget.innerText=='创建计划'){
                    values['filename'] = fileList[0].name;
                    values['filetype'] = fileList[0].type;

                    const _fileList = fileList.map((item) => {
                        return item.response.fileInfo[0];
                    })

                    const {handleAdd} = this.props;
                    let id = this.props.location.query.taskid
                    console.log(id)
                    create_controller({
                    taskId: id,
                    name: values.name,
                    content: values.content,
                    startTime: values.startEndTime[0].format('YYYY-MM-DD HH:MM:ss'),
                    endTime: values.startEndTime[1].format('YYYY-MM-DD HH:MM:ss'),
                    accessory: _fileList

                }, (bool, result) => {
                    console.log(bool)
                    if (bool) {
                        handleAdd(values);
                        console.log(handleAdd(values));
                        return  this.context.router.push('/PlanList');
                    } else {
                        alert('创建失败');
                    }
                })}else {
                       values['filename'] = fileList[0].name;
                       values['filetype'] = fileList[0].type;

                       const _fileList = fileList.map((item) => {
                           return item.response.fileInfo[0];
                       })

                       const {handleAdd} = this.props;
                       let id = this.props.location.query.id
                       let {data}=this.state
                       UpdatePlan_controller({
                           planId:data.id,
                           name: values.name,
                           content: values.content,
                           startTime: values.startEndTime[0].format('YYYY-MM-DD HH:MM:ss'),
                           endTime: values.startEndTime[1].format('YYYY-MM-DD HH:MM:ss'),
                           accessory: _fileList

                       }, (bool, result) => {
                           console.log(bool)
                           if (bool) {
                               handleAdd(values);
                               console.log(handleAdd(values));
                               return this.context.router.push('/PlanList');
                           } else {
                               alert('编辑失败');
                           }
                       });
                   }
            }
        });
    }

    render() {
        const {getFieldDecorator, getFieldsError, getFieldError, isFieldTouched} = this.props.form;
        const userNameError = isFieldTouched('userName') && getFieldError('userName');
        const id = this.props.location.query.id;
        const props = {
            action:uploadUrl ,
            onChange: this.handleChange,
            multiple: true,
            // data:{md5:'zzzz'}
        };
        return (
            <div>
                <Form layout="inline" onSubmit={this.handleSubmit}>
                    <div className="New-middle">
                        <div className="New-top">
                            <div className="New-left">
                                <div className="New-img1"></div>
                                <div className="new-left">
                                    <Icon type="left"/>
                                </div>
                                <div className="new-right">
                                    <Icon type="right"/>
                                </div>
                                <div className="new-upload">
                                    <img src={img5}/>
                                </div>
                                <div className="New-left-word">写计划</div>
                            </div>
                            <div className="New-img2">
                                <img src={img3}/>
                                <img src={img4}/>
                            </div>
                        </div>
                        <div className="New-content">
                            <div className="New-content-word">
                                <div className="plantitle">
                                    <div className="wrapplan"> 计划标题:</div>
                                    <FormItem>
                                        {getFieldDecorator('name', {
                                            rules: [{required: true, message: '计划标题必填'}]
                                        })(
                                            <input type="text"/>
                                        )}
                                    </FormItem>
                                </div>
                                <div className="plancontent">
                                    <div className="wrapcontent">计划内容:</div>
                                    <FormItem>
                                        {getFieldDecorator('content', {
                                            rules: [{required: true, message: '计划内容必填'}]
                                        })(
                                            <TextArea style={{width: 650, height: 100}}/>
                                        )}
                                    </FormItem>

                                    <div>
                                        <div>
                                            <div className="selecttime">选择时间</div>
                                            <div className="movetime">


                                                <FormItem>
                                                    {getFieldDecorator('startEndTime', {
                                                        rules: [{required: true, message: '选择时间必填'}]
                                                    })(
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
                                            <div>
                                                <FormItem>
                                                    {getFieldDecorator('accessory', {})(
                                                        <div className="addWord">
                                                            <Upload {...props}>
                                                                <Button>
                                                                    <Icon type="upload"/> 添加附件
                                                                </Button>
                                                            </Upload>
                                                        </div>
                                                    )}
                                                </FormItem>

                                            </div>
                                        </div>
                                        <FormItem>
                                        <div className="build-bottom">
                                            <Button type="primary"  htmlType="submit" onClick={this.handleSubmit}>
                                               { id?'编辑计划':'创建计划'}
                                            </Button>
                                        </div>
                                        </FormItem>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Form>
            </div>
        );
    }
}

const NewPlan = Form.create()(DateRange)
export default NewPlan;