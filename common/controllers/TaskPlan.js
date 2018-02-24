/**
 * Created by Administrator on 2017/9/14 0014.
 */
import {serverAddress} from '../utils/httpRequest';

export const list_controller = (id,callback) => {

    serverAddress('/restful/plan/taskPlan/'+id,{}, 'GET', {}, (error, result) => {
        if (error) return callback(false, error);
        if (result && result.result !== null && result.status === 200)
            callback(true, result.result);
        else
            callback(false, result);
    });
};

