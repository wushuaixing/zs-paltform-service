import request from "@/plugin/tools/request";

export const amcProjectListApi = params => request.post('/service/amcProject',params);

export const signUpApi = id => request.post(`/service/amcProject/checkin/${id}`);