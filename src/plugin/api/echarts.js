import request from "@/plugin/tools/request";

// 获取echarts数据
export const getEcharts = (params) => request.get('/service/workTable/findProgress', {params});