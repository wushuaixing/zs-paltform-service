import CryptoJS from 'crypto-js';

/**
 * 加密字符串
 * @param str
 * @returns {PromiseLike<ArrayBuffer>}
 */
const rsaEncrypt = (str) => {
	const key = CryptoJS.enc.Utf8.parse("462F8DC4324C7641");
	const encrypted = CryptoJS.AES.encrypt(str, key, {
		mode:CryptoJS.mode.ECB,
		padding: CryptoJS.pad.Pkcs7});
	return encrypted.toString();
};

/**
 * 加密password字段
 * @param info
 * @returns {{password: (PromiseLike<ArrayBuffer>|string)}}
 */
export const encryptInfo = (info = {}) => Object.assign({},info,{
	password:info.password ? rsaEncrypt(info.password) : '',
});


//修改密码加密
export const encryptEditPwd = (info = {}) => Object.assign({},info,{
	oldPassword:info.oldPassword ? rsaEncrypt(info.oldPassword) : '',
	newPassword:info.newPassword ? rsaEncrypt(info.newPassword) : '',
});
