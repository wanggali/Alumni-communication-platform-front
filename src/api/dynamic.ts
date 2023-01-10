import request from '../plugins/myAxios';

export const addDynamicUpInfo = (data: any) => {
    return request({
        url: '/dynamic/updateByUp',
        method: 'post',
        data: data
    });
};

