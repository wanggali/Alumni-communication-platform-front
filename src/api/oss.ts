import request from '../plugins/myAxios';

export const uploadOssImg = (file:any) => {
    return request({
        url: '/oss/upload',
        method: 'post',
        data: file
    });
};
