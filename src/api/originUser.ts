import request from '../plugins/myAxios';

export const addOriginUserInfo = (data: any) => {
    return request({
        url: '/originUser/addOriginUser',
        method: 'post',
        data: data
    });
};

export const getOriginUserInfo = (data: any) => {
    return request({
        url: '/originUser/getOriginUsers',
        method: 'post',
        data: data
    });
};
