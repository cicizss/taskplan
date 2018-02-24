/**
 * Created by Administrator on 2017/8/31 0031.
 */

import {serverAddress} from '../utils/httpRequest';

export const create_controller = ( data, callback) => {

    serverAddress('/restful/plan/create', {}, 'POST', data, (error, result) => {
        console.log(result)
        if (error) return callback(false, error);
        if (result && result.result !== null && result.status === 200)
            callback(true, result.result);
        else
            callback(false, result);
    });
};
