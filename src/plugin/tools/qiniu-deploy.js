import {getDownLoadToken, getUploadToken} from "@/plugin/api/base";
import {message} from "ant-design-vue";

const action = 'https://up.qiniup.com/';

let uploadToken = '';

/**
 * 上传文件时，请求uploadToken
 * @param e
 * @returns {*|Promise<void>|PromiseLike<T>|Promise<T>}
 */
const beforeUpload = (e) => {
	// console.log('beforeUpload',e.size);
	const isLimit16M = (e || {}).size / 1024 / 1024 <= 16;
	if(!isLimit16M) {
		message.error('文件大小不能超过16M!');
		return Promise.reject();
	}
	return getUploadToken().then(res=>{
		if(res.code === 20000) {
			uploadToken = res.data;
			return e;
		}else{
			message.error('获取上传凭证失败!');
			return Promise.reject()
		}
	});
};

/**
 * 点击预览时的方法
 * @param file
 * @returns {Promise<*>}
 */
const preview = file =>{
	const { status, response = {} } = file;
	if(status !== 'done') {
		message.error('该文件不支持预览');
	}else{
		// console.log(file);
		if(file.viewUrl) return window.open(file.viewUrl);
		const fileKey = response.hash ? response.hash : file.hash;
		getDownLoadToken(encodeURIComponent(fileKey)).then(res=>{
			if(res.code === 20000) {
				file.viewUrl = res.data;
				window.open(file.viewUrl);
			}
		});
	}
};

/**
 * event返回事件
 * @param e
 * @returns {*}
 */
export const getValueFromEvent = e =>{
	// console.log('Upload event:', e);
	if (Array.isArray(e)) {
		return e;
	}
	if(e.file.status === 'error'){
		message.error('文件上传失败！');
	}
	return e && e.fileList;
};

/**
 * 获取上传的文件json
 * @param val
 */
export const getFileList = val => {
	if (Array.isArray(val)) {
		const res = val.filter(i=>i.status === 'done').map(i=>{
			// const name = i.name || (i.name.split('_'))[3] || i;
			return (i.response) ? i.response.hash : i.hash;
			// return {
			// 	uid:i.uid,
			// 	// name,
			// 	hash:(i.response) ? i.response.hash : i.hash
			// }
		});
		return JSON.stringify(res.filter(i=>i));
	}
	return '';
};

const Deploy = {
	event:{
		preview,
	},
	props:{
		data:()=>({ token:uploadToken }),
		action,
		beforeUpload,
	}
};

export default Deploy;
