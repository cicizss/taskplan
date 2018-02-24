/**
 * Created by Administrator on 2017/9/20 0020.
 */
import {serverAddress} from '../utils/httpRequest';

export const TaskChange_controller = (data,callback) => {
    serverAddress('/restful/task/change', {}, 'POST', data, (error, result) => {

        if (error) return callback(false, error);
        if (result && result.result !== null && result.status === 200)
            callback(true, result.result);
        else
            callback(false, result);
    });
};