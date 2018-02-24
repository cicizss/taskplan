/**
 * Created by Administrator on 2017/8/25 0025.
 */
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import PlanList from '../components/PlanList';
import {Plan_list} from '../action/index';

function mapStateToProps(state) {
    return {
        select:state.PlanList.select
    };
}

function mapDispatchToProps(dispatch) {
    return {
        handle: bindActionCreators(Plan_list, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PlanList);