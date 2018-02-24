/**
 * Created by Administrator on 2017/9/4 0004.
 */
import {serverAddress} from '../utils/httpRequest';

export const common_controller = (callback) => {

    serverAddress('/restful/person/personList', {}, 'POST', {}, (error, result) => {
        if (error) return callback(false, error);
        if (result && result.result !== null && result.status === 200)
            callback(true, result.result);
        else
            callback(false, result);
    });
};
