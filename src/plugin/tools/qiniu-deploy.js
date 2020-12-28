import { getUploadToken, getDownLoadToken } from "@/plugin/api/base";
import { message } from "ant-design-vue";

const action = 'http://up-z2.qiniup.com/';

let uploadToken = '';

/**
 * 上传文件时，请求uploadToken
 * @param e
 * @returns {*|Promise<void>|PromiseLike<T>|Promise<T>}
 */
const beforeUpload = e => getUploadToken().then(res=>{
	if(res.code === 20000) {
		uploadToken = res.data;
		return e;
	}else{
		message.error('获取上传凭证失败!');
		return new Promise.reject()
	}
});

/**
 * 点击预览时的方法
 * @param file
 * @returns {Promise<*>}
 */
const preview = file =>{
	const { status, response, url } = file;
	if(status !== 'done') {
		message.error('该文件不支持预览');
	}else{
		console.log(file);
		if(file.viewUrl) return window.open(file.viewUrl);
		const fileKey = response.hash || url;
		getDownLoadToken(fileKey).then(res=>{
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
	console.log('Upload event:', e);
	if (Array.isArray(e)) {
		return e;
	}
	if(e.file.status === 'error'){
		message.error('文件上传失败！');
	}
	return e && e.fileList;
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
