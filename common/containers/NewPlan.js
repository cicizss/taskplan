/**
 * Created by Administrator on 2017/8/21 0021.
 */
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import NewPlan from '../components/NewPlan';
import {save_New_Plan_creator} from '../action/index';
function mapStateToProps(state) {
    return {
      plan:state.NewPlan.plan
    };
}

function mapDispatchToProps(dispatch) {
    return {
        handleAdd:bindActionCreators(save_New_Plan_creator,dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(NewPlan);