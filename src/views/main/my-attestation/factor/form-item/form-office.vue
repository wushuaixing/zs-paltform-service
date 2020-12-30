<template>
  <a-form v-bind="formItemLayout" :form="form" autocomplete="off" class="attest-form">
    <div>
      <div class="factor-form-classTitle">
        <div class="classTitle_subtitle">
          <a-icon type="bank"/>
          <span>律所信息</span>
        </div>
        <div class="classTitle_action">
          <a-button type="primary" @click="DeleteLawInfo">暂不添加</a-button>
        </div>
      </div>

      <a-form-item label="律所名称">
        <a-input v-decorator="firms.name.dec" v-bind="firms.name.other"/>
      </a-form-item>
      <a-form-item label="统一社会信用代码">
        <div>123123123123</div>
        <!--        <a-input v-decorator="firms.code.dec" v-bind="firms.code.other"/>-->
      </a-form-item>
      <a-form-item label="律所地址">
        <a-input v-decorator="firms.add.dec" v-bind="firms.add.other"/>
      </a-form-item>
      <a-form-item label="展业地域">
        <el-cascader v-bind="firms.involve.other" @change="val=>handleEleCas(val,firms.involve.dec[0])"
                     @visible-change="visibleChange"/>
        <a-input v-decorator="firms.involve.dec" style="display: none"/>
      </a-form-item>
      <a-form-item label="律所类型" class="form-item-row">
        <a-radio-group v-decorator="firms.type.dec" v-bind="firms.type.other">
          <a-row>
            <a-col v-for="item in firms.type.options" :key="item.id" v-bind="item.id===0?{span:24}:{span:6}">
              <a-radio :value="item.value">{{ item.label }}</a-radio>
              <!--<a-input v-if="item.id===0" style="width: 616px" placeholder="多个方向请用中文顿号隔开"/>-->
            </a-col>
          </a-row>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="律所是否持续经营3年以上" class="form-item-row">
        <a-radio-group v-decorator="firms.year.dec" v-bind="firms.year.other">
          <a-row>
            <a-col :span="6">
              <a-radio value="1">是</a-radio>
            </a-col>
            <a-col :span="6">
              <a-radio value="2">否</a-radio>
            </a-col>
          </a-row>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="是否存在分所" class="form-item-row">
        <a-radio-group v-decorator="firms.is.dec" v-bind="firms.is.other">
          <a-row>
            <a-col :span="6">
              <a-radio value="1">是</a-radio>
            </a-col>
            <a-col :span="6">
              <a-radio value="2">否</a-radio>
            </a-col>
          </a-row>
        </a-radio-group>
      </a-form-item>
      <template v-if="getValue(firms.is.dec[0])==='1'">
        <a-form-item label="分所展业地域">
          <el-cascader v-bind="firms.part.other" @change="val=>handleEleCas(val,firms.part.dec[0])"
                       @visible-change="visibleChange"/>
          <a-input v-decorator="firms.part.dec" style="display: none"/>
        </a-form-item>
        <a-form-item label="分所人员情况">
          <a-textarea v-decorator="firms.partInfo.dec" v-bind="firms.partInfo.other"/>
        </a-form-item>
      </template>
      <a-form-item label="律所清收团队人数">
        <a-input v-decorator="firms.num.dec" v-bind="firms.num.other"/>
      </a-form-item>
      <a-form-item label="本人在律所担任职务" class="form-item-row">
        <a-radio-group v-decorator="firms.duty.dec" v-bind="firms.duty.other">
          <a-row>
            <a-col v-for="item in firms.duty.options" :key="item.id" v-bind="item.id===0?{span:24}:{span:6}">
              <a-radio :value="item.value">{{ item.label }}</a-radio>
            </a-col>
          </a-row>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="律所简介">
        <a-textarea v-decorator="firms.con.dec" v-bind="firms.con.other"/>
      </a-form-item>
      <a-form-item label="律所资质">
        <a-textarea v-decorator="firms.con1.dec" v-bind="firms.con1.other"/>
      </a-form-item>
      <a-form-item label="律所业绩介绍">
        <a-textarea v-decorator="firms.con2.dec" v-bind="firms.con2.other"/>
      </a-form-item>

    </div>
  </a-form>

</template>

<script>
import {baseWidth, formItemLayout, textarea} from "@/views/main/my-attestation/common/style";
import {areaOption, lawDuty, lawType} from "@/views/main/my-attestation/common/source";

