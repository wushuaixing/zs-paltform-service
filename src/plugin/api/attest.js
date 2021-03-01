import request from "@/plugin/tools/request";

const qualifies = {
	// 资质查询
	qualify:()=>request.get('/service/amcQualify/qualify'),

	// 律师资质查询
	lawyer:()=>request.get('/service/amcQualify/lawyer'),

	// 记录表律师资质查询
	lawyerLog:()=>request.get('/service/amcQualify/lawyer/log'),

	// 添加律师资质认证
	lawyerAdd:params=>request.post('/service/amcQualify/lawyer/add',params),

	// 机构资质查询
	org:()=>request.get('/service/amcQualify/organization'),

	// 记录表机构资质查询
	orgLog:()=>request.get('/service/amcQualify/organization/log'),

	// 添加机构资质认证
	orgAdd: params=>request.post('/service/amcQualify/organization/add',params),

	// 放弃修改
	dropModify:()=>request.put('/service/amcQualify/dropModify'),

	// 修改联系人名称
	modifyContact: params => request.post('/service/amcQualify/modifyContact?contact=' + (params || '')),

};

const factor = {
	// 要素查询
	element:()=>request.get('/service/amcElement/element'),

	// 律师要素查询
	lawyer:()=>request.get('/service/amcElement/lawyer'),

	// 记录表律师要素查询
	lawyerLog:()=>request.get('/service/amcElement/lawyer/log'),

	// 添加律师要素认证
	lawyerAdd:params=>request.post('/service/amcElement/lawyer/add',params),

	// 添加律师要素认证
	officeAdd:params=>request.post('/service/amcElement/lawyer/addOffice',params),

	// 机构要素查询
	org:()=>request.get('/service/amcElement/organization'),

	// 记录表机构要素查询
	orgLog:()=>request.get('/service/amcElement/organization/log'),

	// 添加机构要素认证
	orgAdd:params=>request.post('/service/amcElement/organization/add',params),

	// 放弃修改
	dropModify:()=>request.put('/service/amcElement/dropModify'),

	// 推迟更新日期
	delayUpdate:()=>request.put('/service/amcElement/delayUpdate'),

};

const perfectInfo = {
	// 查询基本信息
	info:(identity)=>request.all( identity === 1 ?
		[factor.lawyerLog(),qualifies.lawyerLog()] : [factor.orgLog(),qualifies.orgLog()]
	).then(([res1,res2])=>{
		if((res1.code === 20000 || res1.code === 80001) && (res2.code === 20000 || res2.code === 80001) ){
			return {
				code: 20000,
				data:{
					_factor:res1.data || {},
					_qualify:res2.data || {},
				}
			}
		}
		return {
			code: 20001,
			message:'网络请求错误！'
		}
	}),

	// 机构完善开户信息
	org:params=>request.post('/service/amcServiceUser/completeOrgInfo',params),

	// 律师完善开户信息
	lawyer:params=>request.post('/service/amcServiceUser/completeLawyerInfo',params),
};


export { qualifies, factor, perfectInfo };
