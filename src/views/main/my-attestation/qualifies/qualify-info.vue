<template>
	<div class="qualifies-info-wrapper">
		<div class="info-item" data-label="我的资质认证信息-律师" v-if="isLawyer">
			<div class="info-item_date" v-if="noDate">提交日期：
				<span>{{source.date||'2020-12-12'}}</span>
			</div>
			<div class="info-item_title" v-if="!noTitle">我的资质认证信息</div>
			<div class="info-item_list">
				<div class="info-item_list-title">律师名称</div>
				<div class="info-item_list-content">{{source.lawyerName||'-'}}</div>
			</div>
			<div class="info-item_list">
				<div class="info-item_list-title">身份证号码</div>
				<div class="info-item_list-content">{{source.cardNumber||'-'}}</div>
			</div>
			<div class="info-item_list">
				<div class="info-item_list-title">性别</div>
				<div class="info-item_list-content">{{source.sex === "0" ?'男':'女'}}</div>
			</div>
			<div class="info-item_list">
				<div class="info-item_list-title">执业证号</div>
				<div class="info-item_list-content">{{source.licenseNumber||'-'}}</div>
			</div>
			<div class="info-item_list">
				<div class="info-item_list-title">执业开始年份</div>
				<div class="info-item_list-content">{{source.licenseStart||'-'}}</div>
			</div>
			<div class="info-item_list">
				<div class="info-item_list-title">挂靠律所</div>
				<div class="info-item_list-content">{{source.lawOffice||'-'}}</div>
			</div>
			<div class="info-item_list">
				<div class="info-item_list-title">邮箱地址</div>
				<div class="info-item_list-content">{{source.email||'-'}}</div>
			</div>
			<div class="info-item_list">
				<div class="info-item_list-title">身份证照片</div>
				<div class="info-item_list-content">
					<FileList :fileList="source.frontOfCard"/>
					<FileList :fileList="source.backOfCard"/>
				</div>
			</div>
			<div class="info-item_list">
				<div class="info-item_list-title">从业资格证</div>
				<div class="info-item_list-content">
					<FileList :fileList="source.qualificationCertificate"/>
				</div>
			</div>
			<div class="info-item_list">
				<div class="info-item_list-title">保密承诺函</div>
				<div class="info-item_list-content">
					<FileList :fileList="source.confidentialityCommitmentLetter"/>
				</div>
			</div>
		</div>
		<div class="info-item" data-label="我的资质认证信息-机构" v-else>
			<div class="info-item_title">我的资质认证信息</div>
			<div class="info-item_list">
				<div class="info-item_list-title">机构名称</div>
				<div class="info-item_list-content">{{source.name||'-'}}</div>
			</div>
			<div class="info-item_list">
				<div class="info-item_list-title">统一社会信用代码</div>
				<div class="info-item_list-content">{{source.orgSocialCreditCode||'-'}}</div>
			</div>
			<div class="info-item_list">
				<div class="info-item_list-title">邮箱地址</div>
				<div class="info-item_list-content">{{source.email||'-'}}</div>
			</div>
			<div class="info-item_list">
				<div class="info-item_list-title">备用邮箱</div>
				<div class="info-item_list-content">{{source.backupEmail||'-'}}</div>
			</div>
			<div class="info-item_list">
				<div class="info-item_list-title">营业执照</div>
				<div class="info-item_list-content">
					<FileList :fileList="source.businessLicense"/>
				</div>
			</div>
			<div class="info-item_list">
				<div class="info-item_list-title">保密承诺函</div>
				<div class="info-item_list-content">
					<FileList :fileList="source.confidentialityCommitmentLetter"/>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import FileList from '@/components/file-list';
	// import RowLayout from '../common/row-layout';
	export default {
		name: 'QualifyInfo',
		nameComment: '资质认证',
		data(){
			return {

			}
		},
		props:{
			source:{
				type:Object,
				default:()=>{},
			},
			isLawyer:{
				type:Boolean,
				default:true,
			},
			noTitle:{
				type:Boolean,
				default:true,
			},
			noDate:{
				type:Boolean,
				default:false,
			}
		},
		components:{
			FileList,
			// RowLayout
		}
	}
</script>

<style lang="scss">

</style>
