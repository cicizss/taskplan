/**
 * Created by zfp on 2017/9/16.
 */
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import PlanAttachment from '../components/PlanAttachment';
import {plan_Details_creator} from '../action/index';

function mapStateToProps(state) {
    return {
      attachment:PlanAttachment.state
    };
}

function mapDispatchToProps(dispatch) {
    return {
        handle: bindActionCreators(plan_Details_creator, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PlanAttachment);