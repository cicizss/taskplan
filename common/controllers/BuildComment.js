/**
 * Created by Administrator on 2017/9/8 0008.
 */
import {serverAddress} from '../utils/httpRequest';

export const BuildComments_controller = (data, callback) => {

    serverAddress('/restful/comment/create', {}, 'POST', data, (error, result) => {
        if (error) return callback(false, error);
        if (result && result.result !== null && result.status === 200)
            callback(true, result.result);
        else
            callback(false, result);
    });
};