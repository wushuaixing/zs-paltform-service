/**
 * 清空原型链内容
 * @param obj
 * @returns {{}}
 */

export const clearProto = obj => {
	let _obj = {};
	Object.keys(obj).forEach(i=>_obj[i]=obj[i]);
	return _obj;
};

/**
 * antd DataPick组件，前后联动
 * @param startValue
 * @param endValue
 * @param type
 * @returns {boolean}
 */
export const disabledDate = (startValue,endValue,type)=> {
	if (!startValue || !endValue) return false;
	const startVal = startValue.valueOf();
	const endVal = endValue.valueOf();
	return type === 'start' ? startVal > endVal: startVal >= endVal;
};

/**
 * 获取随机字符串
 * @param l {number}
 * @returns {string}
 */
export const ranStr = (l = 4) => {
	const len = l || 32;
	const $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'; /** **默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1*** */
	const maxPos = $chars.length;
	let pwd = '';
	for (let i = 0; i < len; i += 1) {
		pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
	}
	return `_${pwd}`;
};
