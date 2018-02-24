import { Table, Button,Icon,Popconfirm,Input } from 'antd';
import { Select } from 'antd';
import React from 'react';
import {Attachment_controller} from '../controllers/PlanAttachment';
import {executor_controller} from '../controllers/TaskExecutor';
const Option = Select.Option;

class AttachmentList extends React.Component {
    constructor(props) {
        super(props);
        this.columns = [
            {
                title: '附件名称',
                dataIndex: 'name',
                width: '30%',

            }, {
                title: '上传时间',
                dataIndex: 'createdAt',
            }, {
                title: '执行者',
                dataIndex: 'realName',
            },
            {
                title: '操作',
                dataIndex: '',
                render: () => <a
                    href="http://sw.bos.baidu.com/sw-search-sp/software/69380a9e8cb74/IQIYIsetup_bdtw_6.0.46.4598.exe">下载</a>
            },
            {
                title: '操作', dataIndex: '', render: (text, record, index) => {
                return (
                    this.state.dataSource.length > 1 ?
                        (
                            <Popconfirm title="确定删除吗?" onConfirm={(index) => this.onDelete(index)}>
                                <Icon type="delete" />
                            </Popconfirm>
                        ) : null
                );
            }
            }];


        this.state = {
            selectedRowKeys: [],  // Check here to configure the default column
            loading: false,
            showHide:'none',
            select:[],
            curList:[],
            dataSource: [{
                key:'1',
                name: '',
                createdAt: '',
                realName:'',
                portrait:'',
            }, {
                key:'2',
                name: '',
                createdAt: '',
                realName:'',
                portrait:'',
            },{
                key:'3',
                name: '',
                createdAt: '',
                realName:'',
                portrait:'',
            }],

        };
    }
    onDelete = (index) => {
        const dataSource = [...this.state.dataSource];
        dataSource.splice(index, 1);
        this.setState({dataSource});
    }


    onSelectChange = (selectedRowKeys) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        if(selectedRowKeys.length>0){
            this.setState({
                showHide:'block'
            })
        }

        this.setState({selectedRowKeys});

    }


        handleChange = (value) => {
            let temp = [],
                {rowData} = this.state;

            rowData.forEach(
                (item) => {
                    if (item.realName == value) {
                        temp.push(item)
                    }
                }
            );
            if (temp.length == 0) {
                alert('没找到所要的结果')
            }
            this.setState({
                dataSource: temp
            })

        }
       handleClick=()=>{
           let { selectedRowKeys,dataSource } = this.state,
               temp = [];

           for ( let i = 0; i < selectedRowKeys.length; i++){
               for( let k = 0; k <  dataSource.length; k++){
                   if( selectedRowKeys[i] == k){
                       dataSource[k] ='s';
                   }else{
                       continue;
                   }
               }
           }
           for( let j = 0; j < dataSource.length;j++ ){
               if( dataSource[j] !== 's'){
                   temp.push(dataSource[j]);
               }
           }

           this.setState({
               dataSource:temp
           })
       }
    componentWillMount(){
        this.showBasicInfo();
        this.showListInfo();
    }
    showBasicInfo=()=>{
        let taskId = this.props.location.query.taskId;
        let userId = this.props.location.query.UserId;
        console.log(taskId)
        console.log(userId)
        const {handle}=this.props;
        Attachment_controller({taskId,userId},(err,values)=> {
            if (!err) {
            } else {
                handle(values)
                let temp = {
                    name: '',
                    createdAt: '',
                    realName:'',
                    portrait:'',
                };
                let arr = [];

                let data = handle(values).attachment;
                console.log(data);

                for( let k = 0;k < data.length; k++){
                    arr[k]= {};
                }

                data.forEach((item, index) => {
                    for (let key in temp) {
                        arr[index][key] = item[key];
                    }
                })

                this.setState({
                    dataSource: arr,
                    rowData:arr
                })

            }
        })


    }
    showListInfo=()=>{
        let taskId = this.props.location.query.taskId;
        let userId = this.props.location.query.userId;
        executor_controller({taskId,userId},(err,values)=>{
            if(err){


                this.setState({
                    select:values || []
                })
                console.log(this.state.select)
            }
        });
    }

    render()
    {
        const {dataSource} = this.state;
        const columns = this.columns;
        const {loading, selectedRowKeys} = this.state;
        let navState=this.state.showHide;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        const hasSelected = selectedRowKeys.length > 0;
        let select =this.state.curList.length ==  0 ? this.state.select:this.state.curList;
        select = select || [];
        let array = select.map((item ,index)=>{
            return (
                <Select defaultValue="请选择人名" style={{ width: 120 }} key={index} onChange={this.handleChange}>
                    <Option value={item.realName}>{item.realName}</Option>
                </Select>
            )
        })
        return (
            <div>
                <div className="header-top">
                    <div className="attachment-list">附件列表</div>
                </div>
                <div className="main">
                    <div className="main-content">
                        <div className="content-person">执行者:</div>
                        <div className="content-select">
                            {array}

                        </div>
                        <div style={{marginBottom: 112}}>
                            <div className="clickbutton">
                                <Button
                                    type="primary"
                                    onClick={this.onSelectChange}


                                    style={{display:navState,margin:10}}
                                >
                                    批量下载
                                </Button>
                                <Button
                                    type="primary"
                                    onClick={this.handleClick}


                                    style={{display:navState,margin:10}}
                                >
                                    批量删除
                                </Button>
                            </div>
                            <div className="select-right">

                    <span style={{marginLeft: 8}}>
            {hasSelected ? `选择 ${selectedRowKeys.length} 条` : ''}

          </span>
                            </div>
                        </div>
                        <Table rowSelection={rowSelection} columns={columns} dataSource={dataSource}>

                        </Table>
                    </div>
                </div>
            </div>
        );
    }


}

export default AttachmentList;