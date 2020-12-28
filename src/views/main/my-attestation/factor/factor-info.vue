<template>
	<div class="qualifies-info-wrapper">
		<slot name="title"/>
		<div class="factor-content">
			<div class="info-item">
				<a-form v-bind="formItemLayout">
					<div class="factor-form-subtitle"><span>个人信息</span></div>
					<a-form-item label="123">112312312312312</a-form-item>
					<a-form-item label="123">待完善</a-form-item>
				</a-form>
			</div>
		</div>
	</div>
</template>

<script>

	import { formItemLayout } from "../common/style";

	export default {
		name:'FactorInfo',
		nameComment:'要素信息展示',
		props:{
			source:{},
			isLawyer:{
				type:Boolean,
				default:true,
			},
		},
		data(){
			return {
				formItemLayout
			}
		}
	}
</script>

<style scoped lang="scss">

.factor-content{
	padding: 0 32px;
	.factor-form-subtitle{
		text-align: left;
		padding: 10px 0;
		span{
			display: block;
			padding-left: 10px;
			border-left: 4px solid $common-base;
			font-size: 16px;
			line-height: 20px;
			height: 20px;
		}
	}
}
</style>
