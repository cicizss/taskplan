/**
 * Created by chenlizan on 2017/7/21.
 */

const request = require('request');
const {apiServerAddress, platformServerAddress, restful} = require('../config');

const httpRequest = (url, certificate = {}, method = "GET", data = {}, callback) => {
    request({
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
            "Authorization": certificate.authorization ? certificate.authorization : ''
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

exports.apiHttpRequest = (url, certificate, method, data, callback) => {

    return httpRequest(apiServerAddress + restful + url, certificate, method, data, callback);
};

exports.platformHttpRequest = (url, certificate, method, data, callback) => {

    return httpRequest(platformServerAddress + restful + url, certificate, method, data, callback);
};
