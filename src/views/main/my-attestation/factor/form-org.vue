<template>
  <div class="factor-form-wrapper form-org">
    <a-form v-bind="formItemLayout" :form="form" autocomplete="off">
      <div class="factor-form-subtitle">基本信息</div>
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
      <div class="factor-form-subtitle">擅长优势</div>
      <a-form-item label="擅长业务类型" class="form-item-row">
        <a-checkbox-group v-decorator="adv.type.dec" v-bind="adv.type.other">
          <a-row :style="{lineHeight:'40px'}">
            <a-col v-for="item in adv.type.options" :key="item.id" :span="item.id===0?9:5">
              <a-checkbox :value="item.value">{{item.label}}</a-checkbox>
              <a-input v-if="item.id===0" style="width: 180px" placeholder="多个方向请用中文顿号隔开"/>
            </a-col>
          </a-row>
        </a-checkbox-group>
      </a-form-item>
      <a-form-item label="擅长业务区域" >
        <a-textarea v-decorator="adv.area.dec" v-bind="adv.area.other"/>
      </a-form-item>
      <div class="factor-form-subtitle">历史合作情况</div>
      <a-form-item label="是否曾与四大合作" class="form-item-row">
        <a-radio-group v-decorator="history.is.dec" v-bind="history.is.other">
          <a-row>
            <a-col :span="5"><a-radio value="a">是</a-radio></a-col>
            <a-col :span="5"><a-radio value="b">否</a-radio></a-col>
          </a-row>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="组织架构" class="form-item-row">
        <a-checkbox-group v-decorator="history.type.dec" v-bind="history.type.other">
          <a-row :style="{lineHeight:'40px'}">
            <a-col v-for="item in history.type.options" :key="item.id" :span="5">
              <a-checkbox :value="item.value">{{item.label}}</a-checkbox>
            </a-col>
          </a-row>
        </a-checkbox-group>
      </a-form-item>
      <a-form-item label="是否曾与浙商合作" class="form-item-row" >
        <a-radio-group v-decorator="history.once.dec" v-bind="history.once.other" >
          <a-row>
            <a-col :span="5"><a-radio value="a">是</a-radio></a-col>
            <a-col :span="5"><a-radio value="b">否</a-radio></a-col>
            <a-col :span="10">
              <a-radio value="c">其他</a-radio>
              <a-input style="width: 180px" placeholder="请说明情况"/>
            </a-col>
          </a-row>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="过往合作类型" class="form-item-row">
        <a-checkbox-group v-decorator="history.coo.dec" v-bind="history.coo.other">
          <a-row :style="{lineHeight:'40px'}">
            <a-col v-for="item in history.coo.options" :key="item.id" :span="item.id===4?8:5">
              <a-checkbox :value="item.value">{{item.label}}</a-checkbox>
              <a-input v-if="item.id===0" style="width: 100px"/>
            </a-col>
          </a-row>
        </a-checkbox-group>
      </a-form-item>
      <a-form-item label="历史合作团队">
        <a-textarea v-decorator="history.team.dec" v-bind="history.team.other"/>
      </a-form-item>
      <a-form-item label="历史清收情况">
        <a-textarea v-decorator="history.col.dec" v-bind="history.col.other"/>
      </a-form-item>
      <a-form-item label="其他AMC合作情况">
        <a-textarea v-decorator="history.other.dec" v-bind="history.other.other"/>
      </a-form-item>
      <div class="factor-form-subtitle">后续期望合作方向</div>
      <a-form-item label="合作意向" class="form-item-row">
        <a-checkbox-group v-decorator="dir.intent.dec" v-bind="dir.intent.other">
          <a-row :style="{lineHeight:'40px'}">
            <a-col v-for="item in dir.intent.options" :key="item.id" :span="item.id===0?9:5">
              <a-checkbox :value="item.value">{{item.label}}</a-checkbox>
              <a-input v-if="item.id===0" style="width: 180px" placeholder="多个方向请用中文顿号隔开"/>
            </a-col>
          </a-row>
        </a-checkbox-group>
      </a-form-item>
      <a-form-item label=" ">
        <a-button type="primary" @click="handleSubmit"> 确认无误并提交 </a-button>
      </a-form-item>
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
  { id: 1, label: '工业', value: 'Apple' },
  { id: 2, label: '商业', value: 'Pear' },
  { id: 3, label: '住宅', value: 'Orange' },
  { id: 0, label: '其他', value: 'else' },
];
const options2 = [
  { id: 1, label: '东方', value: '1' },
  { id: 2, label: '长城', value: '2' },
  { id: 3, label: '华融', value: '3' },
  { id: 4, label: '信达', value: '4' },
];
const options3 = [
  { id: 1, label: '配资收购', value: '1' },
  { id: 2, label: '资产包收购', value: '2' },
  { id: 3, label: '债权清收', value: '3' },
  { id: 4, label: '其他（投行等）', value: '4' },
];
const options4 = [
  { id: 1, label: '清收', value: '1' },
  { id: 2, label: '跟投', value: '2' },
  { id: 3, label: '介绍投资人', value: '3' },
  { id: 0, label: '其他', value: '4' },
];

