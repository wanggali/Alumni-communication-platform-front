import request from '../plugins/myAxios';

export const addDynamicUpInfo = (data: any) => {
    return request({
        url: '/dynamic/updateByUp',
        method: 'post',
        data: data
    });
};

export const getDynamicInfo = (data: any) => {
    return request({
        url: '/dynamic/getDynamicByPageOrParam',
        method: 'post',
        data: data
    });
};

