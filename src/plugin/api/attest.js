import request from "@/plugin/tools/request";

const qualifies = {
	// 律师资质查询
	lawyer:()=>request.get('/service/amcQualify/lawyer'),

	// 记录表律师资质查询
	lawyerLog:()=>request.get('/service/amcQualify/lawyer/log'),

	// 添加律师资质认证
	lawyerAdd:params=>request.post('/service/amcQualify/lawyer/add',params),

	// 机构资质查询
	organ:()=>request.get('/service/amcQualify/organization'),

	// 记录表机构资质查询
	organLog:()=>request.get('/service/amcQualify/organization/log'),

	// 添加机构资质认证
	organAdd:params=>request.post('/service/amcQualify/organization/add',params),

	// 放弃修改
	dropModify:()=>request.put('/service/amcQualify/dropModify'),
};

const factor = {
	// 律师要素查询
	lawyer:()=>request.get('/service/amcElement/lawyer'),

	// 记录表律师要素查询
	lawyerLog:()=>request.get('/service/amcElement/lawyer/log'),

	// 添加律师要素认证
	lawyerAdd:params=>request.post('/service/amcElement/lawyer/add',params),

	// 机构要素查询
	organ:()=>request.get('/service/amcElement/organization'),

	// 记录表机构要素查询
	organLog:()=>request.get('/service/amcElement/organization/log'),

	// 添加机构要素认证
	organAdd:params=>request.post('/service/amcElement/organization/add',params),

	// 放弃修改
	dropModify:()=>request.put('/service/amcElement/dropModify'),

	// 推迟更新日期
	delayUpdate:()=>request.put('/service/amcElement/dropModify'),

};

export { qualifies, factor };
