/**
 * Created by Administrator on 2017/8/22 0022.
 */

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import PlanDetails from '../components/PlanDetails';
import {plan_Details_creator} from '../action/index';

function mapStateToProps(state) {
    return {
        details:state.PlanDetails.details,
        comment: state.PlanDetails.comment
    };
}

function mapDispatchToProps(dispatch) {
    return {
        handle: bindActionCreators(plan_Details_creator, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PlanDetails);