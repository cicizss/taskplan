/**
 * Created by chenlizan on 2017/7/4.
 */

import React from 'react';
import {renderToString} from 'react-dom/server';
import {Provider} from 'react-redux';
import {match, RouterContext} from 'react-router';
import {fromJS} from 'immutable';
import {routes} from '../../common/routes/index';
import {configureStore} from '../../common/store/index';
import Login from '../../common/reducers/Login';
import TaskList from '../../common/reducers/TaskList';
import NewPlan from '../../common/reducers/NewPlan';
import PlanDetails from '../../common/reducers/PlanDetails';

import Comment from '../../common/reducers/Comment';
import AttachmentList from '../../common/reducers/AttachmentList';
import BuildTask from '../../common/reducers/BuildTask';
import Myreceive from '../../common/reducers/MyReceive';
import TaskDetails from '../../common/reducers/TaskDetails';
import PlanList from '../../common/reducers/PlanList';
import TaskPlan from'../../common/reducers/TaskPlan';
import MyCreate from '../../common/reducers/MyCreate';
import TaskPerson from '../../common/reducers/TaskPerson';
import PlanAttachment from '../../common/reducers/PlanAttachment'
const index = (process.env.NODE_ENV === 'development') ? 'dev/index' : 'prod/index';

const initState = fromJS({
    Login: Login.initState,
    TaskList:TaskList.initState,
    NewPlan:NewPlan.initState,
    PlanDetails:PlanDetails.initState,
    Comment: Comment.initState,
    AttachmentList:AttachmentList.initState,
    BuildTask:BuildTask.initState,
    MyReceive:Myreceive.initState,
    TaskDetails:TaskDetails.initState,
    PlanList:PlanList.initState,
    TaskPlan:TaskPlan.initState,
    MyCreate:MyCreate.initState,
    TaskPerson:TaskPerson.initState,
    PLanAttachment:PlanAttachment.initState,
});

const store = configureStore(initState);

const reactRender = (req, res, next) => {
    let _renderProps;

    match({routes, location: req.originalUrl}, (error, redirectLocation, renderProps) => {
        _renderProps = renderProps;

        if (_renderProps) {
            res.render('index', {
                root: renderToString(
                    <Provider store={store}>
                        <RouterContext {..._renderProps}/>
                    </Provider>
                ),
                state: store.getState()
            });
        } else {
            next();
        }
    });

}

export default reactRender;