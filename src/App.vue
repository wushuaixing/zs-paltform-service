<template>
  <a-config-provider :locale="locale">
    <div id="app">
      <router-view/>
    </div>
  </a-config-provider>
</template>
<script>
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN';
export default {
  name: 'rootNode',
  data() {
    return {
      locale: zhCN,
    };
  },
}
</script>

<style lang="scss">
	#app {
		font-family: Avenir, Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		color: #2c3e50;
		height: 100vh;
		min-width: 1200px;
	}
	input::placeholder {
		font-family: Avenir, Helvetica, Arial, sans-serif;
		font-size: 14px;
		color: #BFBFBF !important;
	}
	button:focus{
		outline:none
	}
	.dot-badge .ant-badge-dot{
		width: 8px;
		height: 8px;
		right: -3px!important;
		box-shadow: none;
	}
</style>

