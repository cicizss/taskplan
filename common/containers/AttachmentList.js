/**
 * Created by Administrator on 2017/8/23 0023.
 */
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import AttachmentList from '../components/AttachmentList';
import {Attachment_List} from '../action/index';

function mapStateToProps(state) {
    return {
        list:state.AttachmentList.list
    };
}

function mapDispatchToProps(dispatch) {
    return {
        handleList: bindActionCreators(Attachment_List, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AttachmentList);