<template>
	<a-modal v-model="visible" title="资质、要素信息确认及完善" on-ok="handleOk" :maskClosable="false">
		<p>Some contents...</p>
		<p>Some contents...</p>
		<p>Some contents...</p>
		<p>Some contents...</p>
		<p>Some contents...</p>
		<template slot="footer">
			<a-button key="back" @click="handleCancel">Return</a-button>
			<a-button key="submit" type="primary" :loading="loading" @click="handleOk">Submit</a-button>
		</template>
	</a-modal>
</template>

<script>
	export default {
		name:'Element',
		nameComment:"资质|要素信息确认及完善",
		data(){
			return{
				visible:false,
			}
		},
		methods:{
			handleOk() {
				this.loading = true;
				setTimeout(() => {
					this.visible = false;
					this.loading = false;
				}, 3000);
			},
			handleCancel() {
				this.visible = false;
			},
		}
	}
</script>

<style scoped>

</style>
