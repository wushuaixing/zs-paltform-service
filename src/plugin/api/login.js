import request from "@/plugin/tools/request";

// 登录接口
export const login = params => request.post('/service/auth/login',params);

// 注册接口
export const register = params => request.post('/service/auth/register',params);

// 登录前判断当前账号状态
export const accountStatus = params => request.get('/service/auth/loginPreCheckAccountStatus',{params});

// 获取手机验证码-登录
export const loginCode = params => request.get('/service/auth/login/code', { params });

// 获取手机验证码-注册
export const registerCode = params => request.get('/service/auth/login/code', { params });

// 获取图片验证码
export const getCaptcha = params => request.post('/service/auth/getCaptcha','',{ params });

// 退出登录
export const logout = () => request.post('/service/auth/logout' );

