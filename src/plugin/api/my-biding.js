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
export const amcBidDetail = params => request.get(`/service/amcBid?id=${params}`);