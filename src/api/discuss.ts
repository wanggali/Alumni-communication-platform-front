import request from '../plugins/myAxios';

export const addDiscussUpInfo = (data: any) => {
    return request({
        url: '/discuss/upOrDownAction',
        method: 'post',
        data: data
    });
};

