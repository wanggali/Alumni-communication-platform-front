import request from '../plugins/myAxios';

export const getOriginInfo = (data: any) => {
    return request({
        url: '/origin/GetOriginByQueryAndPage',
        method: 'post',
        data: data
    });
};

