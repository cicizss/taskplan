/**
 * Created by Administrator on 2017/9/28 0028.
 */
import {serverAddress} from '../utils/httpRequest';

export const deleteAllAcc_controller = (data,callback) => {
    console.log(data)

    serverAddress('/restful/plan/deleteAllAcc', {}, 'POST', {accessories:data}, (error, result) => {

        if (error) return callback(false, error);
        if (result && result.result !== null && result.status === 200)
            callback(true, result.result);
        else
            callback(false, result);
    });
};