import request from "@/plugin/tools/request";
// 获取日历事件数据
export const getCalendar = params => request.get('/service/workTable/mySchedule', {params});

// 获取待办事项的数据
export const getTODoList = () => request.get('/service/workTable');