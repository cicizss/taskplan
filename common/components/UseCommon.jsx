import React from 'react';
import {Select} from 'antd';
import {Input, Button, Icon} from 'antd';
import img1 from '../images/right.png';
import {common_controller} from '../controllers/UseCommon';
import {imageUrl}from '../../server/config.js';
import img8 from '../images/upload.png';
const Option = Select.Option;
class UseCommon extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            array: [{realName: '', id: '', portrait: ''}],
            currentString: [],
            show: false
        }
    }

    handleChange = (value) => {
        console.log(`selected ${value}`);
    }

    handleBlur = () => {
        console.log('blur');
    }

    handleFocus = () => {
        console.log('focus');
    }

    componentWillMount() {
        this.showBasicInfo();
    }

    showBasicInfo = () => {
        common_controller((err, values) => {
            if (err) {
                const _values = values.map((items, index) => {
                    items['show'] = false;
                    return items;
                })
                this.setState({
                    array: _values
                });
            }
        });
    }

    handleShow = (e) => {

        e.stopPropagation();
        if (this.props.currentEditor === 0) return;
        const {handleCommon} = this.props;
        let temp = this.state.array;

        let add = temp[e.currentTarget.dataset.key];
        handleCommon(add);
        temp[e.currentTarget.dataset.key].show = !temp[e.currentTarget.dataset.key].show;
        this.setState({
            array: temp,
        });

        //console.log( handleCommon(add.name))
        // console.log(this.props.currentEditor)
        //switch (this.props.currentEditor) {
        // case "responsible":
        //temp[e.target.dataset.key].show = !temp[e.target.dataset.key].show;

        // let tempString = //;
        //this.setState({
        //     array: temp,
        //    responsible: this.state.responsible + " " + temp[e.currentTarget.id].name
        // });
        //  handleResponsible(this.state.responsible + " " + temp[e.currentTarget.id].name);
        // break;
        //case 'executor':
        //temp[e.target.dataset.key].show = !temp[e.target.dataset.key].show;

        // let tempString = //;
        // this.setState({
        //array: temp,
        // executor: this.state.executor + " " + temp[e.currentTarget.id].name
        // });
        // handleExecutor(this.state.executor + " " + temp[e.currentTarget.id].name);
        // break;
        //case 'auditor':
        // temp[e.target.dataset.key].show = !temp[e.target.dataset.key].show;

        // let tempString = //;
        //this.setState({
        // array: temp,
        //  auditor: this.state.auditor + " " + temp[e.currentTarget.id].name
        // });
        //  handleAuditor(this.state.auditor + " " + temp[e.currentTarget.id].name);
        //break;
        // case 'partener':
        // temp[e.target.dataset.key].show = !temp[e.target.dataset.key].show;

        // let tempString = //;
        //this.setState({
        // array: temp,
        //partener: this.state.partener + " " + temp[e.currentTarget.id].name
        //  });
        //  handlePartener(this.state.partener + " " + temp[e.currentTarget.id].name);
        // break;
        //default:
        //   ;
        //break;
        //  }
    }
    handleHidden = (e) => {
        e.stopPropagation();
        // console.log(e.target.dataset.key)
        let temp = this.state.array;

        temp[e.target.dataset.key].show = !temp[e.target.dataset.key].show;

        this.setState({
            array: temp
        })
    }

    render() {

        let list = this.state.array.map((item, index) => {
            return (
                <div key={index}>
                    <div className="person-images" onClick={ this.handleShow } data-key={index}>
                        <img src = { item.portrait ? imageUrl+item.portrait :img8}
                        />
                        <div style={{'display': item.show ? 'inline-block' : 'none'}} className="duihao"
                             data-key={index} onClick={ this.handleHidden }>
                            <img src={img1} data-key={index} onClick={ this.handleHidden }/>
                        </div>

                    </div>
                    <div className="person-name" data-key={index}>{item.realName}</div>
                </div>
            )
        })
        return (
            <div className="container">
                <div className="select-wrap">
                 武汉畅游有限公司

                </div>
                <div className="select-color">
                <div className="select-input">
                    <Input size="large" placeholder="请输入"/>
                    <div className="select-find">
                        <Button type="primary">搜索</Button>
                    </div>
                </div>
                </div>
                <div className="person-list">
                    {list}
                </div>
            </div>
        )
    }
}
export default UseCommon ;
