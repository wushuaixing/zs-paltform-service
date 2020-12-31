<template>
  <a-modal
    title="浙江混天绫实业有限公司-服务方案"
    v-model="visible"
    :destroyOnClose="true"
    dialogClass="plan-modal"
    :centered="true"
    :maskClosable="false"
  >
    <template slot="footer">
      <a-button key="back" @click="handleCancel"> 取消 </a-button>
      <a-button key="submit" type="primary" @click="handleModify(sign)">
        确认提交
      </a-button>
      <a-button
        v-if="false"
        key="submit"
        type="primary"
        @click="handleModify(modify)"
      >
        确认修改
      </a-button>
    </template>
    <div class="plan-modal-wrapper">
      <div class="basic-info">
        <div class="title" style="margin-top: 32px">债权基本信息</div>
        <!-- <ul class="content">
          <li v-for="item in data" :key="item.val">
            <div>{{ item.label }}</div>
            <div>{{ `${item.val}${item.unit}` }}</div>
          </li>
        </ul> -->
        <div  class="content">
          <a-row>
            <a-col :span="8">
              <span>债务人名称：</span><span>{{msgInfo.debtor}}</span>
            </a-col>
            <a-col :span="8">
              <span>债务人注册地：</span><span>{{msgInfo.debtorAddress}}</span>
            </a-col>
            <a-col :span="8">
              <span>当前诉讼状态：</span><span>{{msgInfo.isLawsuit|isLawsuitType}}</span>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="8">
              <span>债权本金：</span><span>{{msgInfo.debtCaptial | amountTh}}万元</span>
            </a-col>
            <a-col :span="8">
              <span>债权利息：</span><span>{{msgInfo.debtInterest|amountTh}}万元</span>
            </a-col>
            <a-col :span="8">
              <span>担保方式：</span><span>{{msgInfo.security | guarantyType}}</span>
            </a-col>
          </a-row>
        </div>
      </div>
      <div class="plan">
        <div class="title" style="margin-top: 32px">服务方案</div>
        <div class="title" style="margin-top: 14px">服务方案核心要素</div>
        <a-form-model
          :model="form"
          :rules="rules"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
        >
          <a-form-model-item
            label="服务期限"
            prop="serviceTime"
            class="serviceTime"
          >
            <a-input-number
              placeholder="请输入服务期限"
              v-model="form.serviceTime"
              :precision="0"
              style="width: 246px"
              :max="120"
            />
            <span class="unit">个月</span>
            <span class="tips">*请将服务期限换算成月数填写，请填写正整数</span>
          </a-form-model-item>
          <a-form-model-item label="回款目标" prop="collectionTarget">
            <a-input-number
              placeholder="请输入回款目标"
              v-model="form.collectionTarget"
              :precision="2"
              style="width: 246px"
            />
            <span class="unit">万元</span>
          </a-form-model-item>
          <a-form-model-item
            v-for="(item, index) in form.plans"
            :label="index === 0 ? '处置计划' : '    '"
            :key="index"
          >
            <div>
              <span>从签约日期起</span
              ><a-input
                v-model="item.months"
                class="plan-ipt"
                style="
                  width: 235px;
                  height: 32px;
                  border-radius: 0px;
                  margin: 0 8px;
                "
              />
              <span>个月内完成</span
              ><a-input
                v-model="item.content"
                :maxLength="30"
                style="
                  width: 235px;
                  height: 32px;
                  border-radius: 0px;
                  margin: 0 8px;
                "
                placeholder="阶段性目标,如腾房(30字以内)"
                class="plan-ipt"
              />
              <a-icon
                v-if="form.plans.length > 1"
                class="dynamic-delete-button"
                type="minus-circle"
                :disabled="form.plans.length === 1"
                @click="removeDomain(item)"
              />
            </div>
          </a-form-model-item>
          <a-form-model-item v-bind="formItemLayoutWithOutLabel">
            <a-button type="dashed" style="width: 60%" @click="addDomain">
              <a-icon type="plus" />
            </a-button>
          </a-form-model-item>
          <div class="title">服务方案完整文档</div>
          <a-form-model-item
            label="服务方案文档"
            prop="documentAddress"
            style="margin-top: 30px"
          >
            <div style="display: flex">
              <a-upload v-bind="upload.bind" v-on="upload.on">
                <a-button> <a-icon type="upload" />上传文件</a-button>
              </a-upload>
              <span style="font-size: 12px; margin-left: 10px">
                *支持pdf，word格式，请务必按照方案模版进行撰写
              </span>
              <span
                style="
                  font-size: 12px;
                  margin-left: 10px;
                  color: #008cb0;
                  text-decoration: underline;
                "
                >服务方案模版下载</span
              >
            </div>
          </a-form-model-item>
        </a-form-model>
      </div>
    </div>
  </a-modal>
