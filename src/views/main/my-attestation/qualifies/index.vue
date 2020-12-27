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
      <FillForm v-if="status(0) && nextStep" :userType="identity === 1?'lawyer':'org'">
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
            <a-button style="float:right" @click="stepBack">上一步</a-button>
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
              <template v-if="identity ===1">
                <img :src="icon.law" alt="" style="height: 32px;vertical-align: top;">
                <span style="margin-left: 10px">律师</span>
              </template>
              <template v-else>
                <img :src="icon.org" alt="" style="height: 32px;vertical-align: top;">
                <span style="margin-left: 10px">机构</span>
              </template>
            </div>
            <ul class="status-title-attribute">
              <li>当前要素认证状态：<b :class="info.class">{{info.desc}}</b></li>
              <li v-if="statusInfo.qualifyModifyDate">
                要素信息更新日期：{{statusInfo.qualifyModifyDate}}
              </li>
            </ul>
          </div>
        </div>
        <!-- 资质认证状态 -->
        <div class="qualifies-item qualifies-status" v-if="status(245)">
          <div class="status-content">
            <div>{{info.text}}</div>
            <a-button type="primary" v-if="status(1)">立即前往要素认证</a-button>
            <a-button type="primary" v-if="status(2)">编辑并重新提交</a-button>
            <a-button type="primary" v-if="status(4)">查看我提交的认证修改信息</a-button>
            <a-space v-if="status(5)">
              <a-button type="primary">编辑并重新提交</a-button>
              <a-button >放弃修改</a-button>
            </a-space>
          </div>
        </div>
        <!-- 资质认证信息 -->
        <div class="qualifies-info" v-if="status(3456)">
          <div class="info-button">
            <a-button >编辑我的资质信息</a-button>
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
            <img src="../../../../assets/img/blank_nodata.png" alt="">
            <p class="image-status-remark">您要提交的资质认证信息正在审核中 ，请您耐心等待</p>
            <a-button @click="checkQualifies" type="primary" :loading="visibleLoading">查看我提交的资质认证</a-button>
          </div>
        </div>
      </template>
    </template>
    <a-modal v-model="visible" :title="modalTitle" :maskClosable="false" :width="1000">
      <QualifyInfo :source="sourceLog" :is-lawyer="identity === 1" no-title no-date v-if="modalStep===0"/>
      <FillForm :userType="identity === 1?'lawyer':'org'" v-if="modalStep===1"
                :source="sourceLog" @toTellRes="handleSubmit" ref="fillFromRef"/>
      <template slot="footer">
        <div style="text-align: center" v-if="modalStep===0">
          <a-space>
            <a-button key="submit" type="primary" @click="modalStep = 1">修改并重新提交</a-button>
            <a-button key="back" @click="handleModalClose">关闭</a-button>
            <a-button style="margin-left: 30px;visibility: hidden">关闭</a-button>
          </a-space>
        </div>
        <div style="text-align: center" v-if="modalStep===1">
          <a-space>
            <a-button key="submit" type="primary" @click="handleEditInfo">确认修改并提交</a-button>
            <a-button key="back" @click="modalStep=0">取消</a-button>
            <a-button key="back" @click="handleModalClose" style="margin-left: 30px">关闭</a-button>
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
    4:{ desc:"认证修改审核中", text:"您提交的资质认证信息修改正在审核中，请耐心等待审核结果",class:'text-error'},
    5:{ desc:"认证修改未通过", text:"您提交的资质认证信息修改未通过审核，未通过原因：",class:'text-dangerous'},
    6:{ desc:"认证修改审核通过", text:"",class:'text-success'},
  };

