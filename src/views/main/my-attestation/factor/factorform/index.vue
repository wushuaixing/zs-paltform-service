<template>
  <div>
    <template>
      <FormLaw/>
      <template v-if="officeInfo">
        <FormOffice/>
      </template>
      <FormOrg/>
      <FormPublic/>
    </template>
    <a-form-item :wrapperCol="{span:24}" v-if="!officeInfo">
      <a-button type="dashed" block icon="plus" @click="handleAddOffice">添加律所信息</a-button>
    </a-form-item>
    <a-form-item class="submit-btn">
      <a-button type="primary" @click="handleSubmit"> 确认无误并提交</a-button>
    </a-form-item>
  </div>
</template>

<script>
import FormLaw from './form-law';
import FormOffice from './form-office';
import FormOrg from './form-org';
import FormPublic from './form-public';
import {factor} from "@/plugin/api/attest";

export default {
  name: "FactorForm",
  components: {
    FormLaw,
    FormOffice,
    FormOrg,
    FormPublic,
  },
  data() {
    return {
      officeInfo: false,
      visible: false,
    }
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, data) => {
        if (!err) {
          factor.orgAdd({
            ...data,
            cooperatedAmc: (data.cooperatedAmc || []).join(','),
            cooperationIntention: (data.cooperationIntention || []).join(','),
            goodCases: (data.goodCases || []).join('/'),
            headOfficeAddress: (data.headOfficeAddress || []).join('/'),
            investmentArea: (data.investmentArea || []).join('/'),
            investmentPreferenceType: (data.investmentPreferenceType || []).join('/'),
            typeOfCooperationCode: (data.typeOfCooperationCode || []).join('/'),
          }).then(res => {
            console.log(res);
          });
        } else {
          console.log(err, data)
        }
      });
    },
    visibleChange(val) {
      this.visible = val;
    },
    // 移除 律所相关信息警告
    DeleteLawInfo() {
      const _this = this;
      this.$confirm({
        title: '警告',
        content: '确认退出律所信息添加吗',
        okText: '确定',
        okType: 'danger',
        cancelText: '取消',
        onOk() {
          _this.officeInfo = false;
        },
        onCancel() {
          console.log('Cancel');
        },
      });
    },
    handleAddOffice() {
      this.officeInfo = true;
    },
  }
}
</script>

<style scoped>

</style>