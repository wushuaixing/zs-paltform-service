import request from "@/plugin/tools/request";

// 登录接口
export const authLogin = params => request.post('/service/auth/login',params)
