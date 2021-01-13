export const baseWidth = {
	style:{
		width:'678px',
	},
	maxLength:100,
};
export const textarea = {
	...baseWidth,
	autoSize:{ maxRows: 4,minRows: 4, },
	maxLength:1024,
};

export const formItemLayout =  {
	labelCol: { span: 6 },
	wrapperCol: { span: 18 },
};
