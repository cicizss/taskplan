/**
 * Created by zfp on 2017/9/16.
 */
import {serverAddress} from '../utils/httpRequest';

export const Attachment_controller = ( id, callback) => {

    serverAddress('/restful/plan/accessory/'+id, {}, 'GET', {}, (error, result) => {
        console.log(result)
        if (error) return callback(false, error);
        if (result && result.result !== null && result.status === 200)
            callback(true, result.result);
        else
            callback(false, result);
    });
};