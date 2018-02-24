import React from 'react';
class MyReceive extends React.Component{
    constructor(props, context) {
        super(props, context);
        this.state = {}
    }
    render(){
        return (
            <div className="user-list" style={{display:'flex'}}>
                <h1 className="left">
                    <div>李明</div>
                </h1>
                <div style={{flex:1}}>
                    <h3 style={{
                        margin:'10px 0',
                    }}
                    >
                        本次完成第三阶段工作</h3>
                    <p style={{
                        margin: '18px 0'
                    }}>
                        本次完成第三阶段工作本次完成第三阶段工作本次完成第三阶段工作本次完成第三阶段工作本次完成第三阶段工作
                    </p>
                    <div style={{
                        margin:'10px 0'
                    }}>
                        <span style={{marginRight:5}}>开始时间：</span><span style={{marginRight:45}}>{}</span>
                        <span style={{marginRight:5}}>截止时间 ：</span><span style={{marginRight:45}}>11:00</span>
                        <span  style={{marginLeft:75}}>三条回复</span>
                    </div>
                </div>
                <div>
                    <div style={{
                        display:'inline-block',
                        padding:'4px 15px',
                        border:'1px solid red',color:'red',
                        'text-align':'center',
                        marginTop:10,
                        marginRight:10
                    }}>
                        已完成
                    </div>
                    <div style={{
                        marginTop: 45,
                        marginRight:10
                    }}>
                        下午 5 ：00
                    </div>
                </div>
            </div>
        )
    }
}
export default MyReceive;