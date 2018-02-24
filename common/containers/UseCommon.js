/**
 * Created by Administrator on 2017/8/23 0023.
 */

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import UseCommon from '../components/UseCommon';
import {Use_Responsible,Task_Details} from '../action/index';

function mapStateToProps(state) {
    return {
        common: state.UseCommon.common,
        build: state.BuildTask.build,
        use: state.TaskDetails.use,

    };
}

function mapDispatchToProps(dispatch) {
    return {
        handleCommon: bindActionCreators(Use_Responsible, dispatch),
        handleDetails: bindActionCreators(Task_Details, dispatch)

    };
}

export default connect(mapStateToProps, mapDispatchToProps)(UseCommon);