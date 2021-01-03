const data =  require('./area');
const fs = require('fs');

const areaSource = {};

data.area.forEach(item=>{
	areaSource[item.id] = {
		name:item.name,
		id:item.id,
		child:{}
	};
	if(item.children){
		item.children.forEach(ic=>{
			areaSource[item.id].child[ic.id] = {
				name:ic.name,
				id:ic.id,
				child:{}
			};
			if(ic.children){
				ic.children.forEach(icc=>{
					areaSource[item.id].child[ic.id].child[icc.id] = {
						name:icc.name,
						id:icc.id,
					};
				});
			}
		});
	}
});
fs.writeFile("./src/assets/areaObj.json", JSON.stringify(areaSource), (error) => {
	error && console.log('error');
});
console.log(areaSource);
