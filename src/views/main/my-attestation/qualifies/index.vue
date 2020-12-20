<template>
  <div class="qualifies-wrapper">
    <a-spin :spinning="spinning" class="spin-wrapper" tip="Loading......"/>
    <template v-if="!spinning">
      <!--  选择身份：  -->
      <div class="qualifies-item qualifies-choose" v-if="attestStatus === 'not'">
        <div class="item-title">
          <span>请选择您的服务商身份：</span>
        </div>
        <div class="choose-content">
          <div class="choose-item" @click="handleChoose('lawyer')">
            <img :src="icon.law" alt="" style="width: 145px;margin:0 auto;">
            <div class="item-name">律师</div>
            <div class="item-remark"></div>
            <ul class="item-list">
              <li>个人身份信息及联系方式</li>
              <li>从业资格证</li>
              <li>保密承诺函(需下载打印并盖公章)</li>
            </ul>
          </div>
          <div class="choose-item" @click="handleChoose('org')">
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
      <FillForm v-if="attestStatus === 'wait'" :userType="identity">
        <div class="qualifies-item" slot="title">
          <div class="item-title item-title_no-border">
            <span>您当前选择的服务商身份为：</span>
            <template v-if="identity ==='lawyer'">
              <img :src="icon.law" alt="" style="height: 32px;vertical-align: top;">
              <span style="margin-left: 10px">律师</span>
            </template>
            <template v-else>
              <img :src="icon.org" alt="" style="height: 32px;vertical-align: top;">
              <span style="margin-left: 10px">律师</span>
            </template>
            <a-button style="float:right" @click="stepBack">上一步</a-button>
          </div>
        </div>
      </FillForm>
      <!--  信息展示：含提示  -->
      <template v-if="attestStatus === 'yet'">
        <div class="qualifies-item qualifies-status">
          <div class="item-title status-title">
            <span>我的服务商身份：</span>
            <a-icon type="trademark" :style="{fontSize:'32px'}"/>
          </div>
          <div class="status-content">
            <div>您尚未完成要素认证，继续完成要素认证，即可查看浙商资产招商项目！</div>
            <a-button type="primary">立即前往要素认证</a-button>
          </div>
        </div>
        <div class="qualifies-info">
          <div class="info-button">
            <a-button>编辑我的资质信息</a-button>
          </div>
          <div class="info-item">
            <div class="info-item_title">我的资质认证信息</div>
            <div class="info-item_list">
              <div class="info-item_list-title">机构名称</div>
              <div class="info-item_list-content">鸿达资产管理有限公司</div>
            </div>
            <div class="info-item_list">
              <div class="info-item_list-title">邮箱地址</div>
              <div class="info-item_list-content">17137246841@hd.com</div>
            </div>
            <div class="info-item_list">
              <div class="info-item_list-title">备用邮箱</div>
              <div class="info-item_list-content">-</div>
            </div>
            <div class="info-item_list">
              <div class="info-item_list-title">营业执照</div>
              <div class="info-item_list-content">-</div>
            </div>
            <div class="info-item_list">
              <div class="info-item_list-title">保密承诺函</div>
              <div class="info-item_list-content">-</div>
            </div>
          </div>
          <div class="info-item">
            <div class="info-item_title">当前联络人信息</div>
            <div class="info-item_list info-item_edit">
              <div class="info-item_list-title ele-important">联络人姓名</div>
              <div class="info-item_list-content">
                <template v-if="!editStatus">
                  <span>{{contacts.name}}</span>
                  <a-button size="small" type="link" icon="edit" @click="editStatus=true"></a-button>
                </template>
                <a-space v-else>
                  <a-input placeholder="请输入联络人姓名"  style="width: 150px;" v-model="contacts_name"/>
                  <a-button size="small" type="primary" @click="handleUpdate"><a-icon type="check" /></a-button>
                  <a-button size="small" @click="editStatus=false"><a-icon type="close" /></a-button>
                </a-space>
              </div>
            </div>
            <div class="info-item_list" style="margin-top: 0">
              <div class="info-item_list-title">手机号码</div>
              <div class="info-item_list-content">{{contacts.phone}}
                <span class="remark">*若需要更改联络人手机号码请至个人中心更改绑定手机号</span>
              </div>
            </div>
          </div>
        </div>
      </template>
    </template>
  </div>
</template>

<script>
import FillForm from './fill-form';
import IconLaw from '@/assets/img/lawyer.png';
import IconOrg from '@/assets/img/org.png';

export default {
  name: 'qualifies',
  nameComment: '资质认证',
  data() {
    return {
      // not 未认证 wait 认证中 yet 已填写
      attestStatus:'yet',
      identity:'',
      spinning:true,
      editStatus:false,
      contacts:{
        name:'言殁岚',
        phone:'17137246841'
      },
      contacts_name:'言殁岚',
      icon:{
        law:IconLaw,
        org:IconOrg,

      }
    };
  },
  created(){
    const { isCertification } = this.$store.getters.getInfo;
    this.attestStatus = isCertification === 0 ? 'not' : 'yet';
  },
  components:{
    FillForm
  },
  methods:{
    handleChoose(val){
      this.attestStatus = 'wait';
      this.identity = val;
    },
    stepBack(){
      const _this = this;
      this.$confirm({
        title: '确定返回服务商身份选择吗？',
        content: '返回后，将清空当前填写的所有内容。',
        onOk() {
          _this.attestStatus = 'not';
          _this.identity = '';
        },
        onCancel() {},
      });
    },
    handleUpdate(){
      if(!this.contacts_name) return this.$message.error('联系名称不能为空！');
      this.contacts.name = this.contacts_name;
      this.editStatus = false;
    }

  },
  mounted() {
    // console.log('当前未认证！=== not ');
    setTimeout(()=>{
      this.spinning = false;
    },300)
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
          border-bottom: 1px solid #f1f2f5;
          span{
            font-size: 18px;
            font-weight: 500;
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
        }
      }
      &-info{
        padding: 22px 32px;
        position: relative;
        .info-button{
          display: inline-block;
          position: absolute;
          top: 22px;
          right: 32px;
        }
        .info-item{
          padding-top: 6px;
          padding-bottom: 10px;
          &_title{
            border-left: 4px solid #086DD9;
            padding-left: 6px;
            font-size: 16px;
            height: 20px;
            line-height: 20px;
          }
          &_list{
            margin:24px 0;
            display: flex;
            line-height: 20px;
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
                margin-left: 100px;
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
        .choose-content{
          width: 100%;
          padding: 82px 18%;
          display: flex;
          justify-content: space-between;
          .choose-item{
            padding: 36px 40px 31px;
            width: 292px;
            height: 454px;
            background: #ffffff;
            box-shadow: 1px 1px 6px 1px #D9D9D9;
            text-align: center;
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
