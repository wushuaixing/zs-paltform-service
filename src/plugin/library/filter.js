import Vue from 'vue';

Vue.filter('capitalize', function (value) {
	if (!value) return ''
	value = value.toString()
	return value.charAt(0).toUpperCase() + value.slice(1)
})

Vue.filter('evolveType', (val)=>{
	return val === 0 ? '方案待提交' : val === 1 ? '方案已提交' : '方案审核中';
})

Vue.filter('amountTh', (val)=>{
	if (!val) return '-';
	return Number(val).toFixed(1);
})

Vue.filter('guarantyType', (val)=>{
	if (!val) return '-';
	return val === 1 ? '担保' : '抵押+担保';
})

Vue.filter('timeFilter', (val)=>{
	return val.substr(0,10)
})

Vue.filter('isLawsuitType', (val)=>{
	return val === '0' ? '未诉讼' : '诉讼'
 })
export default Vue
