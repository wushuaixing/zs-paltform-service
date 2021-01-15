
export const columns = ({ type = 1, sortOrder }) => {
	const basCol = {
		normal: [
			{
				title: '债务人名称',
				key: 'debtor',
				ellipsis:true,
				customHeaderCell: () => ({
					style: { paddingLeft:'20px' }
				}),
				scopedSlots: { customRender: 'debtor' },
			},
			{
				title: '债权本金（万元）',
				dataIndex: 'debtCaptial',
				key: 'debtCaptial',
				scopedSlots: { customRender: 'amount' },
			},
			{
				title: '债权利息（万元）',
				dataIndex: 'debtInterest',
				key: 'debtInterest',
				scopedSlots: { customRender: 'amount' },
			}
		],
		guaranty: {
			title: '担保方式',
			key: 'security',
			scopedSlots: { customRender: 'security' }
		},
		auction: {
			title: '操作',
			width:'15%',
			customHeaderCell: () => ({
				style: { paddingLeft:'16px' }
			}),
			scopedSlots: { customRender: 'auction' },
			key: 'auction',
		},
	};
	if (type === 1) {
		return [
			...basCol.normal,
			basCol.guaranty,
			{
				title: '对接团队及联系方式',
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
				sortOrder: sortOrder || false,
				dataIndex: 'gmtModify',
				key: 'gmtModify',
				scopedSlots: { customRender: 'datetime' },
			},
			basCol.auction,
		]
	}
	if (type === 2) {
		return [
			...basCol.normal,
			{
				title: '合同签订日期',
				dataIndex: 'aggrementDate',
				key: 'aggrementDate',
				sorter: true,
				sortOrder: sortOrder || false,
				scopedSlots: { customRender: 'datetime' },
			},
			{
				title: '服务期限',
				key: 'serviceTime',
				scopedSlots: { customRender: 'serviceTime' },
			},
			{
				title: '目标回款金额（万元）',
				dataIndex: 'aimBackPrice',
				key: 'aimBackPrice',
				scopedSlots: { customRender: 'amount' },
			},
			{
				title: '本阶段计划',
				key: 'dateMatters',
				scopedSlots: { customRender: 'plan' },
			},
			basCol.auction,
		]
	}
	if (type === 3) {
		return [
			...basCol.normal,
			basCol.guaranty,
			{
				title: '放弃日期',
				dataIndex: 'abandonDate',
				key: 'abandonDate',
				sorter: true,
				sortOrder: sortOrder || false,
				scopedSlots: { customRender: 'datetime' },
			},
			basCol.auction,
		]
	}
	if (type === 4) {
		return [
			...basCol.normal,
			basCol.guaranty,
			{
				title: '失效日期',
				dataIndex: 'invalidDate',
				key: 'invalidDate',
				sorter: true,
				sortOrder: sortOrder || false,
				scopedSlots: { customRender: 'datetime' },
			},
			basCol.auction
		]
	}
}