export default {
  name: 'FormOffice',
  nameComment: '要素信息表单-律所基本信息',
  data() {
    return {
      formItemLayout,
      firms: {
        name: {
          dec: ['lawOfficeName', {rules: [{required: true, message: '律所名称不能为空'}]}],
          other: {
            placeholder: '请填写律所名称',
            ...textarea
          }
        },
        code: {
          decA: ['code', {rules: [{required: true, message: '统一社会信用代码不能为空'}]}],
          other: {
            placeholder: '请输入统一社会信用代码',
            ...textarea
          }
        },
        add: {
          dec: ['lawOfficeAddress', {rules: [{required: true, message: '律所地址不能为空'}]}],
          other: {
            placeholder: '请填写律所地址',
            ...textarea
          }
        },
        involve: {
          dec: ['officeWorkAddress', {rules: [{required: true, message: '展业地域不能为空'}]}],
          other: {
            clearable: true,
            options: areaOption,
            size: "small",
            // collapseTags:true,
            props: {
              value: 'id',
              label: 'name',
              multiple: true,
              checkStrictly: true,
            },
            placeholder: '请选择展业地域',
            ...baseWidth,
          }
        },
        type: {
          dec: ['lawOfficeType', {
            rules: [{required: true, message: '请选择律所类型'}],
          }],
          options: lawType,
          other: {
            ...baseWidth,
          }
        },
        year: {
          dec: ['isWorkForThreeYear', {
            rules: [{required: true, message: '请选择律所持续经营情况'}],
          }],
          other: {
            ...baseWidth,
          }
        },
        is: {
          dec: ['hasOtherOffice', {
            rules: [{required: true, message: '请选择律所分所情况'}],
          }],
          other: {
            ...baseWidth,
          }
        },
        part: {
          dec: ['otherOfficeWorkAddress', {rules: [{required: true, message: '分所展业地域不能为空'}]}],
          other: {
            clearable: true,
            options: areaOption,
            size: "small",
            // collapseTags:true,
            props: {
              value: 'id',
              label: 'name',
              multiple: true,
              checkStrictly: true,
            },
            placeholder: '请选择展业地域',
            ...baseWidth,
          }
        },
        partInfo: {
          dec: ['otherOfficeStaffInfo', {rules: [{required: true, message: '请填写分所人员情况'}]}],
          other: {
            placeholder: '请简述分所人员情况',
            ...textarea
          }
        },
        num: {
          dec: ['totalTeamSize', {rules: [{required: true, message: '律所清收团队人数不能为空'}]}],
          other: {
            placeholder: '请输入清收团队人数',
            style: {width: '200px'},
            addonAfter: "个"
          }
        },
        duty: {
          dec: ['roleInLawOffice', {
            rules: [{required: true, message: '请选择担任职务'}],
          }],
          options: lawDuty,
          other: {
            ...baseWidth,
          }
        },
        con: {
          dec: ['lawOfficeInformation', {rules: [{required: true, message: '请填写律所简介'}]}],
          other: {
            placeholder: '律所性质，核心成员背景，以及是否有催收公司、典当行等',
            ...textarea
          }
        },
        con1: {
          dec: ['lawOfficeQualify', {rules: [{required: true, message: '请填写律所资质'}]}],
          other: {
            placeholder: '请简述律所资质',
            ...textarea
          }
        },
        con2: {
          dec: ['lawOfficeQualifyPerformance', {rules: [{required: true, message: '请填写律所业绩介绍'}]}],
          other: {
            placeholder: '请简述执业所以往业绩',
            ...textarea
          }
        },
      },
    };
  },
  created() {
    this.form = this.$form.createForm(this);
  },
  methods: {
    getValue(field) {
      if (field) return this.form.getFieldValue(field);
    },
    visibleChange(val) {
      this.visible = val;
    },
    // ele 地区多选事件触发
    handleEleCas(val = [], field) {
      const {setFieldsValue, setFields} = this.form;
      if (!this.visible && !val.length) {
        setFields({
          [field]: {
            value: undefined,
            errors: [new Error('主要涉业地区不能为空')]
          }
        })
      } else {
        const str = (val.map(i => i.join('/')).toString());
        console.log(str);
        setFieldsValue({[field]: str});
      }
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

<style scoped lang='scss'>

</style>
