/**
 * Created by chenlizan on 2017/6/18.
 */

import React from 'react';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';

import App from '../App';
import Login from '../containers/Login';
import TaskList from '../containers/TaskList';
import NewPlan from '../containers/NewPlan';
import PlanDetails from '../containers/PlanDetails';
import CommentApp from '../containers/CommentApp';
import AttachmentList from '../containers/AttachmentList';
import BuildTask from '../containers/BuildTask';
import TaskDetails from '../containers/TaskDetails';
import PlanList from '../containers/PlanList';
import TaskPlan from '../containers/TaskPlan';
import TaskPerson from '../containers/TaskPerson';
import PlanAttachment from '../containers/PlanAttachment';


export const routes = (
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Login}/>
            <Route path="login" component={Login}/>
            <Route path="PlanList" component={PlanList}/>
            <Route path="TaskList" component={TaskList}/>
            <Route path="BuildTask" component={BuildTask}/>
            <Route path="NewPlan" component={NewPlan}/>
            <Route path="TaskDetails" component={TaskDetails}/>
            <Route path="AttachmentList" component={AttachmentList}/>
            <Route path="TaskPerson" component={TaskPerson}/>
            <Route path="TaskPlan" component={TaskPlan}/>
            <Route path="PlanDetails" component={PlanDetails}/>
            <Route path="PlanAttachment" component={PlanAttachment}/>
        </Route>
    </Router>
);
