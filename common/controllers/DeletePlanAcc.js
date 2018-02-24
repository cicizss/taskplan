/**
 * Created by Administrator on 2017/9/28 0028.
 */
import {serverAddress} from '../utils/httpRequest';

export const deletePlanAcc_controller = (data,callback) => {
    console.log(data)

    serverAddress('/restful/plan/deletePlanAcc/'+data, {}, 'POST', {}, (error, result) => {

        if (error) return callback(false, error);
        if (result && result.result !== null && result.status === 200)
            callback(true, result.result);
        else
            callback(false, result);
    });
};