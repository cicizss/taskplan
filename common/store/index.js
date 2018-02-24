/**
 * Created by chenlizan on 2017/6/18.
 */

import {applyMiddleware, createStore, combineReducers, compose} from 'redux';
import {persistStore, autoRehydrate} from 'redux-persist'
import thunk from 'redux-thunk';
import Login from '../reducers/Login';
import TaskList from '../reducers/TaskList';
import NewPlan from '../reducers/NewPlan';
import PlanDetails from '../reducers/PlanDetails';
import Comment from  '../reducers/Comment';
import AttachmentList from '../reducers/AttachmentList';
import BuildTask from '../reducers/BuildTask';
import UseCommon from '../reducers/UseCommon';
import MyReceive from '../reducers/MyReceive';
import TaskDetails from '../reducers/TaskDetails';
import PlanList from '../reducers/PlanList';
import TaskPlan from '../reducers/TaskPlan';
import MyCreate from '../reducers/MyCreate';
import TaskPerson from '../reducers/TaskPerson';

const initState = {
    Login: Login.initState,
    TaskList: TaskList.initState,
    NewPlan: TaskList.initState,
    PlanDetails: PlanDetails.initState,
    Comment: Comment.initState,
    AttachmentList: AttachmentList.initState,
    BuildTask: BuildTask.initState,
    UseCommon: UseCommon.initState,
    MyReceive: MyReceive.initState,
    TaskDetails: TaskDetails.initState,
    PlanList: PlanList.initState,
    TaskPlan: TaskPlan.initState,
    MyCreate: MyCreate.initState,
    TaskPerson: TaskPerson.initState
};

const reducers = {
    Login: Login.reducer,
    TaskList: TaskList.reducer,
    NewPlan: NewPlan.reducer,
    PlanDetails: PlanDetails.reducer,
    Comment: Comment.reducer,
    AttachmentList: AttachmentList.reducer,
    BuildTask: BuildTask.reducer,
    UseCommon: UseCommon.reducer,
    MyReceive: MyReceive.reducer,
    TaskDetails: TaskDetails.reducer,
    PlanList: PlanList.reducer,
    TaskList: TaskPlan.reducer,
    MyCreate: MyCreate.reducer,
    TaskPerson: TaskPerson.reducer
};

export const configureStore = (preloadState) => {
    const store = createStore(
        combineReducers(reducers),
        preloadState || initState,
        compose(applyMiddleware(thunk),
            // autoRehydrate()
        )
    );
    // persistStore(store);
    return store
};
