import request from '@/plugin/tools/request';

// 原手机号发送验证码接口
export const oldPhoneCode = params => request.post(`/service/amcServiceUser/verifyPhone/code?phone=${params}`);

//验证原手机号接口
export const verifyOldPhone = (code,phone) => request.post(`/service/amcServiceUser/verifyPhone?code=${code}&phone=${phone}`);

//新手机号发送验证码接口
export const newPhoneCode = params => request.post(`/service/amcServiceUser/bindPhone/code?phone=${params}`);

//绑定新手机号接口
export const bindNewPhone = (code,phone) => request.post(`/service/amcServiceUser/bindPhone?code=${code}&phone=${phone}`);

//修改或设置密码接口
export const editPassword = params => request.post('/service/amcServiceUser/editPassword',params);
