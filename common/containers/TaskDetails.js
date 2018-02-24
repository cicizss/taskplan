/**
 * Created by Administrator on 2017/8/29 0029.
 */

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import TaskDetails from '../components/TaskDetails';
import {Task_Details,Build_List,Use_Responsible} from '../action/index';

function mapStateToProps(state) {
    return {
        use: state.TaskDetails.use,
        comment: state.TaskDetails.comment,
        build: state.BuildTask.build,
        common: state.TaskDetails.common
    };
}

function mapDispatchToProps(dispatch) {
    return {
        handleDetails: bindActionCreators(Task_Details, dispatch),
        handleAdd: bindActionCreators(Build_List, dispatch),
        handleCommon: bindActionCreators(Use_Responsible, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskDetails);