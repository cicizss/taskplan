/**
 * Created by lenovo on 2017/9/10.
 */
import {serverAddress} from '../utils/httpRequest';

export const TaskPlan_controller = (data ,callback) => {
    const {taskId, userId} = data;
    serverAddress('/restful/plan/taskPeoplePlanList?taskId=' + taskId + '&userId=' + userId , {}, 'GET', {}, (error, result) => {

        if (error) return callback(false, error);
        if (result && result.result !== null && result.status === 200)
            callback(true, result.result);
        else
            callback(false, result);
    });
};
