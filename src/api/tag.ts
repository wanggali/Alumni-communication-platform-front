import request from '../plugins/myAxios';

export const getTagInfo = () => {
    return request({
        url: '/tag/showAllTag',
        method: 'get',
    });
};

