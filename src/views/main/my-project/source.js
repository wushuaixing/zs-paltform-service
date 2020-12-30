
// table 的表格头
const basCol = {
	normal:[
		{
			title: '债务人名称',
			key: 'debtor',
			scopedSlots: { customRender: 'debtor' },
		},
		{
			title: '债权本金（万元）',
			dataIndex: 'debtCaptial',
			key: 'debtCaptial',
			scopedSlots: { customRender: 'amount' },
			align:'right',
		},
		{
			title: '债权利息（万元）',
			dataIndex: 'debtInterest',
			key: 'debtInterest',
			scopedSlots: { customRender: 'amount' },
			align:'right',
		}
	],
	guaranty:{
		title: '担保方式',
		key: 'security',
		scopedSlots: { customRender: 'security' }
	},
	auction:{
		title: '操作',
		scopedSlots: { customRender: 'auction' },
		customHeaderCell:()=>({
			style:{ paddingLeft:'16px'}
		}),
		key: 'auction',
	},
};
export const columns = {
	'ing':[
		...basCol.normal,
		basCol.guaranty,
		{
			title:'对接团队及联系方式',
			key: 'businessTeam',
			scopedSlots: { customRender: 'businessTeam' },
		},
		{
			title: '当前进展',
			scopedSlots: { customRender: 'process' },
			key: 'process',
		},
		{
			title: '更新日期',
			sorter: true,
			dataIndex: 'gmtModify',
			key: 'gmtModify',
			scopedSlots: { customRender: 'datetime' },
		},
		basCol.auction,
	],
	'ed':[
		...basCol.normal,
		{
			title:'合同签订日期',
			dataIndex: 'aggrementDate',
			key: 'aggrementDate',
			sorter: true,
			scopedSlots: { customRender: 'datetime' },
		},
		{
			title:'服务期限',
			key: 'serviceTime',
			scopedSlots: { customRender: 'serviceTime' },
		},
		{
			title: '目标回款金额（万元）',
			dataIndex: 'aimBackPrice',
			key: 'aimBackPrice',
			scopedSlots: { customRender: 'amount' },
			align:'right',
		},
		{
			title: '本阶段计划',
			key: 'dateMatters',
			scopedSlots: { customRender: 'plan' },
		},
		basCol.auction,
	],
	'aba':[
		...basCol.normal,
		basCol.guaranty,
		{
			title:'放弃日期',
			dataIndex: 'abandonDate',
			key: 'abandonDate',
			sorter: true,
			scopedSlots: { customRender: 'datetime' },
		},
		basCol.auction,
	],
	'fail':[
		...basCol.normal,
		basCol.guaranty,
		{
			title:'失效日期',
			dataIndex: 'readSubmitDeadline',
			key: 'readSubmitDeadline',
			sorter: true,
			scopedSlots: { customRender: 'datetime' },
		},
		basCol.auction
	]
};
export const colType = {
	1:'ing',
	2:'ed',
	3:'aba',
	4:'fail',
};
