<template>
  <div class="qualifies-wrapper">
    <a-spin :spinning="spinning" class="spin-wrapper" tip="Loading......"/>
    <div class="qualifies-item qualifies-status" v-if="false">
      <div class="item-title">
        <span>我的服务商身份：</span>
        <a-icon type="trademark" :style="{fontSize:'32px'}"/>
      </div>
      <div class="status-content">
        <div>您尚未完成要素认证，继续完成要素认证，即可查看浙商资产招商项目！</div>
        <a-button type="primary">立即前往要素认证</a-button>
      </div>
    </div>
    <div class="qualifies-info" v-if="false">
      <div class="info-button">
        <a-button>编辑我的资质信息</a-button>
      </div>
      <div class="info-item">
        <div class="info-item_title">我的资质认证信息</div>
        <div class="info-item_list">
          <div class="info-item_list-title ele-important">机构名称</div>
          <div class="info-item_list-content">鸿达资产管理有限公司</div>
        </div>
        <div class="info-item_list">
          <div class="info-item_list-title ele-important">邮箱地址</div>
          <div class="info-item_list-content">17137246841@hd.com</div>
        </div>
        <div class="info-item_list">
          <div class="info-item_list-title ele-important">备用邮箱</div>
          <div class="info-item_list-content">-</div>
        </div>
        <div class="info-item_list">
          <div class="info-item_list-title ele-important">营业执照</div>
          <div class="info-item_list-content">-</div>
        </div>
        <div class="info-item_list">
          <div class="info-item_list-title ele-important">保密承诺函</div>
          <div class="info-item_list-content">-</div>
        </div>
      </div>
      <div class="info-item">
        <div class="info-item_title">当前联络人信息</div>
        <div class="info-item_list">
          <div class="info-item_list-title ele-important">联络人姓名</div>
          <div class="info-item_list-content">鸿达资产管理有限公司</div>
        </div>
        <div class="info-item_list">
          <div class="info-item_list-title ele-important">手机号码</div>
          <div class="info-item_list-content">17137246841
            <span class="remark">*若需要更改联络人手机号码请至个人中心更改绑定手机号</span>
          </div>
        </div>
      </div>
    </div>
    <div class="qualifies-item qualifies-choose" v-if="false">
      <div class="item-title">
        <span>请选择您的服务商身份：</span>
      </div>
      <div class="choose-content">
        <div class="choose-item">
          <a-icon type="trademark" :style="{fontSize:'145px'}"/>
          <div class="item-name">律师</div>
          <div class="item-remark"></div>
          <ul class="item-list">
            <li>个人身份信息及联系方式</li>
            <li>从业资格证</li>
            <li>保密承诺函(需下载打印并盖公章)</li>
          </ul>
          <a-button type="primary">点击进入</a-button>
        </div>
        <div class="choose-item">
          <a-icon type="trademark" :style="{fontSize:'145px'}"/>
          <div class="item-name">机构</div>
          <div class="item-remark">*个人若为机构员工，请以机构名义报名</div>
          <ul class="item-list">
            <li>机构信息及联系方式</li>
            <li>营业执照</li>
            <li>保密承诺函(需下载打印并盖公章)</li>
          </ul>
          <a-button type="primary">点击进入</a-button>
        </div>
      </div>
    </div>
    <FillForm></FillForm>
  </div>
</template>

<script>
import FillForm from './fill-form';
export default {
  name: 'qualifies',
  nameComment: '资质认证',
  data() {
    return {
      attestStatus:'not',
      spinning:true,
    };
  },
  components:{
    FillForm
  },
  methods:{

  },
  mounted() {
    console.log('当前未认证！=== not ');
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
          padding: 12px 32px;
          border-bottom: 1px solid #f1f2f5;
          span{
            font-size: 18px;
            font-weight: 500;
            color: #262626;
            line-height: 32px;
            vertical-align: super;
          }
        }
        .item-content{

        }
      }
      &-status{
        border-bottom: 16px solid #f1f2f5;
        .status-content{
          padding: 27px 0 16px 0;
          text-align: center;
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
              width: 318px;
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
            background: #FFFFFF;
            box-shadow: 1px 1px 6px 1px #D9D9D9;
            text-align: center;
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
