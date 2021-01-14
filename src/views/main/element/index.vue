<template>
	<a-modal v-model="visible" title="资质、要素信息确认及完善" on-ok="handleOk"
					 :maskClosable="false" width="1000px" :closable="false" :keyboard="false" class="element-modal-wrapper">
		<a-spin :spinning="spinning" tip="数据请求中..." size="large">
			<div style="height: 30vh" v-if="spinning"></div>
		</a-spin>
		<div v-if="!spinning">
			<div class="text-error" style="margin-bottom: 10px">*请您确认已有信息无误并完善缺失的必填信息</div>
			<div class="text-h3">资质信息确认及完善</div>
			<FormQualify :userType="identity === 1 ?'lawyer':'org'" :noAuction="false"
									 ref="QualifyFormRef" onlyData :source="source.qualify" />
			<div class="text-h3">要素信息确认及完善</div>
			<div class="info-item_category" id="item_category_office">
				<span class="title">{{identity === 1 ?'律师信息':'机构信息'}}</span>
			</div>
			<FormFactor :isLawyer="identity === 1" noSubmit noPadding
									ref="FactorFormRef" onlyData :dataSource="source.factor" />
		</div>
		<div slot="footer" style="text-align: center">
			<a-button type="primary" :loading="loading" @click="handleSubmit" :disabled="spinning">确认无误并提交</a-button>
		</div>
	</a-modal>
</template>

<script>

	import FormQualify from '../my-attestation/qualifies/fill-form';
	import FormFactor from '../my-attestation/factor/form-item';
	import { perfectInfo } from "@/plugin/api/attest";

	const qualifyData = (data)=>{
		const { contact, logId, phone, qualify = {},qualifyVO = {} } = data || {};
		return {
			contact,logId,phone,
			...qualify,
			...qualifyVO
		};
	};
	const factorData = (data)=>{
		const { element = {}, organizationElementVO = {} } = data || {};
		return {
			...element,
			...organizationElementVO,
		}
	};

	export default {
		name:'Element',
		nameComment:"资质|要素信息确认及完善",
		data(){
			return{
				visible:false,
				loading:false,
				spinning:true,
				identity:'',
				source:{
					factor:{},
					qualify:{}
				},
			}
		},
		components:{
			FormQualify,
			FormFactor
		},
		created(){
			const info = this.$store.getters.getInfo;
			this.identity = info.identity;
			if(info.registerType === 1 && info.isConfirmInfo === 0){
				this.visible = true;
			}
		},
		methods:{
			handleSubmit() {
				const { QualifyFormRef, FactorFormRef } = this.$refs;
				Promise
					.all([QualifyFormRef.handleSubmit(),FactorFormRef.handleSubmit()])
					.then(([qualifyVO,elementVO])=>{
						console.log('then：',[qualifyVO,elementVO]);
						const params = {
							qualifyVO,
							elementVO: this.identity === 1 ? { lawyerElement: elementVO } : elementVO
						};
						const api = this.identity === 1 ? perfectInfo.lawyer : perfectInfo.org;
						this.loading = true;
						api(params).then(res=>{
							if(res.code === 20000){
								this.$message.success('信息提交成功！',1,()=>{
									window.location.reload();
								});
							}else{
								this.$message.error('网络请求失败！');
							}
						}).finally(()=>{
							this.loading = false;
						});
					})
					.catch((err)=>{
						if(err){
							if(Object.keys(err)){
								const firstErrorField = err[Object.keys(err)[0]].errors[0].field;
								if(firstErrorField){
									document.getElementById(firstErrorField).scrollIntoView(true);
									const h = document.documentElement.scrollTop;
									document.documentElement.scrollTo(0,h - 100);
								}
							}
						}
					})
			},
			handleProcess(data) {
				this.source = {
					qualify:qualifyData(data._qualify),
					factor:factorData(data._factor),
				};
			},
		},
		mounted(){
			if(this.visible){
				perfectInfo.info(this.identity).then(res=>{
					if(res.code === 20000){
						this.handleProcess(res.data);
					}else{
						this.$message.error(res.message)
					}
				}).finally(()=>{
					this.spinning = false;
				})
			}
		}
	}
</script>

<style lang="scss">
	.element-modal-wrapper{
    .ant-modal-content{
      .ant-modal-header{
        .ant-modal-title{
            font-size: 18px;
            font-weight: bolder;
        }
      }
    }
		.factor-form-classTitle{
			display: flex;
			justify-content: space-between;
			padding: 5px;
			border-bottom: 1px solid $border-base;
			margin-bottom: 25px;
			.classTitle_subtitle{
				font-size: 16px;
				line-height: 32px;
				span{
					margin-left: 10px;
				}
			}
		}
		.text-h3{
			font-size: 14px;
			font-weight: bold;
		}
		.info-item_category{
			height: 50px;
			line-height: 50px;
			display: flex;
			justify-content: space-between;
			border-bottom: 1px solid $border-base;
			margin-bottom: 20px;
			button{
				line-height: 50px;
			}
			.title{
				font-size: 16px;
				font-weight: bold;
				color: $text-title;
			}
		}
		.attest-form{
			.ant-form-item-with-help{
				margin-bottom: 0;
			}
			.ant-form-item-label,.ant-form-item-control{
				line-height: 32px;
				.ant-checkbox-group, .ant-radio-group{
					line-height:32px;
				}
			}
			.ant-form-explain, .ant-form-extra{
				margin-top: 0;
				min-height: 25px;
			}
			.form-item-no-title{
				.ant-form-item-label label:after{
					content:' '
				}
			}
		}
		.factor-form-subtitle{
			text-align: left;
			padding: 10px 0 20px;
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
