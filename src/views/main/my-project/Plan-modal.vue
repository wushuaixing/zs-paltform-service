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
      <a-button
        key="submit"
        v-if="projectInfo.caseFileStatus==='0'"
        type="primary"
        @click="handleModify('add')"
      >
        确认提交
      </a-button>
      <a-button
        v-else
        key="submit"
        type="primary"
        @click="handleModify('edit')"
      >
        确认修改
      </a-button>
    </template>
    <div class="plan-modal-wrapper">
      <div class="basic-info">
        <div class="title" style="margin-top: 32px">债权基本信息</div>
        <div class="content">
          <a-row>
            <a-col :span="8">
              <span>债务人名称：</span><span>{{ projectInfo.debtor }}</span>
            </a-col>
            <a-col :span="8">
              <span>债务人注册地：</span
              ><span>{{ projectInfo.debtorAddress }}</span>
            </a-col>
            <a-col :span="8">
              <span>当前诉讼状态：</span
              ><span>{{ projectInfo.isLawsuit | isLawsuitType }}</span>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="8">
              <span>债权本金：</span
              ><span>{{ projectInfo.debtCaptial | amountTh }}万元</span>
            </a-col>
            <a-col :span="8">
              <span>债权利息：</span
              ><span>{{ projectInfo.debtInterest | amountTh }}万元</span>
            </a-col>
            <a-col :span="8">
              <span>担保方式：</span
              ><span>{{ projectInfo.security | guarantyType }}</span>
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
          ref="ruleForm"
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
              v-model.trim="form.serviceTime"
              :precision="0"
              style="width: 246px"
              :max="120"
              :min="1"
            />
            <span class="unit">个月</span>
            <span class="tips">*请将服务期限换算成月数填写，请填写正整数</span>
          </a-form-model-item>
          <a-form-model-item label="回款目标" prop="aimBackPrice">
            <a-input-number
              placeholder="请输入回款目标"
              v-model.trim="form.aimBackPrice"
              :precision="2"
              style="width: 246px"
            />
            <span class="unit">万元</span>
          </a-form-model-item>
          <a-form-model-item
            v-for="(item, index) in form.scheduleManagements"
            :label="index === 0 ? '处置计划' : '    '"
            :key="index"
            prop="scheduleManagements"
          >
            <div>
              <span>从签约日期起</span>
              <a-input-number
                v-model.trim="item.dateMonth"
                class="plan-ipt"
                :precision="0"
                style="
                  width: 235px;
                  height: 32px;
                  margin: 0 8px;
                "
              />
              <span>个月内完成</span>
              <a-input
                v-model.trim="item.dateMatters"
                :maxLength="30"
                style="
                  width: 235px;
                  height: 32px;
                  margin: 0 8px;
                "
                placeholder="阶段性目标,如腾房(30字以内)"
                class="plan-ipt"
              />
              <a-icon
                v-if="form.scheduleManagements.length > 1"
                class="dynamic-delete-button"
                type="minus-circle"
                :disabled="form.scheduleManagements.length === 1"
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
            prop="caseFileAddress"
            style="margin-top: 30px"
          >
            <div style="display: flex" v-if="!form.caseFileAddress">
              <a-upload
                v-decorator="decorator"
                v-bind="upload.bind"
                v-on="upload.on"
                @change="handleUpload"
              >
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
            <div v-else>
              <a :href="url"
                >{{form.caseFileAddress}}</a><a-icon style="padding:10px;color:#008CB0"
                  @click="form.caseFileAddress = ''"
                  type="close"
              />
            </div>
          </a-form-model-item>
        </a-form-model>
      </div>
    </div>
  </a-modal>
</template>

<script>
import { getArea } from "@/plugin/tools";
import Deploy, { getValueFromEvent } from "@/plugin/tools/qiniu-deploy";
import { submitServicePlan, modifyCase } from "@/plugin/api/my-biding";
import {getDownLoadToken} from "@/plugin/api/base"
export default {
  name: "MsgInfoModal",
  nameComment: "查看抵质押物清单弹窗",
  data() {
    return {
      visible: false,
      url:'',
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
        aimBackPrice: [
          {
            required: true,
            message: "请输入回款目标",
            trigger: "blur",
          },
        ],
        scheduleManagements: [
          {
            required: true,
          },
        ],
        caseFileAddress: [
          {
            required: true,
            message: "",
          },
        ],
      },
      decorator: [
        "confidentialityCommitmentLetter",
        {
          valuePropName: "fileList",
          getValueFromEvent,
        },
      ],
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
        aimBackPrice: "",
        scheduleManagements: [
          {
            dateMatters: "",
            dateMonth: "",
          },
          {
            dateMatters: "",
            dateMonth: "",
          },
          {
            dateMatters: "",
            dateMonth: "",
          },
        ],
        id: "",
        caseFileAddress	: "",
      },
    };
  },
  props: {
    projectInfo: {
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
    handleModify(type) {
      if(!this.form.serviceTime || !this.form.aimBackPrice)return false;
      for (let i = 0; i < this.form.scheduleManagements.length; i++) {
        let arr = this.form.scheduleManagements.filter(
          (item) => item.dateMonth === this.form.scheduleManagements[i].dateMonth
        );
        if (arr.length !== 1)
          return this.$message.error(
            "您填写了重复的计划时间，同一时间阶段的计划请填写在一个阶段性目标中！"
          );
      }
      if (this.form.caseFileAddress === "")
        return this.$message.error("请上传服务方案文档");
      if (type === "add") {
        this.form.id = this.projectInfo.id;
        submitServicePlan(this.form).then((res) => {
          console.log(res);
          if (res.code === 20000) {
            this.$message.success("方案提交成功");
            this.visible = false;
          } else {
            this.$message.error("方案提交失败,请检查信息是否填写完整");
          }
        });
      }
      if (type === "edit") {
        let _this = this;
        this.$confirm({
          title: "确定要修改已提交的方案吗?",
          content: "请确认修改后的方案核心要素信息与方案文档保持一致！",
          onOk() {
            modifyCase(_this.form).then((res) => {
              console.log(res);
              if (res.code === 20000) {
                _this.$message.success("修改成功");
                _this.visible = false;
              } else {
                _this.$message.error("修改失败,请检查信息是否填写完整");
              }
            });
          },
        });
      }
    },
    removeDomain(item) {
      let index = this.form.scheduleManagements.indexOf(item);
      if (index !== -1) {
        this.form.scheduleManagements.splice(index, 1);
      }
    },
    addDomain() {
      if (this.form.scheduleManagements.length === 20)
        return this.$message.info("处置计划最多只能添加20条");
      this.form.scheduleManagements.push({
        dateMatters: "",
        dateMonth: "",
      });
    },
    handleUpload(info){
      if(info.file.status === "done"){
        console.log(info.file)
        this.form.caseFileAddress = info.file.response.key;
        getDownLoadToken(info.file.response.key).then(res=>{
          if(res.code === 20000){
            this.url = res.data;
          }else{
            return false;
          }
        })
      }
    }
  },
  created() {
    this.servePlan = JSON.parse(window.localStorage.getItem("servePlan"));
    if (this.servePlan) {
      this.form = this.servePlan;
    }
    getDownLoadToken(this.form.caseFileAddress).then(res=>{
      if(res.code === 20000){
        this.url = res.data;
      }else{
        return false;
      }
    })
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
      .ant-row {
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
.ant-modal-confirm-btns {
  margin-right: 50%;
  transform: translateX(50%);
}
</style>
