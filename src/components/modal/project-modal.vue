<template>
  <a-modal
      title="放弃竞标"
      v-model="visible"
      :destroyOnClose="true"
      dialogClass="fail-modal"
      :maskClosable="false"
  >
    <template slot="footer">
      <a-button key="submit" type="primary" @click="handleModify(sign)">
        确认{{ sign === 'fail' ? '放弃' : '报名' }}
      </a-button>
      <a-button key="back" @click="handleCancel">
        取消
      </a-button>
    </template>
    <div class="fail-modal-wrapper">
      <div class="header">
        <a-icon type="exclamation-circle" :style="{color:'orange',marginRight:'5px'}"/>
        <span v-if="sign==='fail'">确认要放弃以下项目的服务 竞标吗？放弃后，对该项目的竞标不可恢复!</span>
        <span v-else>确认要对以下项目进行服务报名吗？报名后，项目信息将会进入您的竞标项目管理列表，您需要完成债权尽调并提交服务方案。</span>
      </div>
      <div class="content">
        <ul>
          <li>
            <p>债务人名称：</p>
            <p>{{ projectInfo.name }}</p>
          </li>
          <li>
            <p>担保方式：</p>
            <p>{{ projectInfo.guaranty }}</p>
          </li>
          <li>
            <p>债权本金：</p>
            <p>{{ projectInfo.money1|amountTh }}万元</p>
          </li>
          <li>
            <p>债券利息：</p>
            <p>{{ projectInfo.money2|amountTh }}万元</p>
          </li>
          <li>
            <p>保证人清单：</p>
            <p v-for="item in projectInfo.guarantorsList" :key="item">{{ item }}</p>
          </li>
          <li>
            <p>
              抵押物清单：
            </p>
            <div>
              <p v-for="item in projectInfo.msgsInfoList" :key="item">{{ item }}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </a-modal>
</template>

<script>
export default {
  name: "ProjectModal",
  nameComment: '竞标报名/放弃竞标弹窗',
  data() {
    return {
      visible: false,
    }
  },
  props: {
    projectInfo: {
      type: Object,
      default: () => {
      },
    },
    sign: {
      type: String,
      default: 'signUp',
    },
  },
  methods: {
    handleOpenModal() {
      this.visible = true;
    },
    handleModify() {
      if (this.sign === 'signUp') {
        console.log('竞标报名');
      } else {
        console.log('放弃竞标');
      }
      this.visible = false;
    },
    handleCancel() {
      this.visible = false;
    },
  }
}
</script>

<style lang="scss">
.fail-modal {
  width: 1000px !important;

  .ant-modal-body {
    padding: 0 24px 24px;

    .fail-modal-wrapper {
      .header {
        padding: 33px 0;
        line-height: 20px;
        text-align: center;
        font-size: 14px;
        font-weight: bold;
      }

      .content {
        padding: 24px;
        background: rgba(8, 109, 217, 0.05);

        ul {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-wrap: wrap;

          li {
            display: flex;
            width: 25%;

            &:nth-child(n+5) {
              width: 100%;
            }

            p {
              word-break: break-all;

              &:first-child {
                color: #333;
                min-width: 84px;
                text-align: right;
              }
            }

            div {
              p {
                margin-bottom: 10px;

                &:last-child {
                  margin: 0;
                }
              }
            }
          }
        }
      }
    }
  }

  .ant-modal-footer {
    text-align: center;
    border-top: none;
    padding: 8px 0 24px;
  }
}
</style>
