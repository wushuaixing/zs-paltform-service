export const areaOption = [
	{
		value: 'zhejiang',
		label: 'Zhejiang',
		children: [
			{
				value: 'hangzhou',
				label: 'Hangzhou',
				children: [
					{
						value: 'xihu1',
						label: 'West Lake1',
					},
					{
						value: 'xihu2',
						label: 'West Lake2',
					},
				],
			},
		],
	},
	{
		value: 'jiangsu',
		label: 'Jiangsu',
		children: [
			{
				value: 'nanjing',
				label: 'Nanjing',
				children: [
					{
						value: 'zhonghuamen',
						label: 'Zhong Hua Men',
					},
				],
			},
		],
	},
];
// 擅长业务类型
export const orgAdvType = [
	{ id: 1, label: '工业', value: 'Apple' },
	{ id: 2, label: '商业', value: 'Pear' },
	{ id: 3, label: '住宅', value: 'Orange' },
	{ id: 0, label: '其他', value: 'else' },
];
// 从业不良时间经验
export const expOption = [
	{ id: 2, label: '1年以内', value: '2' },
	{ id: 3, label: '1-3年', value: '3' },
	{ id: 1, label: '3年以上', value: '4' },
	{ id: 4, label: '暂未有实际项目落地', value: '1' },
];
// 历史合作四大
export const hisFour = [
	{ id: 1, label: '东方', value: '1' },
	{ id: 2, label: '长城', value: '2' },
	{ id: 3, label: '华融', value: '3' },
	{ id: 4, label: '信达', value: '4' },
];
// 过往合作类型
export const hisCoo = [
	{ id: 1, label: '配资收购', value: '1' },
	{ id: 2, label: '资产包收购', value: '2' },
	{ id: 3, label: '债权清收', value: '3' },
	{ id: 4, label: '其他（投行等）', value: '4' },
];
// 后续期望合作方向 - 合作意向
export const cooIntent = [
	{ id: 1, label: '清收', value: '1' },
	{ id: 2, label: '跟投', value: '2' },
	{ id: 3, label: '介绍投资人', value: '3' },
	{ id: 0, label: '其他', value: '4' },
];

// 律所信息 - 担任职务
export const lawDuty = [
	{ id: 1, label: '主任', value: '1' },
	{ id: 2, label: '合伙人', value: '2' },
	{ id: 3, label: '律师', value: '3' },
	{ id: 0, label: '其他', value: '4' },
];

// 律所信息 - 担任职务
export const lawType = [
	{ id: 1, label: '公司制', value: '1' },
	{ id: 2, label: '合伙制', value: '2' },
];
