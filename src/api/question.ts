import request from '../plugins/myAxios';

export const getQuestionInfo = (data: any) => {
    return request({
        url: '/question/getQuestionByPage',
        method: 'post',
        data: data
    });
};

