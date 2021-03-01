import Vue from 'vue';
import * as source from '@/views/main/my-attestation/common/source';
import axios from 'axios';

let AREA_JSON = '';
axios.get('https://zsamc-public.zsamc.com/address.json').then(({status,data})=>{
	if(status === 200)AREA_JSON = data;
});

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
	return Number(val).toFixed(2);
});

Vue.filter('guarantyType', (val)=>{
	if (!val) return '-';
	let guarantyObj = {
		1:'抵押',
		2:'担保',
		3:'抵押+担保'
	};
	return guarantyObj[val];
});

Vue.filter('timeFilter', (val)=>{
	if(!val) return '-';
	return val.substr(0,10)
});

//是否【1：是，2：否】的判断
Vue.filter('is', (val)=>{
	if(val === '1') return '是';
	if(val === '2') return '否';
	if(val === '0') return '否';
	return '';
});

//性别【0：男，1：女】的判断
Vue.filter('sex', (val)=>{
	if(val === '1') return '女';
	if(val === '0') return '男';
	return '未知';
});

// 单位展示信息
Vue.filter('unit', (val,unit = '')=>{
	if(!Number(val)) return "";
	return val + unit || "";
});

// 多项选择:展示 (val:值,field:数据字段,remark ="":其他字段)
Vue.filter('multi',(val,remark = '',field)=>{
    if(!field) return val;
    if(!val) return val;
    const _remark = remark ? `（${remark}）` : '';
    const _data = source[field] || [];
    const _label = val.split(',').map(i=>{
        let result = '';
        _data.forEach(item=>{ if(item.value.toString() === i) {
            result =  i.toString() === '0' ? item.label + _remark : item.label
        } });
        return result
    });
    return _label.filter(i=>i).join('、')
});

// 地区省市区展示
const areaArray = val=>{
	let result = [];
	if(AREA_JSON[val[0]]) {
		const i = AREA_JSON[val[0]];
		result[0] = i.name;
		if(i.child[val[1]]){
			const item = i.child[val[1]];
			result[1] = item.name;
			if(item.child[val[2]]){
				result[2] = item.child[val[2]].name;
			}
		}
	}
	return result.join('/')
};
Vue.filter('area',value=>{
	if(value.length && Array.isArray(value)){
		return areaArray(value);
	}
	return value;
});

Vue.filter('areas',data=>{
	if(data.length && Array.isArray(data)){
		return data.map(i=>areaArray(i)).join('、');
	}
	return data;
});

//机构历史合作银行
Vue.filter('historyCooperation', (val)=>{
	return val === 0 ? '地方持牌AMC' : val === 1 ? '东方' : val === 2 ? '长城' : val === 3 ? '华融' : '信达';
});
//机构合作意向
Vue.filter('IntentionCooperation',(val)=>{
	return (
		val === 1 ? '合作清收' :
			val === 2  ? '保底清收' :
				val === 3 ? '跟投' :
					val === 4 ? '介绍投资人' :
						val === 5 ? '担保类项目' : '其他'
	);
});
//擅长业务类型
Vue.filter('typeBusiness',(val)=>{
	return val === 1 ? '工业' : val === 2  ? '商业' : val === 3 ? '住宅' : '其他';
});
//过往合作类型
Vue.filter('typeCooperation',(val)=>{
	return val === 1 ? '配置收购' : val === 2  ? '资产包收购' : val === 3 ? '债券清收' : '其他';
});
Vue.filter('isLawsuitType', (val)=>{
	if(!val)return '-';
	let isLawsuitObj = {
		1:'未诉',
		2:'已诉未判决',
		3:'已判决未执行',
		4:'已执行',
		5:'破产'
	}
	return isLawsuitObj[val]
 });

Vue.filter('show_', (val)=>{
	if(!val)return "-";
	return val
});


export default Vue
