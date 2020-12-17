import request from "@/plugin/tools/request";

const install = function (Vue) {
	Date.prototype.format = function (fmt) {
		var o = {
			"M+": this.getMonth() + 1, //月份
			"d+": this.getDate(), //日
			"w": this.getDay(), //星期
			"h+": this.getHours(), //小时
			"m+": this.getMinutes(), //分
			"s+": this.getSeconds(), //秒
			"q+": Math.floor((this.getMonth() + 3) / 3), //季度
			"S": this.getMilliseconds() //毫秒
		};

		var week = [`日`, `一`, `二`, `三`, `四`, `五`, `六`];
		if (/(y+)/.test(fmt)) {
			fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
		}
		for (var k in o) {
			if (new RegExp("(" + k + ")").test(fmt)) {
				if (k === 'w') {
					fmt = fmt.replace(RegExp.$1, week[o[k]]);
				} else {
					fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
				}
			}
		}
		return fmt;
	};
	Vue.prototype.$req = request;
}

export default install;
