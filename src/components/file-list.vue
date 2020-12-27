<template>
	<div style="width: 400px" class="common-file-list">
		<a-upload :file-list="defaultFileList" :remove="()=>false" size="large" v-if="defaultFileList.length"/>
		<div v-else>-</div>
	</div>
</template>

<script>
	import { fileListRule } from "@/plugin/tools";

	export default {
		name:'FileList',
		nameComment: '文件列表',
		props:{
			fileList:{
				type: String,
				default:''
			}
		},
		data() {
			return{
			};
		},
		computed:{
			defaultFileList(){
				return fileListRule(this.fileList);
			}
		},
	}
</script>

<style lang="scss">
.common-file-list{
	> span{
		display: flex;
	}
	.ant-upload-list{
		display: inline-block;
	}
	.ant-upload-list-item-card-actions{
		display: none;
	}
	.ant-upload-list-item{
		margin-top: 0;
		line-height: 24px;
		margin-bottom: 3px;
	}
	.ant-upload-list-item-info{
		padding-left: 0;
	}

}
</style>
