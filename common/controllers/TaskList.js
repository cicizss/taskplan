/**
 * Created by Administrator on 2017/8/24 0024.
 */

import {serverAddress} from '../utils/httpRequest';

export const test_controller = (status, callback) => {
    let url = '/restful/task/myTaskList';
    if (status !== 'a') {
        url = url + '?status=' + status;
    }
    serverAddress(url, {}, 'GET', {}, (error, result) => {
        if (error) return callback(false, error);
        if (result && result.result !== null && result.status === 200)
            callback(true, result.result);
        else
            callback(false, result);
    });
};




















