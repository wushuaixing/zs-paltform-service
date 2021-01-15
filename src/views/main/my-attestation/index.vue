<template>
  <div class="attest-wrapper">
    <Breadcrumb :source="sourceList" icon="environment" />
    <div class="attest-content">
      <router-view/>
    </div>
  </div>
</template>

<script>
import Breadcrumb from '@/components/bread-crumb';
const reg = new RegExp('/attest/qualifies');
export default {
  name: 'myAttestation',
  nameComment: '我的认证',
  data() {
    return {
      routeState:1,
    };
  },
  created() {
    const { path } = this.$route;
    this.routeState = reg.test(path) ? 1 : 2;
  },
  components:{
    Breadcrumb
  },
  computed:{
    sourceList:function () {
      return [
        { id:1,title:'我的认证',path:'/attest/qualifies'},
        this.routeState === 1 && {id:2,title:'资质认证',path:'/attest/qualifies'},
        this.routeState === 2 && {id:3,title:'要素认证',path:'/attest/factor'},
      ].filter(i=>i)
    }
  },
  watch:{
    $route(to,from){
      // console.log("to.path",to.path,from.path);
      if(to.path !== from.path) this.routeState = reg.test(this.$route.path) ? 1 : 2;
    }
  }
}
</script>

<style scoped lang='scss'>
.attest-wrapper{
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 16px;
  .attest-content{
    flex: 1;
  }
}
</style>

<style lang='scss'>

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
			background-color: #ffffff;
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
					margin-right: 10px;
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
          width:80%;
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
        z-index: 1;
      }
      .info-item{
        padding: 7px 0;
        &_title{
          border-left: 4px solid $common-base-active;
          padding-left: 10px;
          font-size: 16px;
					font-weight: bold;
          height: 22px;
          line-height: 22px;
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
              content:'\ff1a'
            }
          }
          &-content{
            flex: 1;
            color: $text-content;
            .remark{
              display: inline-block;
							margin-left: 20px;
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
.qualifies-info-wrapper{
  .info-item{
    padding: 7px 0;
    position: relative;
    &_date{
      position: absolute;
      top: 0;
      right: 0;
      text-align: left;
      height: 20px;
      line-height: 20px;
      font-size: 14px;
      color: $text-remark;
      span{
        color: $text-title;
      }
    }
    &_title{
			border-left: 4px solid $common-base-active;
			padding-left: 10px;
			font-size: 16px;
			font-weight: bold;
      height: 22px;
      line-height: 22px;
    }
		&_subtitle{
			font-size: 14px;
			height: 25px;
			line-height: 25px;
			color: $text-title;
		}
    &_list{
      margin:22px 0;
      padding-right: 50px;
      display: flex;
      line-height: 25px;
      &-title{
        width: 25%;
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
}
.attest-form{
	.ant-form-item-with-help{
		margin-bottom: 0;
	}
	.ant-form-item-label,.ant-form-item-control{
		line-height: 32px;
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
</style>
