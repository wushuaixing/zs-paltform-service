export const clearProto = obj => {
	let _obj = {};
	Object.keys(obj).forEach(i=>_obj[i]=obj[i]);
	return _obj;
};

export const disabledDate = (startValue,endValue,type)=> {
	if (!startValue || !endValue) return false;
	const startVal = startValue.valueOf();
	const endVal = endValue.valueOf();
	return type === 'start' ? startVal > endVal: startVal >= endVal;
};
