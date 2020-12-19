import request from "@/plugin/tools/request";

// 登录接口
export const authLogin = params => request.post('/service/auth/login',params);


// 发送验证码
export const authLoginCode = params => request.post('/service/auth/login/code',params);


// 发送验证码
export const authGetCaptcha = params => request.post('/service/auth/getCaptcha?phone=' + params);


// 登录前判断当前账号状态
export const accountStatus = params => request.get('/service/auth/loginPreCheckAccountStatus?phone=' + params);
