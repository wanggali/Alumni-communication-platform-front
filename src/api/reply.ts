import request from '../plugins/myAxios';

export const doDiscussCommentReplyUp = (data: any) => {
    return request({
        url: '/reply/updateUpNum',
        method: 'post',
        data: data
    });
};

export const addDiscussCommentReply = (data: any) => {
    return request({
        url: '/reply/addReply',
        method: 'post',
        data: data
    });
};
