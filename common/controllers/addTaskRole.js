/**
 * Created by Administrator on 2017/9/21 0021.
 */
import {serverAddress} from '../utils/httpRequest';

export const addTaskRole_controller = (data, callback) => {

    serverAddress('/restful/task/addTaskRole', {}, 'POST', data, (error, result) => {
        if (error) return callback(false, error);
        if (result && result.result !== null && result.status === 200)
            callback(true, result.result);
        else
            callback(false, result);
    });
};