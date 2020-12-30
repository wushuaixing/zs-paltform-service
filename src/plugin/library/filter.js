import Vue from 'vue';

Vue.filter('capitalize', function (value) {
	if (!value) return '';
	value = value.toString();
	return value.charAt(0).toUpperCase() + value.slice(1)
});

Vue.filter('evolveType', (val)=>{
	return val === 0 ? '方案待提交' : val === 1 ? '方案已提交' : '方案审核中';
});

Vue.filter('amountTh', (val)=>{
	if (!val) return '-';
	return Number(val).toFixed(1);
});

Vue.filter('guarantyType', (val)=>{
	if (!val) return '-';
	return val === 1 ? '担保' : '抵押+担保';
});

Vue.filter('timeFilter', (val)=>{
	if(!val) return '-';
	return val.substr(0,10)
});



//机构是否与浙商合作过的字段过滤器
Vue.filter('factorWith', (val)=>{
	return val === 1 ? '是' : val === 2 ? '否' : '其他';
})
//机构历史合作银行
Vue.filter('historyCooperation', (val)=>{
	return val === 0 ? '地方持牌AMC' : val === 1 ? '东方' : val === 2 ? '长城' : val === 3 ? '华融' : '信达';
})
//机构合作意向
Vue.filter('IntentionCooperation',(val)=>{
	return val === 1 ? '合作清收' : val === 2  ? '保底清收' : val === 3 ? '跟投' : val === 4 ? '介绍投资人' : val === 5 ? '担保类项目' : '其他';
})
//擅长业务类型
Vue.filter('typeBusiness',(val)=>{
	return val === 1 ? '工业' : val === 2  ? '商业' : val === 3 ? '住宅' : '其他';
})
//过往合作类型
Vue.filter('typeCooperation',(val)=>{
	return val === 1 ? '配置收购' : val === 2  ? '资产包收购' : val === 3 ? '债券清收' : '其他';
})
Vue.filter('isLawsuitType', (val)=>{
	return val === '0' ? '未诉讼' : '诉讼'
 });
export default Vue
