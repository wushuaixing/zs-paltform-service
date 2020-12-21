<template>
  <a-modal
      :title="name"
      v-model="visible"
      :destroyOnClose="true"
      dialogClass="msgs-modal"
      :maskClosable="false"
      :footer="null"
  >
    <div class="msgs-modal-wrapper">
      <div class="part">
        <div class="title">
          保证人
        </div>
        <p>浙江天赐生态科技有限公司，张三，李四</p>
      </div>
      <div class="part">
        <div class="title">
          抵押物
        </div>
        <a-table :columns="msgInfoColumns" :data-source="msgInfo">
          <template slot="type" slot-scope="{type}">
            <span v-for="item in type" :key="item" :style="{marginRight:'5px'}">{{ MSGS_TYPE[item] }}</span>
          </template>
        </a-table>
      </div>
    </div>
  </a-modal>
</template>

<script>
import {msgInfoColumns, MSGS_TYPE} from "./source";

export default {
  name: "MsgInfoModal",
  nameComment: '查看抵质押物清单弹窗',
  data() {
    return {
      visible: false,
      msgInfoColumns,
      MSGS_TYPE,
      name: '浙江混天绫实业有限公司',
      msgInfo: [
        {
          key: 1,
          number: 1,//序号
          name: '浙江混天绫实业有限公司', //债务人名称
          type: 1,
          area: '广东省湛江市',//抵质押物分布区域
          msgsName: '贵州省遵义市播州区鸭溪镇黎明路溪城鸣苑2栋1层1-11号商业用房',
        },
      ]
    }
  },
  methods: {
    handleOpenModal() {
      this.visible = true;
    }
  }
}
</script>

<style lang="scss">
.msgs-modal {
  width: 1000px !important;

  .ant-modal-content {
    .ant-modal-body {
      padding: 0 24px 27px;

      .part {
        padding-top: 32px;

        .title {
          color: #333;
          font-weight: 700;
          margin-bottom: 24px;
          line-height: 14px;
        }

        p {
          padding-left: 17px;
          margin: 0;
        }
      }
    }
  }
}
</style>
