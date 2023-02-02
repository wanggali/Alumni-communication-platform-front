import request from '../plugins/myAxios';


export const getPushInfo = (data: any) => {
    return request({
        url: '/push/getPushInfoByPageOrParam',
        method: 'post',
        data: data
    });
};

export const addDoPushInfo = (data: any) => {
    return request({
        url: '/push/addPush',
        method: 'post',
        data: data
    });
};

