/**
 * Created by chenlizan on 2017/7/16.
 */

import {Router} from 'express';

import {apiHttpRequest, platformHttpRequest} from '../utils/httpRequest'

const router = Router();

export default () => {

    router.route('/restful/oauth/login')
        .post(function (req, res, next) {
            platformHttpRequest('/oauth/login', req.headers, 'POST', req.body, (error, result) => {
                res.send(result);
            });
        });

    router.route('/restful/task/myTaskList')
        .get(function (req, res, next) {
            const status = req.query.status;

            let url = '/task/myTaskList';
            if (status !== 'a' && status !== undefined) {
                url = url + '?status=' + status;
            }

            console.log(url);

            apiHttpRequest(url, req.headers, 'GET', {}, (error, result) => {
                res.send(result);
            });
        });

    router.route('/restful/task/create')
        .post(function (req, res, next) {
            debugger
            apiHttpRequest('/task/create', req.headers, 'POST', req.body, (error, result) => {
                res.send(result);
            });
        });

    router.route('/restful/task/detail/:id')
        .get(function (req, res, next) {
            const id = req.params.id;
            apiHttpRequest('/task/detail/' + id, req.headers, 'GET', {}, (error, result) => {
                res.send(result);
            });
        });
    router.route('/restful/plan/myPlanList')
        .get(function (req, res, next) {
            const {status} = req.query;
            debugger;
            apiHttpRequest('/plan/myPlanList?status=' + status, req.headers, 'GET', {}, (error, result) => {
                res.send(result);
            });
        });
    router.route('/restful/plan/detail/:id')
        .get(function (req, res, next) {
            const id = req.params.id;
            debugger;
            apiHttpRequest('/plan/detail/' + id, req.headers, 'GET', {}, (error, result) => {
                res.send(result);
            });
        });
    router.route('/restful/plan/create')
        .post(function (req, res, next) {

            debugger;
            apiHttpRequest('/plan/create', req.headers, 'POST', req.body, (error, result) => {
                res.send(result);
            });
        });
    router.route('/restful/plan/allAccessory/:id')
        .get(function (req, res, next) {
            const id = req.params.id;
            debugger;
            apiHttpRequest('/plan/allAccessory/' + id, req.headers, 'GET', {}, (error, result) => {
                res.send(result);
            })
        });
    router.route('/restful/person/personList')
        .post(function (req, res, next) {
            debugger;
            apiHttpRequest('/person/personList', req.headers, 'POST', req.body, (error, result) => {
                res.send(result);
            })
        });
    router.route('/restful/comment/create')
        .post(function (req, res, next) {
            debugger;
            apiHttpRequest('/comment/create', req.headers, 'POST', req.body, (error, result) => {
                res.send(result);
            })
        });
    router.route('/restful/plan/taskPlan/:id')

        .get(function (req, res, next) {
            const id = req.params.id;
            debugger;
            apiHttpRequest('/plan/taskPlan/' + id, req.headers, 'GET', {}, (error, result) => {
                res.send(result);
            })
        });
    router.route('/restful/plan/taskPeoplePlanList')
        .get(function (req, res, next) {
            const {taskId, userId} = req.query;
            debugger;
            apiHttpRequest('/plan/taskPeoplePlanList?taskId=' + taskId + '&userId=' + userId, req.headers, 'GET', {}, (error, result) => {
                res.send(result);
            })
        });
    router.route('/restful/task/taskExecutorList/:id')

        .get(function (req, res, next) {
            const id = req.params.id;
            debugger;
            apiHttpRequest('/task/taskExecutorList/' + id, req.headers, 'GET', {}, (error, result) => {
                res.send(result);
            })
        });
    router.route('/restful/plan/accessory/:id')

        .get(function (req, res, next) {
            const id = req.params.id;
            debugger;
            apiHttpRequest('/plan/accessory/' + id, req.headers, 'GET', {}, (error, result) => {
                res.send(result);
            })
        });

    router.route('/restful/task/deleteTaskRole')
        .post(function (req, res, next) {
            debugger
            apiHttpRequest('/task/deleteTaskRole', req.headers, 'POST', req.body, (error, result) => {
                res.send(result);
            })
        });

    router.route('/restful/plan/checkPlan')
        .post(function (req, res, next) {
            debugger;
            apiHttpRequest('/plan/checkPlan', req.headers, 'POST', req.body, (error, result) => {
                res.send(result);
            })
        });
    router.route('/restful/task/change/')
        .post(function (req, res, next) {
            const {id, status} = req.body;
            debugger;
            apiHttpRequest('/task/change/' + id, req.headers, 'POST', {status}, (error, result) => {
                res.send(result);
            })
        })
    router.route('/restful/task/updateTask')
        .post(function (req, res, next) {
            debugger;
            apiHttpRequest('/task/updateTask', req.headers, 'POST', req.body, (error, result) => {
                res.send(result);
            })
        });
    router.route('/restful/task/addTaskRole')
        .post(function (req, res, next) {
            debugger;
            apiHttpRequest('/task/addTaskRole', req.headers, 'POST', req.body, (error, result) => {
                res.send(result);
            })
        });
    router.route('/restful/plan/updatePlan')
        .post(function (req, res, next) {
            debugger;
            apiHttpRequest('/plan/updatePlan', req.headers, 'POST', req.body, (error, result) => {
                res.send(result);
            });
        });
    router.route('/restful/plan/deletePlanAcc/:id')
        .post(function (req, res, next) {
            const id = req.params.id;
            console.log(id)
            debugger;
            apiHttpRequest('/plan/deletePlanAcc/'+id, req.headers, 'POST', req.body, (error, result) => {
                res.send(result);
            });
        });
    router.route('/restful/plan/deleteAllAcc')
        .post(function(req,res,next){
            debugger;
            apiHttpRequest('/plan/deleteAllAcc',req.headers,'POST',req.body,(error,result)=>{
                res.send(result);
            })
        });
    return router;

}

