/**
 * Created by Administrator on 2017/8/31 0031.
 */
import {serverAddress} from '../utils/httpRequest';

export const details_controller = (id, callback) => {

    serverAddress('/restful/task/detail/' + id, {}, 'GET', {}, (error, result) => {
        if (error) return callback(false, error);
        if (result && result.result !== null && result.status === 200)
            callback(true, result.result);
        else
            callback(false, result);
    });
};