</template>

<script>
import { getArea } from "@/plugin/tools";
import Deploy from "@/plugin/tools/qiniu-deploy";
export default {
  name: "MsgInfoModal",
  nameComment: "查看抵质押物清单弹窗",
  data() {
    return {
      visible: false,
      data: [
        {
          label: "债务人名称：",
          val: "浙江混天绫实业有限公司",
          unit: "",
        },
        {
          label: "债务人注册地：",
          val: "浙江省杭州市西湖区",
          unit: "",
        },
        {
          label: "当前诉讼状态：",
          val: "未诉",
          unit: "",
        },
        {
          label: "债权本金：",
          val: "781.4",
          unit: "万元",
        },
        {
          label: "债权利息：",
          val: "534900953",
          unit: "万元",
        },
        {
          label: "担保方式：",
          val: "抵押+担保",
          unit: "",
        },
      ],
      formItemLayout: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 4 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 20 },
        },
      },
      formItemLayoutWithOutLabel: {
        wrapperCol: {
          xs: { span: 24, offset: 0 },
          sm: { span: 20, offset: 4 },
        },
      },
      rules: {
        serviceTime: [
          {
            required: true,
            message: "请输入服务期限",
            trigger: "blur",
          },
        ],
        collectionTarget: [
          {
            required: true,
            message: "请输入回款目标",
            trigger: "blur",
          },
        ],
        plans: [
          {
            required: true,
          },
        ],
        documentAddress: [
          {
            required: true,
          },
        ],
      },
      upload: {
        bind: {
          ...Deploy.props,
          accept: "application/pdf,.doc,.docx,application/msword",
          class: "upload-wrapper",
        },
        on: {
          ...Deploy.event,
        },
      },
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      form: {
        serviceTime: "",
        collectionTarget: "",
        plans: [
          {
            content: "",
            months: '',
          },
          {
            content: "",
            months: '',
          },
          {
            content: "",
            months: '',
          },
        ],
        projectId: "",
        documentAddress: "",
      },
    };
  },
  props: {
    msgInfo: {
      type: Object,
      default: () => {},
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
      this.form[params] = this.form[params].replace(/[^0-9]/g, "");
    },
    removeDomain(item) {
      let index = this.form.plans.indexOf(item);
      if (index !== -1) {
        this.form.plans.splice(index, 1);
      }
    },
    addDomain() {
      if(this.form.plans.length === 20) return this.$message.info("处置计划最多只能添加20条");
      this.form.plans.push({
        content: '',
        months: '',
      });
    },
  },
  created(){
    // this.form = this.msgInfo;
  },
  filters: {
    area: (params) => {
      return getArea(params.provinceCode, params.cityCode, params.areaCode);
    },
  },
};
</script>

<style lang="scss">
.plan-modal {
  width: 1200px !important;
  .plan-modal-wrapper {
    .content {
      margin-left: 20px;
      .ant-row{
        margin-top: 24px;
      }
    }
  }
  .ant-modal-content {
    width: 100%;
    .ant-modal-title {
      font-size: 18px;
      font-weight: 600;
      color: #333333;
    }
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
          margin-top: 24px;
          .tips {
            font-size: 12px;
            color: #999999;
            padding-left: 12px;
          }
        }

        .ant-form-item-children {
          .unit {
            background-color: #efefef;
            height: 32px;
            border: 1px solid #d9d9d9;
            border-left: none;
            display: inline-block;
            padding: 0 10px;
            vertical-align: center;
            line-height: 30px;
          }

          .ant-input-number {
            border-radius: 0;
          }
        }
      }
    }
    .ant-modal-footer {
      text-align: center;
    }
    .plan-item ~ .plan-item {
      margin-top: 24px;
    }
    .plan-item {
      .plan-ipt {
        width: 240px;
        height: 32px;
        border-radius: 0px;
        margin: 0 8px;
      }
    }
    .title {
      font-size: 16px;
      font-weight: 600;
      color: #333333;
    }
  }
}
</style>
