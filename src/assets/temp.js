const data =  require('./area');
const fs = require('fs');

const areaSource = {};

data.area.forEach(item=>{
	areaSource[item.id] = {
		n:item.name,
		c:{}
	};
	if(item.children){
		item.children.forEach(ic=>{
			areaSource[item.id].c[ic.id] = {
				n:ic.name,
				c:{}
			};
			if(ic.children){
				ic.children.forEach(icc=>{
					areaSource[item.id].c[ic.id].c[icc.id] = {
						n:icc.name,
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
