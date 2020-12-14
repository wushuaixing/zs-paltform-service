import Vue from 'vue';

Vue.filter('capitalize', function (value) {
	if (!value) return ''
	value = value.toString()
	return value.charAt(0).toUpperCase() + value.slice(1)
})

Vue.filter('evolveType', (val)=>{
	if (!val) return '';
	return val === 1?'方案已提交':'方案待提交';
})

Vue.filter('amountTh', (val)=>{
	if (typeof val !== 'number') return '-';
	return val.toFixed(2);
})


export default Vue
