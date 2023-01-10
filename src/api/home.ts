import request from '../plugins/myAxios';

export const getIndexInfo = (data: any) => {
    return request({
        url: '/front/index/getIndexInfo',
        method: 'post',
        data: data
    });
};

