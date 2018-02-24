/**
 * Created by Administrator on 2017/8/30 0030.
 */
import {serverAddress} from '../utils/httpRequest';

export const plan_controller = (id, callback) => {

    serverAddress('/restful/plan/detail/' + id, {}, 'GET', {}, (error, result) => {
        if (error) return callback(false, error);
        if (result && result.result !== null && result.status === 200)
            callback(true, result.result);
        else
            callback(false, result);
    });
};
