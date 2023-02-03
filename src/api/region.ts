import request from '../plugins/myAxios';

export const getRegionTreeInfo = () => {
    return request({
        url: '/region/getRegionTreeInfo',
        method: 'get'
    });
};
