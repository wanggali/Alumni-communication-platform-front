import request from '../plugins/myAxios';

export const getBannerInfo = (data: any) => {
    return request({
        url: '/banner/getBannerByPage',
        method: 'post',
        data: data
    });
};

