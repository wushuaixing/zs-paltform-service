<template>
  <div class="qualifies-form-wrapper attest-form">
		<slot name="title"/>
		<div :style="noPadding?'padding:0':'padding: 10px 24px 0'" class="factor-form-wrapper">
			<!-- 要素信息：律师信息 -->
			<FormLaw ref="LawFormRef" :source="dataSource" v-if="isLawyer" />
			<!-- 要素信息：机构信息 -->
			<FormOrg ref="OrgFormRef" :source="dataSource" v-if="!isLawyer" />
			<!-- 要素信息：公共信息信息 -->
			<FormPublic ref="PublicFormRef" :source="dataSource">
				<div class="factor-form-classTitle" slot="lawOffice" v-if="role === 1 && visible">
					<div class="classTitle_subtitle">
						<a-icon type="bank"/>
						<span>律所信息</span>
					</div>
					<div class="classTitle_action" v-if="!onlyUpdateOffice">
						<a-button type="primary" @click="DeleteLawInfo">暂不添加</a-button>
					</div>
				</div>
			</FormPublic>
			<!-- 要素信息：律所信息 -->
			<FormOffice v-if="isLawyer && visible" ref="OfficeFormRef" :source="officeSource"/>
			<!-- 相关操作：添加律所信息 -->
			<a-row v-if="isLawyer && !visible && !onlyUpdateOffice" style="margin:25px 0" >
				<a-col :span="24">
					<a-button type="dashed" block icon="plus" @click="visible = true">添加律所信息</a-button>
				</a-col>
			</a-row>
			<!-- 相关操作：确认无误并提交 -->
			<a-row style="margin:25px 0" v-if="!noSubmit">
				<a-col :span="6" />
				<a-col :span="18">
					<a-button type="primary" @click="handleSubmit" :loading="loading"> 确认无误并提交</a-button>
				</a-col>
			</a-row>
		</div>
  </div>
</template>

<script>

	import FormLaw from './form-law';
	import FormOffice from './form-office';
	import FormOrg from './form-org';
	import FormPublic from './form-public';
	import { factor } from "@/plugin/api/attest";

	export default {
		name: "FactorForm",
		components: {
			FormLaw,
			FormOffice,
			FormOrg,
			FormPublic,
		},
		data() {
			return {
				visible: false,
				loading:false,
			}
		},
		props: {
			role: {
				type: Number,
				default: 1,
			},
			isLawyer:{
				type: Boolean,
				default: true,
			},
			dataSource:{
				type: Object,
				default: ()=>{},
			},
			// 仅更新律所信息
			onlyUpdateOffice:{
				type: Boolean,
				default: false,
			},
			noSubmit:{
				type: Boolean,
				default: false,
			},
			noPadding:{
				type: Boolean,
				default: false,
			},
			onlyData:{
				type:Boolean,
				default:false
			},
		},
		computed:{
			officeSource(){
				const data = this.dataSource || {};
				const _source = data.lawOffice || {};
				if(data.roleInLawOffice) _source.roleInLawOffice = data.roleInLawOffice;
				return _source;
			}
		},
		beforeMount(){
			this.visible = !!(this.dataSource || {}).lawOffice;
		},
		methods: {
			handleSubmit(e) {
				this.loading = true;
				const api = this.isLawyer ? lawyerElement => factor.lawyerAdd({lawyerElement}) : factor.orgAdd;
				const { OrgFormRef, OfficeFormRef, PublicFormRef, LawFormRef } = this.$refs;
				return Promise.all(this.isLawyer ? [
					LawFormRef.handleSubmit(e), PublicFormRef.handleSubmit(e), this.visible && OfficeFormRef.handleSubmit(e)
				] : [
					OrgFormRef.handleSubmit(e), PublicFormRef.handleSubmit(e)
				]).then(([_base,_public, _officeData])=>{
					const lawOffice = this.visible ? { lawOffice:_officeData} : {};
					const data = { ..._base,..._public,...lawOffice,
						roleInLawOffice:(_officeData || {}).roleInLawOffice};
					if(!this.onlyData) api(data).then(res=>{
						this.loading = false;
						if( res.code === 20000 ){
							this.$emit('toTellRes',res)
						}else{
							this.$message.error(res.data || "网络请求错误！");
						}
					});
					return data;
				}).catch((err)=>{
					if(Object.keys(err)){
						const firstErrorField = err[Object.keys(err)[0]].errors[0].field;
						if(firstErrorField){
							document.getElementById(firstErrorField).scrollIntoView(true);
							const h = document.documentElement.scrollTop;
							document.documentElement.scrollTo(0,h - 100);
						}
					}
					this.loading = false;
					return Promise.reject();
				})
			},
			// 移除 - 律所相关信息警告
			DeleteLawInfo() {
				this.$confirm({
					title: '警告',
					content: '确认退出律所信息添加吗',
					okText: '确定',
					icon:'exclamation-circle',
					cancelText: '取消',
					onOk:()=> this.visible = false ,
				});
			},
		},

	}
</script>
