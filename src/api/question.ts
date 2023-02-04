import request from '../plugins/myAxios';

export const getQuestionInfo = (data: any) => {
    return request({
        url: '/question/getQuestionByPage',
        method: 'post',
        data: data
    });
};

export const getQuestionInfoById = (data: any) => {
    return request({
        url: `/question/getQuestionInfoById/${data}`,
        method: 'get',
    });
};

export const addQuestionInfo = (data: any) => {
    return request({
        url: '/question/addQuestion',
        method: 'post',
        data: data
    });
};


