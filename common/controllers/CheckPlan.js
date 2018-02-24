/**
 * Created by Administrator on 2017/9/19 0019.
 */
import {serverAddress} from '../utils/httpRequest';

export const CheckPlan_controller = (data, callback) => {
    console.log(data);
    serverAddress('/restful/plan/checkPlan', {}, 'POST', data, (error, result) => {


        if (error) return callback(false, error);

        if (result && result.result !== null && result.status === 200)

            callback(true, result.result);
        else
            callback(false, result);
    });
};
