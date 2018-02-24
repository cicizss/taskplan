/**
 * Created by chenlizan on 2017/6/21.
 */

export const save_login_info_creator = (data) => {
    return {type: 'SAVE_LOGIN_INFO', account: data};
}

export const save_Task_List_creator = (data) => {
    return {type: 'SAVE_TASK_LIST', task: data};
}

export const save_New_Plan_creator = (data) => {
    return {type: 'SAVE_NEW_PLAN', plan: data};
}

export const plan_Details_creator = (data) => {
    return {type: 'PLAN_DETAILS', details: data};
}

export const initComments = (comments) => {
    return {type: 'INIT_COMMENTS', comments};
}

export const addComment = (comment) => {
    return {type: 'ADD_COMMENT', comment};
}

export const deleteComment = (commentIndex) => {
    return {type: 'DELETE_COMMENT', commentIndex};
}

export const Attachment_List = (data) => {
    return {type: 'ATTACHMENT_LIST', list: data};
}

export const Build_List = (data) => {
    return {type: 'BUILD_LIST', build: data};
}

export const Use_Responsible = (data) => {
    return {type: 'USE_COMMON', common: data};
}

export const My_Receive = (data) => {
    return {type: 'MY_RECEIVE', receive: data};
}

export const Task_Details = (data) => {
    return {type: 'TASK_DETAILS', use: data};
}

export const Current_Input = (data) => {
    return {type: 'CURRENT_INPUT', currentInput: data};
}

export const Plan_list = (data) => {
    return {type: 'PLAN_LIST', select: data}
}

export const Task_Plan = (data) => {
    return {type: 'TASK_PLAN', more: data}
}

export const My_Create = (data) => {
    return {type: 'MY_CREATE', create: data};
}

export const Task_Person = (data) => {
    return {type: 'TASK_PERSON', person: data};
}

export const Comment_Input = (data) => {
    return {type: 'COMMENT_INPUT', comment: data};
}
export const PLan_Attachment = (data) => {
    return {type: 'PLAN_ATTACHMENT', attachment: data};
}