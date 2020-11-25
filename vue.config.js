// const path = require('path');

module.exports = {
	configureWebpack:{
		resolve:{
			alias:{
				// '@@': path.resolve(__dirname)+'\\src/views'
			}
		}
	},
	css: {
		loaderOptions: {
			scss: {
				additionalData: `@import "~@/assets/css/configuration.scss";`
			},
		}
	}
}
