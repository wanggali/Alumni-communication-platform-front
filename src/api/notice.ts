import request from '../plugins/myAxios';

export const getNoticeInfo = (data: any) => {
    return request({
        url: '/notice/getNoticeByPage',
        method: 'post',
        data: data
    });
};