export default {
  name: 'qualifies',
  nameComment: '资质认证',
  data() {
    return {
      spinning:true,
      visible:false,
      visibleLoading:false,
      editVisible:false,
      modalStep:0,
      // 0 无身份 1 律师 2 机构
      identity:0,
      // 未认证 选择状态
      nextStep:false,
      // 联系人编辑状态
      editStatus:false,
      contacts:{
        name:'言殁岚',
        phone:'17137246841'
      },
      // 相关资质信息
      source:{},
      sourceLog:{},
      contacts_name:'',
      icon:{
        law:IconLaw,
        org:IconOrg,
      },
      statusInfo:{}
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
      this.contacts.name = this.contacts_name;
      this.editStatus = false;
    },
    toEditContacts(bol){
      if(bol){
        this.editStatus = true;
      }else{
        this.editStatus = false;
        this.contacts_name = '';
      }
    },
    // 查看资质状态
    checkQualifies(){
      this.visibleLoading = true;
      const api = this.identity === 1 ? qualifies.lawyerLog : qualifies.orgLog;
      api().then(({data = {},code})=>{
        if(code === 20000){
          const {
            contact, logId, phone, qualify = {},qualifyVO = {},
          } = data || {};
          this.sourceLog = {
            contact,logId,phone,
            ...qualify,
            ...qualifyVO
          };
          this.visible = true;
        }else{
          this.$message.error('网络请求异常，请重新请求!');
        }
      }).finally(()=>{
        this.visibleLoading = false;
      })
    },
    // 判断数据当前状态
    status(rule){
      const { qualifyAuditStatus: q} = this.statusInfo;
      return  rule.toString() ? new RegExp(q).test(rule) : q;
    },
    // 关闭弹窗
    handleModalClose(){
      this.visible = false;
      this.$nextTick(()=>{
        this.modalStep = 0;
      });
    },
    //
    handleSubmit(val){
      console.log(val);
    },
    //
    handleEditInfo(e){
      const { fillFromRef } = this.$refs;
      console.log(this.$refs.fillFromRef);
      fillFromRef.handleSubmit(e);

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
  },
  mounted() {
    // const { identity, isSubmitCertify } = this.$store.getters.getInfo;
    // console.log(isSubmitCertify);
    this.identity = this.$store.getters.getInfo.identity;
    // 查询当前服务商的机构属性
    qualifies.qualify().then(({data = {},code})=>{
      if(code === 20000){
        const {
          contact, logId, phone,qualifyCondition, qualify = {},qualifyVO = {},
        } = (data['lawyerQualifyDetail'] || data['organizationQualifyDetail']) || {};
        this.statusInfo = qualifyCondition || {};
        this.contacts_name = contact;
        this.source = {
          contact,logId,phone,
          ...qualify,
          ...qualifyVO
        };
        this.spinning = false;
      }else if(code === 80001){
        this.statusInfo = {
          qualifyAuditStatus:0,
          reasonOfNotPass:'',
        };
        this.spinning = false;
      }else{
        this.$error({
          title: '提示',
          content: '网络请求异常，请重新请求!',
        });
      }
    }).catch(()=>{
      this.$error({
        title: '提示',
        content: '网络请求异常，请重新请求!',
      });
    })
  },

}
</script>

<style scoped lang='scss'>
  .qualifies-wrapper{
    height: 100%;
    background-color: #fff;
    .spin-wrapper{
      width: 100%;
      height: 40%;
      line-height: 3;
    }
    .ele-important:before{
      content:'*';
      color: #fe0b08;
    }
    .qualifies{
      &-item{
        .item-title{
          padding: 14px 32px;
          border-bottom: 1px solid $border-base;
          font-weight: bold;
          span{
            font-size: 18px;
            color: #262626;
            line-height: 32px;
            vertical-align: super;
          }
        }
        .item-title_no-border{
          border-bottom: none;
        }
        .item-content{
        }
      }
      &-status{
        .status-title{
          border-bottom: none;
          display: flex;
          justify-content: space-between;
          &-attribute{
            list-style: none;
            font-size: 12px;
            line-height: 32px;
            color: $text-content;
            font-weight: 400;
            margin: 0;
            li{
              display: inline-block;
              &:nth-child(2){
                margin-left: 40px;
              }
            }
          }
        }
        .status-content{
          margin: 0 26px;
          padding-top: 23px;
          text-align: center;
          background-color: rgba(8, 109, 217, 0.05);
          height: 112px;
          div{
            font-size: 14px;
            line-height: 20px;
            margin-bottom: 16px;
          }
          button{
            min-width: 144px;
          }
        }
      }
      &-info{
        padding: 22px 32px;
        position: relative;
        .info-image-status{
          width: 798px;
          margin: 0 auto;
          text-align: center;
          img{
            width:100%;
          }
          .image-status-remark{
            margin: 25px 0;
          }
        }
        .info-button{
          display: inline-block;
          position: absolute;
          top: 22px;
          right: 32px;
        }
        .info-item{
          padding: 7px 0;
          &_title{
            border-left: 4px solid $common-base-active;
            padding-left: 6px;
            font-size: 16px;
            height: 25px;
            line-height: 25px;
          }
          &_list{
            margin:22px 0;
            display: flex;
            line-height: 25px;
            &-title{
              width: 33.3%;
              font-size: 14px;
              color: $text-title;
              text-align: right;
              padding-right: 10px;
              &:after{
                content:'：'
              }
            }
            &-content{
              flex: 1;
              color: $text-content;
              .remark{
                display: block;
                font-size: 12px;
                color: $text-remark;
              }
            }
          }
        }
        .info-item_edit{
          line-height: 32px;
          margin:18px 0;
        }
      }
      &-choose{
        .item-title{
          font-weight: bold;
          border-bottom: none;
        }
        .choose-content{
          width: 100%;
          padding: 82px 0;
          display: flex;
          justify-content: center;
          .choose-item{
            padding: 36px 40px 31px;
            width: 292px;
            height: 454px;
            background: #ffffff;
            box-shadow: 1px 1px 6px 1px #D9D9D9;
            text-align: center;
            &:first-child{
              margin-right: 20%;
            }
            &:hover{
              background: rgba(222,222,222,0.2);
              cursor: pointer;
            }
            .item-name{
              font-size: 20px;
              line-height: 28px;
              color: #333;
              margin-top: 10px;
              margin-bottom: 5px;
            }
            .item-remark{
              min-height: 20px;
              font-size: 12px;
              color: #999999;
              line-height: 20px;
              margin-bottom: 45px;
            }
            .item-list{
              list-style: none;
              padding: 0;
              margin-bottom: 33px;
              li{
                text-align: left;
                font-size: 14px;
                line-height: 20px;
                margin: 14px 0;
                &:before{
                  content: '*';
                  color: #fe0b08;
                }
              }
            }
          }
        }
      }
    }
  }
</style>