const baseWidth = {
  style:{
    width:'650px'
  }
}
const textarea = {
  ...baseWidth,
  autoSize:{ minRows: 4 }
}
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
            ...textarea
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
            ...baseWidth,
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
            ...textarea
          }
        },
      },
      adv:{
        type:{
          dec:['exp', { rules: [{ required: true, message: '请选择从业不良时间经验!' }] }],
          options:options1,
          other:{
            ...baseWidth,
          }
        },
        area:{
          dec:['area', { rules: [{ required: true, message: '请填写擅长业务区域' }] }],
          other:{
            placeholder:'包括但不限于某法院、法官，法官请以“xx法院-xx法官”形式输入，多个法院、法官间以中文顿号隔开',
            ...textarea
          }
        },
      },
      history:{
        is:{
          dec:['is',{ rules: [{ required: true, message: '请选择历史合作情况' }] }],
          other:{
            ...baseWidth,
          }
        },
        type:{
          dec:['typeName', { rules: [{ required: true, message: '至少勾选一项历史合作四大' }] }],
          options:options2,
          other:{
            ...baseWidth,
          }
        },
        once:{
          dec:['once', { rules: [{ required: true, message: '请选择合作情况' }] }],
          options:options3,
          other:{
            ...baseWidth,
          }
        },
        coo:{
          dec:['coo', { rules: [{ required: true, message: '请勾选合作类型' }] }],
          options:options3,
          other:{
            ...baseWidth,
          }
        },
        team:{
          dec:['hTeam', { rules: [{ required: true, message: '请填写擅长业务区域' }] }],
          other:{
            placeholder:'请输入过往合作过的浙商团队，多个团队以中文顿号隔开',
            ...textarea
          }
        },
        col:{
          dec:['hCol', { rules: [{ required: true, message: '请填写擅长业务区域' }] }],
          other:{
            placeholder:'请简要描述过往合作项目的清收情况',
            ...textarea
          }
        },
        other:{
          dec:['otherCol'],
          other:{
            placeholder:'请简要描述与其他AMC公司合作的情况',
            ...textarea
          }
        },
      },
      dir:{
        intent:{
          dec:['intent', { rules: [{ required: true, message: '请勾选合作意向' }] }],
          options:options4,
          other:{
            ...baseWidth,
          }
        }
      }
    }
  },
  created() {
    this.form = this.$form.createForm(this);
  },
  methods:{
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
        }
      });
    },
  }
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
  .form-item-row{
    .ant-form-item-children{
      display: block;
      .ant-radio-group,.ant-checkbox-group{
        display: block;
      }
    }
    .ant-row{
      line-height: 40px;

    }
  }
}
</style>
