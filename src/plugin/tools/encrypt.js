import {JSEncrypt} from 'jsencrypt';

/**
 * 加密字符串
 * @param str
 * @returns {PromiseLike<ArrayBuffer>}
 */
const rsaEncrypt = (str) => {
	const publicKey = `MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDle/hFqi80v633AqkjnkZPzVu2
waST+cNVe1gEcDNq6tifFpjjyfXXAEtXD8pAAv6zl0nuFFT9CSOPuAq0kdUc70vT
1jxTMkK0H9iZ74pN4zTu1gsG+RrIcMHKjFFsBrF/D2dI4TJ4ZjMhcxcXuTsNHJ0q
H5e2bLq6VSELhY5PzQIDAQAB`;
	const encrypt = new JSEncrypt();
	encrypt.setPublicKey(publicKey);
	return encrypt.encrypt(str);
};

/**
 * 加密password字段
 * @param info
 * @returns {{password: (PromiseLike<ArrayBuffer>|string)}}
 */
const encryptInfo = (info = {}) => Object.assign({},info,{
	password:info.password ? rsaEncrypt(info.password) : '',
})
export default encryptInfo;
