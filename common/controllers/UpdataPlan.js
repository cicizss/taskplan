/**
 * Created by Administrator on 2017/9/27 0027.
 */
import {serverAddress} from '../utils/httpRequest';

export const UpdatePlan_controller = (data, callback) => {

    serverAddress('/restful/plan/updatePlan', {}, 'POST', data, (error, result) => {
        if (error) return callback(false, error);
        if (result && result.result !== null && result.status === 200)
            callback(true, result.result);
        else
            callback(false, result);
    });
};