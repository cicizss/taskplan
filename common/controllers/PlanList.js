/**
 * Created by Administrator on 2017/8/31 0031.
 */
import {serverAddress} from '../utils/httpRequest';

export const test_controller = ( callback) => {
    serverAddress('/restful/plan/myPlanList', {}, 'GET', {}, (error, result) => {
        if (error) return callback(false, error);
        if (result && result.result !== null && result.status === 200)
            callback(true, result.result);
        else
            callback(false, result);
    });
};