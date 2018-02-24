/**
 * Created by chenlizan on 2017/7/21.
 */

const request = require('request');

const httpRequest = (url, certificate = {}, method = "GET", data = {}, callback) => {
    const token = (typeof localStorage === 'object') ? localStorage.getItem('token') : '';
    // console.log(token);
    request({
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            "Authorization": token ? 'Bearer ' + token : ''
        },
        url: url,
        method: method,
        body: data,
        json: true
    }, function (error, response, body) {
        if (error) {//网络错误，api无法连接
            let error = {};
            error.code = 500;//区分api返回的500错误
            error.status = 500001;
            error.error = true;
            error.message = '系统错误，请稍后重试！';
            callback(error, null);
        }
        else {//非网络错误，api逻辑或者程序报错
            if (response.statusCode === 200) {
                callback(null, body);
            }
            else {
                let error = {};
                error.body = response.body;
                error.error = true;
                error.message = response.statusMessage;
                error.status = response.statusCode;
                callback(error, null);
            }
        }
    });
};

exports.serverAddress = (url, certificate, method, data, callback) => {
    const origin = (typeof window === 'object') ? window.location.origin : '';
    return httpRequest(origin + url, certificate, method, data, callback);
};
