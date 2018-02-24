/**
 * Created by Administrator on 2017/9/14 0014.
 */
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import TaskPerson from '../components/TaskPerson';
import {Task_Person} from '../action/index';

function mapStateToProps(state) {
    return {
        person: state.TaskPerson.person
    };
}

function mapDispatchToProps(dispatch) {
    return {
        handleData: bindActionCreators(Task_Person, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskPerson);