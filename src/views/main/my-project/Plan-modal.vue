<template>
  <a-modal
      title="浙江混天绫实业有限公司-服务方案"
      v-model="visible"
      :destroyOnClose="true"
      dialogClass="plan-modal"
      :maskClosable="false"
  >
    <template slot="footer">
      <a-button key="back" @click="handleCancel">
        取消
      </a-button>
      <a-button key="submit" type="primary" @click="handleModify(sign)">
        确认提交
      </a-button>
    </template>
    <div class="plan-modal-wrapper">
      <div class="basic-info">
        <div class="title">
          债权基本信息
        </div>
        <ul class="content">
          <li v-for="item in data" :key="item.val">
            <div>{{ item.label }}</div>
            <div>{{ `${item.val}${item.unit}` }}</div>
          </li>
        </ul>
      </div>
      <div class="plan">
        <div class="title">服务方案核心要素</div>
        <a-form-model :model="form" :label-col="labelCol" :wrapper-col="wrapperCol">
          <a-form-model-item label="服务期限" class="serviceTime">
            <a-input-number v-model="form.serviceTime" style="width: 246px" maxLength="120"/>
            <span class="unit">个月</span>
            <span class="tips">*请将服务期限换算成月数填写，请填写正整数</span>
          </a-form-model-item>
          <a-form-model-item label="回款目标">
            <a-input-number v-model="form.collectionTarget" :precision="2" style="width: 246px"/>
            <span class="unit">万元</span>
          </a-form-model-item>
        </a-form-model>
        <div class="title">服务方案核心要素</div>

      </div>
    </div>

  </a-modal>
</template>

<script>
import {getArea} from "@/plugin/tools";

export default {
  name: "MsgInfoModal",
  nameComment: '查看抵质押物清单弹窗',
  data() {
    return {
      visible: false,
      data: [
        {
          label: '债务人名称：',
          val: '浙江混天绫实业有限公司',
          unit: '',
        },
        {
          label: '债务人注册地：',
          val: '浙江省杭州市西湖区',
          unit: '',
        },
        {
          label: '当前诉讼状态：',
          val: '未诉',
          unit: '',
        },
        {
          label: '债权本金：',
          val: '781.4',
          unit: '万元',
        },
        {
          label: '债权利息：',
          val: '534900953',
          unit: '万元',
        },
        {
          label: '担保方式：',
          val: '抵押+担保',
          unit: '',
        },

      ],
      labelCol: {span: 4},
      wrapperCol: {span: 14},
      form: {
        serviceTime: "",
        collectionTarget: "",
        plans: [
          {
            content: "",
            months: 0
          }
        ],
        projectId: "",
        documentAddress: "",
      },
    }
  },
  props: {
    msgInfo: {
      type: Object,
      default: () => {
      },
    },
  },
  methods: {
    handleOpenModal() {
      this.visible = true;
    },
    handleCancel() {
      this.visible = false;
    },
    handleNumValid(params) {
      this.form[params] = this.form[params].replace(/[^0-9]/g, '');
    }
  },
  filters: {
    area: (params) => {
      return getArea(params.provinceCode, params.cityCode, params.areaCode);
    },
  }
}
</script>

<style lang="scss">
.plan-modal {
  width: 1200px !important;

  .ant-modal-content {
    width: 100%;

    .ant-modal-body {
      padding: 0 24px 27px !important;

      .basic-info {
        ul {
          list-style: none;
          display: flex;
          flex-wrap: wrap;

          li {
            display: flex;
            width: 33%;
          }
        }
      }

      .plan {
        .serviceTime {
          .tips {
            font-size: 12px;
            color: #999999;
            padding-left: 12px;
          }
        }

        .ant-form-item-children {
          .unit {
            background-color: #EFEFEF;
            height: 32px;
            border: 1px solid #D9D9D9;
            border-left: none;
            display: inline-block;
            padding: 0 10px;
            vertical-align: center;
            line-height: 31px;
          }

          .ant-input-number {
            border-radius: 0;
          }
        }
      }
    }
  }
}
</style>
