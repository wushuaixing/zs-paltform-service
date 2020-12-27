import {area} from "@/assets/area";

/**
 * 清空原型链内容
 * @param obj
 * @returns {{}}
 */

export const clearProto = obj => {
	let _obj = {};
	Object.keys(obj).forEach(i => _obj[i] = obj[i]);
	return _obj;
};

/**
 * antd DataPick组件，前后联动
 * @param startValue
 * @param endValue
 * @param type
 * @returns {boolean}
 */
export const disabledDate = (startValue, endValue, type) => {
	if (!startValue || !endValue) return false;
	const startVal = startValue.valueOf();
	const endVal = endValue.valueOf();
	return type === 'start' ? startVal > endVal : startVal >= endVal;
};

/**
 * 获取随机字符串
 * @param l {number}
 * @returns {string}
 */
export const ranStr = (l = 4) => {
	const len = l || 32;
	const $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
	/** **默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1*** */
	const maxPos = $chars.length;
	let pwd = '';
	for (let i = 0; i < len; i += 1) {
		pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
	}
	return `_${pwd}`;
};

/**
 * 过滤对象中的空属性
 * @param obj
 * @returns obj
 */
export const removeObjectNullVal = (obj) => {
	const newObj = {};
	Object.keys(obj).forEach((key) => {
		const value = obj[key];
		if (value !== '' && value !== undefined && value !== null) {
			newObj[key] = value;
		}
	});
	return newObj;
};

/**
 * 获取fileList
 * @param str
 */
export const fileListRule = (str)=>{
	if(!str) return [];
	const source = str.split(';');
	if(source.length) return source.map(i=>({
		uid: ranStr(8),
		status: 'done',
		name:i,
		url: i,
	}))
};

export const getArea = (provinceCode, cityCode, areaCode) => {
	console.log(provinceCode, cityCode, areaCode, area)
};
