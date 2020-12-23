export const columns = [
	{
		title: '债务人名称',
		dataIndex: 'name',
		key: 'name',
	},
	{
		title: '债权本金（万元）',
		dataIndex: 'money1',
		key: 'money1',
		scopedSlots: {customRender: 'amount'},
		align: 'right',
	},
	{
		title: '债权利息（万元）',
		dataIndex: 'money2',
		key: 'money2',
		scopedSlots: {customRender: 'amount'},
		align: 'right',
	},
	{
		title: '担保方式',
		dataIndex: 'guaranty',
		key: 'guaranty',
	},
	{
		title: '抵质押物类型',
		key: 'type',
		scopedSlots: {customRender: 'type'},
	},
	{
		title: '抵质押物分布区域',
		key: 'area',
		scopedSlots: {customRender: 'area'},
	},
	{
		title: '报名截止日期',
		dataIndex: 'endDate',
		key: 'endDate',
		scopedSlots: {customRender: 'endDate'},
	},
	{
		title: '操作',
		scopedSlots: {customRender: 'auction'},
		key: 'auction',
	},
];

export const msgInfoColumns = [
	{
		title: '序号',
		dataIndex: 'number',
		key: 'number',
	},
	{
		title: '抵押物类型',
		key: 'type',
		scopedSlots: {customRender: 'type'},
	},
	{
		title: '抵押物名称',
		key: 'msgsName',
		dataIndex: 'msgsName',
	},
	{
		title: '抵押物所在地',
		dataIndex: 'area',
		key: 'area',
	},
];

/*抵质押物类型*/
export const MSGS_TYPE = {
	0: '住宅',
	1: '商业用房',
	2: '工业用房',
	3: '土地',
	4: '机械设备',
	5: '在建工程',
	6: '股权',
	7: '林权',
	8: '矿权',
	9: '船舶',
	10: '其它',
};
