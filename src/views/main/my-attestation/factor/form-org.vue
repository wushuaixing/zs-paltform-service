<template>
  <div class="factor-form-wrapper form-org">
    <a-form v-bind="formItemLayout" :form="form" autocomplete="off">
      <div class="factor-form-subtitle">基本信息</div>
      <div>
        <a-form-item label="机构简介">
          <a-textarea v-decorator="field.intro.dec" v-bind="field.intro.other"/>
        </a-form-item>
        <a-form-item label="从业不良时间经验">
          <a-radio-group v-decorator="field.exp.dec">
            <a-radio value="a">暂未有实际项目落地</a-radio>
            <a-radio value="b1">1年以内</a-radio>
            <a-radio value="b2">1-3年</a-radio>
            <a-radio value="b3">3年以上</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item label="公司总部所在地">
          <a-cascader v-decorator="field.local.dec" v-bind="field.local.other" />
        </a-form-item>
        <a-form-item label="公司分部覆盖地区">
          <a-cascader v-decorator="field.local.dec" v-bind="field.local.other" />
        </a-form-item>
        <a-form-item label="清收团队数">
          <a-input v-decorator="field.teamNum.dec" v-bind="field.teamNum.other"/>
        </a-form-item>
        <a-form-item label="清收团队总人数">
          <a-input v-decorator="field.teamNumTotal.dec" v-bind="field.teamNumTotal.other"/>
        </a-form-item>
        <a-form-item label="组织架构">
          <a-textarea v-decorator="field.framework.dec" v-bind="field.framework.other"/>
        </a-form-item>
      </div>
      <div class="factor-form-subtitle">擅长优势</div>
      <div>
        <a-form-item label="组织架构">
          <a-checkbox-group v-decorator="adv.type.dec" v-bind="adv.type.other">
            <a-row :style="{lineHeight:'40px'}">
              <a-col v-for="item in adv.type.options" :key="item.id" :span="item.id===0?8:5">
                <a-checkbox :value="item.value">{{item.label}}</a-checkbox>
                <a-input v-if="item.id===0" style="width: 100px"/>
              </a-col>
            </a-row>
          </a-checkbox-group>
        </a-form-item>
        <a-form-item label="擅长业务区域">
          <a-textarea v-decorator="adv.area.dec" v-bind="adv.area.other"/>
        </a-form-item>
      </div>

    </a-form>
  </div>
</template>

<script>
const options = [
      {
        value: 'zhejiang',
        label: 'Zhejiang',
        children: [
          {
            value: 'hangzhou',
            label: 'Hangzhou',
            children: [
              {
                value: 'xihu',
                label: 'West Lake',
              },
            ],
          },
        ],
      },
      {
        value: 'jiangsu',
        label: 'Jiangsu',
        children: [
          {
            value: 'nanjing',
            label: 'Nanjing',
            children: [
              {
                value: 'zhonghuamen',
                label: 'Zhong Hua Men',
              },
            ],
          },
        ],
      },
    ];
const options1 = [
  { id: 1, label: 'Apple', value: 'Apple' },
  { id: 2, label: 'Pear', value: 'Pear' },
  { id: 3, label: 'Orange', value: 'Orange' },
  { id: 0, label: 'else', value: 'else' },
];
export default {
  name: 'FormOrgInfo',
  nameComment: '要素信息表单-机构基本信息',
  props:{
    userType:{
      type:String,
      default:'lawyer'
    }
  },
  data() {
    return {
      formItemLayout: {
        labelCol: { span: 6 },
        wrapperCol: { span: 18 },
      },
      field:{
        intro:{
          dec:['intro'],
          other:{
            placeholder:'请简要描述公司背景、主体资质、核心成员背景信息等',
            style:{
              width:'600px'
            },
            autoSize:{ minRows: 4, maxRows: 4 }
          }
        },
        exp:{
          dec:['exp', { rules: [{ required: true, message: '请选择从业不良时间经验!' }] }]
        },
        local:{
          dec:['local',{ rules: [{ required: true, message: '请选择公司总部所在地!' }] }],
          other:{
            options,
            placeholder:'请选择公司总部所在地',
            style:{
              width:'600px'
            },
          }
        },
        teamNum:{
          dec:['teamNum',{ rules: [{ required: true, message: '清收团队数不能为空' }] }],
          other:{
            placeholder:'请输入清收团队数',
            style:{  width:'200px' },
            addonAfter:"个"
          }
        },
        teamNumTotal:{
          dec:['teamNumTotal',{ rules: [{ required: true, message: '清收团队总数不能为空' }] }],
          other:{
            placeholder:'请输入清收团队数',
            style:{  width:'200px' },
            addonAfter:"个"
          }
        },
        framework:{
          dec:['framework'],
          other:{
            placeholder:'请简要描述团队组织架构',
            style:{
              width:'600px'
            },
            autoSize:{ minRows: 4, maxRows: 4 }
          }
        },
      },
      adv:{
        type:{
          dec:['exp', { rules: [{ required: true, message: '请选择从业不良时间经验!' }] }],
          options:options1,
          other:{
            style:{ width: '600px' }
          }
        },
        area:{
          dec:['area', { rules: [{ required: true, message: '请填写擅长业务区域' }] }],
          other:{
            placeholder:'包括但不限于某法院、法官，法官请以“xx法院-xx法官”形式输入，多个法院、法官间以中文顿号隔开',
            style:{
              width:'600px'
            },
            autoSize:{ minRows: 4, maxRows: 4 }
          }
        },

      }
    }
  },
  created() {
    this.form = this.$form.createForm(this);
  },
}
</script>

<style scoped lang='scss'>
.form-org{

}
</style>
<style lang='scss'>
.factor-form-wrapper{
  padding: 20px;
  .factor-form-subtitle{
    padding-left: 10px;
    font-size: 16px;
    line-height: 20px;
    height: 20px;
    border-left: 4px solid $common-base;
    text-align: left;
    margin: 10px 0;
  }
}
</style>
