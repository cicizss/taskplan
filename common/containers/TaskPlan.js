/**
 * Created by lenovo on 2017/9/10.
 */
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import TaskPlan from '../components/TaskPlan';
import {Task_Plan} from '../action/index';

function mapStateToProps(state) {
    return {
       // more: state.TaskPlan.more
    };
}

function mapDispatchToProps(dispatch) {
    return {
        handleData:bindActionCreators(Task_Plan,dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskPlan);