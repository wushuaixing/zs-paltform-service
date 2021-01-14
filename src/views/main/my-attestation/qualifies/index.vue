<template>
  <div class="qualifies-wrapper">
    <a-spin :spinning="spinning" class="spin-wrapper" tip="Loading......"/>
    <template v-if="!spinning">
      <!--  选择身份：  -->
      <div class="qualifies-item qualifies-choose" v-if="status(0) && !nextStep">
        <div class="item-title">
          <span>请选择您的服务商身份：</span>
        </div>
        <div class="choose-content">
          <div class="choose-item" @click="stepChoose(1)">
            <img :src="icon.law" alt="" style="width: 145px;margin:0 auto;">
            <div class="item-name">律师</div>
            <div class="item-remark"></div>
            <ul class="item-list">
              <li>个人身份信息及联系方式</li>
              <li>从业资格证</li>
              <li>保密承诺函(需下载打印并盖公章)</li>
            </ul>
          </div>
          <div class="choose-item" @click="stepChoose(2)">
            <img :src="icon.org" alt="" style="width: 145px;margin:0 auto;">
            <div class="item-name">机构</div>
            <div class="item-remark">*个人若为机构员工，请以机构名义报名</div>
            <ul class="item-list">
              <li>机构信息及联系方式</li>
              <li>营业执照</li>
              <li>保密承诺函(需下载打印并盖公章)</li>
            </ul>
          </div>
        </div>
      </div>
      <!--  填写信息：  -->
      <FillForm v-if="status(0) && nextStep" :userType="identity === 1?'lawyer':'org'" isFirst>
        <div class="qualifies-item" slot="title">
          <div class="item-title item-title_no-border">
            <span>您当前选择的服务商身份为：</span>
            <template v-if="identity === 1">
              <img :src="icon.law" alt="" style="height: 32px;vertical-align: top;">
              <span style="margin-left: 10px">律师</span>
            </template>
            <template v-else>
              <img :src="icon.org" alt="" style="height: 32px;vertical-align: top;">
              <span style="margin-left: 10px">机构</span>
            </template>
            <a-button style="float:right;width: 80px;" @click="stepBack">
							<span style="font-size:14px;">上一步</span></a-button>
          </div>
        </div>
      </FillForm>
      <!--  信息展示：含提示  -->
      <template v-if="status(123456)">
        <!-- 资质认证信息 -->
        <div class="qualifies-item qualifies-status">
          <div class="item-title status-title">
            <div class="status-title-identity">
              <span>我的服务商身份：</span>
              <template v-if="identity === 1">
                <img :src="icon.law" alt="" style="height: 32px;vertical-align: top;margin-top: -2px">
                <span style="margin-left: 10px">律师</span>
              </template>
              <template v-else>
                <img :src="icon.org" alt="" style="height: 32px;vertical-align: top;margin-top: -2px">
                <span style="margin-left: 10px">机构</span>
              </template>
            </div>
            <ul class="status-title-attribute" v-if="status(123456) && isSubmitElements">
              <li>当前资质认证状态：<font :class="info.class">{{info.desc}}</font></li>
              <li v-if="statusInfo.qualifyModifyDate">
                资质信息更新日期：{{statusInfo.qualifyModifyDate}}
              </li>
            </ul>
          </div>
        </div>
        <!-- 资质认证状态 -->
        <div class="qualifies-item qualifies-status" v-if="status(245) || (status(1) && !isSubmitElements )">
          <div class="status-content">
            <div>{{info.text}}</div>
						<a-button type="primary" v-if="status(1)" @click="()=>this.$router.push('/attest/factor')">
							立即前往要素认证</a-button>
            <a-button type="primary" v-if="status(2)" @click="checkQualifies" :loading="visibleLoading">
							编辑并重新提交</a-button>
            <a-button type="primary" v-if="status(4)" @click="checkQualifies" :loading="visibleLoading">
							查看我提交的认证修改信息</a-button>
            <a-space v-if="status(5)">
              <a-button type="primary" @click="checkQualifies" :loading="visibleLoading">编辑并重新提交</a-button>
              <a-button @click="handleDrop">放弃修改</a-button>
            </a-space>
          </div>
        </div>
        <!-- 资质认证信息 -->
        <div class="qualifies-info" v-if="status(3456)">
          <div class="info-button">
            <a-button @click="handleEdit" icon="edit"> 编辑我的资质信息</a-button>
          </div>
          <QualifyInfo :source="source" :is-lawyer="identity === 1"/>
          <div class="info-item" data-label="当前联络人信息" v-if="identity === 2">
						<div class="info-item_title">当前联络人信息</div>
						<div class="info-item_list info-item_edit">
							<div class="info-item_list-title ele-important">联络人姓名</div>
							<div class="info-item_list-content">
								<template v-if="!editStatus">
									<span>{{source.contact}}</span>
									<a-button size="small" type="link" icon="edit" @click="toEditContacts(1)"></a-button>
								</template>
								<a-space v-else>
									<a-input placeholder="请输入联络人姓名"  style="width: 150px;" v-model="contacts_name"/>
									<a-button size="small" type="primary" @click="handleUpdateName"><a-icon type="check" /></a-button>
									<a-button size="small" @click="toEditContacts(0)"><a-icon type="close" /></a-button>
								</a-space>
							</div>
						</div>
						<div class="info-item_list" style="margin-top: 0">
							<div class="info-item_list-title">手机号码</div>
							<div class="info-item_list-content">{{source.phone}}
								<span class="remark">若需要更改联络人手机号码请至个人中心更改绑定手机号</span>
							</div>
						</div>
					</div>
        </div>
        <div class="qualifies-info" v-if="status(1)">
          <div class="info-image-status">
            <img src="../../../../assets/img/no_data.png" alt="">
            <p class="image-status-remark">您要提交的资质认证信息正在审核中 ，请您耐心等待</p>
            <a-button @click="checkQualifies" type="primary" :loading="visibleLoading">查看我提交的资质认证</a-button>
          </div>
        </div>
      </template>
    </template>
    <a-modal v-model="visible" :title="modalTitle" :maskClosable="false" :width="1000">
      <QualifyInfo :source="sourceLog" :is-lawyer="identity === 1" no-date
									 v-if="modalStep===0" :status="statusInfoLog.qualifyAuditStatus"/>
      <FillForm :userType="identity === 1?'lawyer':'org'" v-if="modalStep===1" :noAuction="false"
                :source="sourceLog" @toTellRes="handleSubmit" ref="fillFromRef"
								:status="statusInfoLog.qualifyAuditStatus"/>
      <template slot="footer">
        <div style="text-align: center" v-if="modalStep===0">
          <a-space>
            <a-button key="back" @click="handleModalClose">关闭</a-button>
						<a-button key="submit" type="primary" @click="modalStep = 1">修改并重新提交</a-button>
					</a-space>
        </div>
        <div style="text-align: center" v-if="modalStep===1">
          <a-space>
						<a-button key="back" @click="handleModalClose">关闭</a-button>
            <a-button key="back" @click="modalStep=0" v-if="onlyEdit">取消</a-button>
						<a-button key="submit" type="primary" @click="handleEditInfo">确认修改并提交</a-button>
					</a-space>
        </div>
      </template>
    </a-modal>
  </div>
</template>

<script>

  import FillForm from './fill-form';
  import QualifyInfo from './qualify-info';
  import { qualifies } from "@/plugin/api/attest";
  import IconLaw from '@/assets/img/lawyer.png';
  import IconOrg from '@/assets/img/org.png';

  // 资质审核相关状态
  const qualifyStatus = {
    0:{ desc:"未认证", text:""},
    1:{ desc:"认证审核中", text:"您尚未完成要素认证，继续完成要素认证，即可查看浙商资产招商项目！",class:'text-error'},
    2:{ desc:"认证未通过", text:"您提交的资质认证信息未通过审核，未通过原因：",class:'text-dangerous'},
    3:{ desc:"审核通过", text:"",class:'text-success'},
    4:{ desc:"认证修改审核中", text:"您提交的资质认证信息修改正在审核中，请耐心等待审核结果",class:'text-warning'},
    5:{ desc:"认证修改未通过", text:"您提交的资质认证信息修改未通过审核，未通过原因：",class:'text-dangerous'},
    6:{ desc:"审核通过", text:"",class:'text-success'},
  };

export default {
  name: 'qualifies',
  nameComment: '资质认证',
  data() {
    return {
      spinning:true,
      visible:false,
      visibleLoading:false,
      onlyEdit:false,
      modalStep:0,
      // 0 无身份 1 律师 2 机构
      identity:0,
      // 未认证 选择状态
      nextStep:false,
      // 联系人编辑状态
      editStatus:false,
      contacts:{},
      // 相关资质信息
      source:{},
      sourceLog:{},
      contacts_name:'',
	    contacts_name_remark:'',
      icon:{
        law:IconLaw,
        org:IconOrg,
      },
	    statusInfo:{},
	    statusInfoLog:{}
    };
  },
  created(){},
  components:{
    FillForm,
    QualifyInfo
  },
  methods:{
    // 继续下一步[选择身份]
    stepChoose(val){
      this.nextStep = true;
      this.identity = val;
    },
    // 返回上一步[初始化身份选择]
    stepBack(){
      const _this = this;
      this.$confirm({
        title: '确定返回服务商身份选择吗？',
	      icon:'exclamation-circle',
        content: '返回后，将清空当前填写的所有内容。',
        onOk() {
          _this.nextStep = false;
          _this.identity = '';
        },
        onCancel() {},
      });
    },
    // 更新联系人名称[机构联系人]
    handleUpdateName(){
	    if(!this.contacts_name) return this.$message.error('联系名称不能为空！');
	    if(this.contacts_name === this.contacts_name_remark) return this.$message.error('联系人名称相同！');
			qualifies.modifyContact(this.contacts_name).then(res=>{
				if(res.code === 20000){
					this.source.contact = this.contacts_name;
					this.contacts_name_remark = this.contacts_name;
					this.$message.success('联系人名称修改成功！');
					this.editStatus = false;
				}else{
					this.$message.error('网络请求失败');
				}
			});
    },
    toEditContacts(bol){
      if(bol){
        this.editStatus = true;
      }else{
        this.editStatus = false;
        this.contacts_name = this.contacts_name_remark;
      }
    },
    // 查看资质状态
    checkQualifies(){
      this.visibleLoading = true;
      const api = this.identity === 1 ? qualifies.lawyerLog : qualifies.orgLog;
      api().then(({data = {},code})=>{
        if(code === 20000){
          const {
            contact, logId, phone, qualify = {},qualifyVO = {}
          } = data || {};
	        this.statusInfoLog = {...this.statusInfo};
	        this.sourceLog = {
            contact,logId,phone,
            ...qualify,
            ...qualifyVO
          };
          this.visible = true;
          this.modalStep = 0;
        }else{
          this.$message.error('网络请求异常，请重新请求!');
        }
      }).finally(()=>{
        this.visibleLoading = false;
      })
    },
    // 判断数据当前状态
    status(rule){
      const { qualifyAuditStatus: q } = this.statusInfo;
      return  rule.toString() ? new RegExp(q).test(rule) : q;
    },
    // 关闭弹窗
    handleModalClose(){
			this.modalStep = 0;
			this.visible = false;
      this.$nextTick(()=>{
      });
    },
    // 提交我的资质信息
    handleSubmit(){
      // console.log(val);
			this.$message.success('资质认证提交成功！');
			this.queryQualify();
			this.handleModalClose();
		},
    // 编辑我的资质信息 - 查看且编辑
    handleEditInfo(e){
      const { fillFromRef } = this.$refs;
      // console.log(this.$refs.fillFromRef);
      fillFromRef.handleSubmit(e);
    },
    // 编辑我的资质信息 - 仅编辑
    handleEdit(){
	    this.sourceLog = {...this.source};
	    this.statusInfoLog = {...this.statusInfo};
			this.modalStep = 1;
			this.visible = true;
			this.onlyEdit = false;
    },
		// 放弃修改
		handleDrop(){
			qualifies.dropModify().then(res=>{
				if(res.code === 20000){
					this.$message.success('当前认证修改申请，已放弃');
					this.queryQualify();
				}else{
					this.$message.error('操作失败，请稍后操作！');
				}
			}).catch(()=>{
				this.$message.error('操作失败，请稍后操作！');
			})
		},
		// 查询当前服务商的机构属性
		queryQualify(){
			qualifies.qualify().then(({data = {},code,message})=>{
				if(code === 20000){
					const {
						contact, logId, phone,qualifyCondition, qualify = {},qualifyVO = {},
					} = (data['lawyerQualifyDetail'] || data['organizationQualifyDetail']) || {};
					this.statusInfo = qualifyCondition || {};
					this.contacts_name = contact;
					this.contacts_name_remark = contact;
					this.source = {
						contact,logId,phone,
						...qualify,
						...qualifyVO
					};
					this.spinning = false;
				} else if(code === 80001){
					this.statusInfo = {
						qualifyAuditStatus:0,
						reasonOfNotPass:'',
					};
					this.spinning = false;
				} else{
					this.$message.error(message);
				}
			}).catch(()=>{
				this.$error({
					title: '提示',
					content: '网络请求异常，请重新请求!',
				});
			})
		}
  },
  computed:{
    info() {
      const { reasonOfNotPass,qualifyAuditStatus} = this.statusInfo;
      return {
        ...qualifyStatus[qualifyAuditStatus],
        text:qualifyStatus[qualifyAuditStatus].text + (reasonOfNotPass || '')
      };
    },
    modalTitle(){
      return this.modalStep === 0 ? "我提交的认证信息" : "我提交的认证信息-编辑";
    },
		isSubmitElements(){
			return this.$store.getters.getInfo.isSubmitElements
		},
  },
  mounted() {
    // const { identity, isSubmitCertify } = this.$store.getters.getInfo;
    // console.log(isSubmitCertify);
    this.identity = this.$store.getters.getInfo.identity;
    // 查询当前服务商的机构属性
		this.queryQualify();
  },

}
</script>

<style scoped lang='scss'>

</style>
