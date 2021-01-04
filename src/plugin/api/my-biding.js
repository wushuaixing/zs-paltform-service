import request from "@/plugin/tools/request";

// 我的竞标-进行中接口
export const amcBiding = params => request.post('/service/amcBid',params);

// 我的竞标-已中标接口
export const amcBidAimed = params => request.post('/service/amcBid/aimed',params);

// 我的竞标-已放弃接口
export const amcBidAbandon = params => request.post('/service/amcBid/abandon',params);

// 我的竞标-已失效接口
export const amcBidInvalid = params => request.post('/service/amcBid/invalid',params);

// 根据项目ID查询详情
export const amcBidDetail = (id,type) => request.get(`/service/amcBid?id=${id}&type=${type}`);

// 放弃竞标接口
export const abandonBid = params => request.delete(`/service/amcBid/${params}`);

// 进行中、已中标、已失效是否有已读标识
export const unreadInfo = () => request.get('/service/amcBid/unreadInfo');

// 未读消息点击后变更状态
export const changeUnRead = params => request.get(`/service/amcBid/changeUnRead?id=${params}`);

// 提交服务方案接口
export const submitServicePlan = params => request.post('/service/amcBid/submitServicePlan',params);

// 修改服务方案接口
export const modifyCase = params => request.post('/service/amcBid/modifyCase',params);