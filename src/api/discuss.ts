import request from '../plugins/myAxios';

export const addDiscussUpInfo = (data: any) => {
    return request({
        url: '/discuss/upOrDownAction',
        method: 'post',
        data: data
    });
};

export const getDiscussInfo = (data: any) => {
    return request({
        url: '/discuss/getDiscussByPageOrParam',
        method: 'post',
        data: data
    });
};

export const getDiscussInfoById = (data: any) => {
    return request({
        url: `/discuss/getDiscussInfoById/${data}`,
        method: 'get'
    });
};

