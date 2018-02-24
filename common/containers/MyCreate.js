/**
 * Created by Administrator on 2017/8/21 0021.
 */

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import MyCreate from '../components/MyCreate';
import {My_Create} from '../action/index';

function mapStateToProps(state) {
    return {
        create: state.MyCreate.create
    };
}

function mapDispatchToProps(dispatch) {
    return {
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MyCreate);