import request from "@/plugin/tools/request";

// 获取token 信息
export const getInfo = params => request.post('/service/amcServiceUser/getUserInfo',params);

// 获取上传凭证 - 七牛
export const getUploadToken = () => request.post('/file/getAuthToken');

// 获取下载凭证 - 七牛
export const getDownLoadToken = fileKey => request.post(`/file/downLoadToken?fileKey=${fileKey}`);
