/**
 * Created by Administrator on 2017/8/23 0023.
 */
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import BuildTask from '../components/BuildTask';
import {Build_List, Use_Responsible, Current_Input,Task_Details} from '../action/index';

function mapStateToProps(state) {
    return {
        build: state.BuildTask.build,
        common: state.BuildTask.common,
        // use: state.TaskDetails.use,

    };
}

function mapDispatchToProps(dispatch) {
    return {
        handleAdd: bindActionCreators(Build_List, dispatch),
        handleCommon: bindActionCreators(Use_Responsible, dispatch),
        handleCurrentInput: bindActionCreators(Current_Input, dispatch),
        handleDetails: bindActionCreators(Task_Details, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(BuildTask);