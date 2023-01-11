import request from '../plugins/myAxios';

export const getCollegeInfo = (data: any) => {
    return request({
        url: '/college/ShowAllCollegeByPage',
        method: 'post',
        data: data
    });
};

