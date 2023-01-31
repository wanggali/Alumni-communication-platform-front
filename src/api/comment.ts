import request from '../plugins/myAxios';

export const addDiscussComment = (data: any) => {
    return request({
        url: '/comment/addComment',
        method: 'post',
        data: data
    });
};

export const getDiscussComment = (data: any) => {
    return request({
        url: '/comment/getCommentByPageOrParam',
        method: 'post',
        data: data
    });
};

export const doDiscussCommentUp = (data: any) => {
    return request({
        url: '/comment/updateComment',
        method: 'post',
        data: data
    });
};
