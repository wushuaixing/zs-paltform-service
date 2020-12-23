import request from '@/plugin/tools/request';

// 原手机号发送验证码接口
export const oldPhoneCode = params => request.post(`/amcServiceUser/verifyPhone/code?phone=${params}`)

//验证原手机号接口
export const verifyOldPhone = params => request.post('/amcServiceUser/verifyPhone', params)

//新手机号发送验证码接口
export const newPhoneCode = params => request.post(`/amcServiceUser/bindPhone/code?phone=${params}`)

//绑定新手机号接口
export const bindNewPhone = params => request.post('/amcServiceUser/bindPhone',params)

//修改或设置密码接口
export const editPassword = params => request.post('/amcServiceUser/editPassword',params)
