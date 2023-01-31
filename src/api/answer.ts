import request from '../plugins/myAxios';

export const getAnswerInfo = (data: any) => {
    return request({
        url: '/answer/getAnswerByPageOrParam',
        method: 'post',
        data: data
    });
};

export const addAnswerInfo = (data: any) => {
    return request({
        url: '/answer/addAnswer',
        method: 'post',
        data: data
    });
};

export const updateAnswerInfo = (data: any) => {
    return request({
        url: '/answer/updateAnswer',
        method: 'post',
        data: data
    });
};
