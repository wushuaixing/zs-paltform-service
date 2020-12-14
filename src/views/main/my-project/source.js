
// table 的表格头
const basCol={
	normal:[
		{
			title: '债务人名称',
			dataIndex: 'name',
			key: 'debtor',
			scopedSlots: { customRender: 'debtor' },
		},
		{
			title: '债权本金（万元）',
			dataIndex: 'money1',
			key: 'money1',
			scopedSlots: { customRender: 'amount' },
			align:'right',
		},
		{
			title: '债权利息（万元）',
			dataIndex: 'money2',
			key: 'money2',
			scopedSlots: { customRender: 'amount' },
			align:'right',
		}
	],
	guaranty:{
		title: '担保方式',
		dataIndex: 'guaranty',
		key: 'gua',
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
export const columns ={
	'ing':[
		...basCol.normal,
		basCol.guaranty,
		{
			title:'对接团队及联系方式',
			key: 'contactWay',
			scopedSlots: { customRender: 'contactWay' },
		},
		{
			title: '当前进展',
			scopedSlots: { customRender: 'advance' },
			key: 'advance',
		},
		{
			title: '更新日期',
			sorter: true,
			dataIndex: 'updateTime',
			key: 'updateTime',
		},
		basCol.auction,
	],
	'ed':[
		...basCol.normal,
		{
			title:'合同签订日期',
			dataIndex: 'signDate',
			key: 'signDate',
			sorter: true,
		},
		{
			title:'服务期限',
			key: 'deadline',
			scopedSlots: { customRender: 'deadline' },
		},
		{
			title: '目标回款金额（万元）',
			dataIndex: 'money3',
			key: 'money3',
		},
		{
			title: '本阶段计划',
			dataIndex: 'plan',
			key: 'plan',
		},
		basCol.auction,
	],
	'aba':[
		...basCol.normal,
		basCol.guaranty,
		{
			title:'放弃日期',
			dataIndex: 'abaDate',
			key: 'abaDate',
			sorter: true,
		},
		basCol.auction,
	],
	'fail':[
		...basCol.normal,
		basCol.guaranty,
		{
			title:'失效日期',
			dataIndex: 'failDate',
			key: 'failDate',
			sorter: true,
		},
		basCol.auction
	]
};
export const colType = {
	1:'ing',
	2:'ed',
	3:'aba',
	4:'fail',
}
