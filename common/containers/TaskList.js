/**
 * Created by Administrator on 2017/8/21 0021.
 */
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import TaskList from '../components/TaskList';
import {save_Task_List_creator, My_Create} from '../action/index';

function mapStateToProps(state) {
    return {
        create: state.TaskList.create
    };
}

function mapDispatchToProps(dispatch) {
    return {
        handleData: bindActionCreators(save_Task_List_creator, dispatch),
        handleCreate: bindActionCreators(My_Create, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);