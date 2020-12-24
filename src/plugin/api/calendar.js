import request from "@/plugin/tools/request";

export const getCalendar = (params) => request.get('/service/workTable/mySchedule', {params});