/**
 * Created by Administrator on 2017/9/1 0001.
 */
import {serverAddress} from '../utils/httpRequest';

export const AttachmentList_controller = (id,callback) => {

    const { userId,taskId } = id;
    console.log( userId + ' ' +taskId )
    let params = '';
    if(userId){
        params='?userId='+ userId;
    }
//
    serverAddress('/restful/plan/allAccessory/'+taskId + params, {}, 'GET', {}, (error, result) => {
        if (error) return callback(false, error);
        if (result && result.result !== null && result.status === 200)
            callback(true, result.result);
        else
            callback(false, result);
    });
};
