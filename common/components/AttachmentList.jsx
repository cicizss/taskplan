import {Table, Button, Icon, Popconfirm, Input} from 'antd';import {Select} from 'antd';
import React from 'react';
import {AttachmentList_controller} from '../controllers/AttachmentList';
import {executor_controller} from '../controllers/TaskExecutor';
import {deletePlanAcc_controller} from '../controllers/DeletePlanAcc';
import {deleteAllAcc_controller} from '../controllers/DeleteAllAcc';
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
                dataIndex: 'url',
                render: () =>{return (<a
                   >下载</a>)}
            },
            {
                title: '操作', dataIndex: '', render: (text, record, index) => {

                return (
                    this.state.dataSource.length > 1 ?

                        (
                            <Popconfirm title="确定删除吗?" data-key={index} onConfirm={() => { this.onDelete(index) }}>
                                <Icon style={{marginLeft:-31,display:this.state.dataSource&&((this.state.dataSource.loginUserId==this.state.dataSource.userId) || this.state.dataSource.loginUserRole==1)?'block':'none'}}type="delete"/>
                            </Popconfirm>
                        ):null
                );
            }
            }]
        this.state = {
            selectedRowKeys: [],  // Check here to configure the default column
            loading: false,
            showHide: 'none',
            select: [],
            curList: [],
            dataSource: [{
                key: '1',
                name: '',
                createdAt: '',
                realName: '',
                portrait: '',
                id:'',
                url:''
            }, {
                key: '2',
                name: '',
                createdAt: '',
                realName: '',
                portrait: '',
                id:'',
                url:''
            }, {
                key: '3',
                name: '',
                createdAt: '',
                realName: '',
                portrait: '',
                id:'',
                url:''
            }],

        };
    }

    onDelete = (index) => {
        // console.log(e.currentTarget.dataset.key)
        let dataSource = [...this.state.dataSource];
        // dataSource.splice(index, 1);
        // this.setState({dataSource});
       console.log(dataSource[index].id)



        deletePlanAcc_controller(dataSource[index].id,(err,value)=>{
                if (err) {
                    this.showBasicInfo()

                }
        }

        )
    }


    onSelectChange = (selectedRowKeys) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        if (selectedRowKeys.length > 0) {
            this.setState({
                showHide: 'block'
            })
        }
        this.setState({selectedRowKeys});


    }
    handleClick = () => {
        let {selectedRowKeys, dataSource} = this.state,
            temp = [];

        for (let i = 0; i < selectedRowKeys.length; i++) {
            for (let k = 0; k < dataSource.length; k++) {
                if (selectedRowKeys[i] == k) {
                    dataSource[k] = 'c';
                } else {
                    continue;
                }
            }
        }
        for (let j = 0; j < dataSource.length; j++) {
            if (dataSource[j] !== 'c') {
                temp.push(dataSource[j].id);
            }
        }
         console.log('%c' + (temp), "color:red")
        // this.setState({
        //     dataSource: temp
        // })
        deleteAllAcc_controller(temp,(err,value)=>{
            if(err) {
                this.showBasicInfo()
            }
        })

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

    componentWillMount() {
        this.showBasicInfo();
        this.showListInfo();

    }

    showBasicInfo = () => {
        let userId = this.props.location.query.userId;
        let taskId = this.props.location.query.taskId
        const {handleList} = this.props;
        AttachmentList_controller({userId, taskId}, (err, values) => {
            if (!err) {
            } else {
                handleList(values)
                let temp = {
                    name: '',
                    createdAt: '',
                    realName: '',
                    portrait: '',
                    id:'',
                    url:''
                };
                let arr = [];

                let data = handleList(values).list;
                console.log(data)
                for (let k = 0; k < data.length; k++) {
                    arr[k] = {};
                }

                data.forEach((item, index) => {
                    for (let key in temp) {
                        arr[index][key] = item[key];
                    }
                })

                this.setState({
                    dataSource: arr,
                    rowData: arr
                })

            }
        })


    }
    showListInfo = () => {
        let userId = this.props.location.query.userId;
        let taskId = this.props.location.query.taskId;

        executor_controller({userId, taskId}, (err, values) => {
            if (err) {


                this.setState({
                    select: values || []
                })
                console.log(this.state.select)
            }
        });
    }

    render() {
        const {dataSource} = this.state;
        const columns = this.columns;
        const {loading, selectedRowKeys} = this.state;
        let navState = this.state.showHide;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        const hasSelected = selectedRowKeys.length > 0;
        let select = this.state.curList.length == 0 ? this.state.select : this.state.curList;
        select = select || [];
        let array = select.map((item, index) => {
            return (

                <Option value={item.realName} key={index}>{item.realName}</Option>


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
                        <div className="selector-check">
                            <Select defaultValue="请选择人名" style={{width: 120}} onChange={this.handleChange}>
                                {array}
                            </Select>
                        </div>
                        <div className="content-select">
                        </div>
                        <div style={{marginBottom: 112}}>
                            <div className="clickbutton">
                                <Button
                                    type="primary"
                                    onClick={this.onSelectChange}


                                    style={{display: navState, margin: 10}}
                                >
                                    批量下载
                                </Button>
                                <Button
                                    type="primary"
                                    onClick={this.handleClick}


                                    style={{display: (dataSource.loginUserRole === 1)?'block':'none', margin: 10}}
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