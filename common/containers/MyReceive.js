/**
 * Created by Administrator on 2017/8/21 0021.
 */
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import MyReceive from '../components/MyReceive';
import {My_Receive} from '../action/index';
function mapStateToProps(state) {
    return {
        receive:state.MyReceive.receive
    };
}

function mapDispatchToProps(dispatch) {
    return {
        handleReceive:bindActionCreators(My_Receive,dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MyReceive);