<template>
  <div class="factor-form-wrapper">
    <a-form v-bind="formItemLayout" :form="form" autocomplete="off" class="attest-form">
      <div class="factor-form-subtitle"><span>基本信息</span></div>
      <a-form-item label="毕业院校">
        <a-input v-decorator="field.college.dec" v-bind="field.college.other"/>
      </a-form-item>
      <a-form-item label="专业">
        <a-input v-decorator="field.major.dec" v-bind="field.major.other"/>
      </a-form-item>
      <a-form-item label="从业不良时间经验">
        <a-radio-group v-decorator="field.exp.dec" v-bind="field.exp.other">
          <a-row>
            <a-col v-for="item in field.exp.options" :key="item.id" v-bind="item.id!==4?{span:5}:{}">
              <a-radio :value="item.value">{{item.label}}</a-radio>
            </a-col>
          </a-row>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="所在地区">
        <a-cascader v-decorator="field.local.dec" v-bind="field.local.other" />
      </a-form-item>
      <a-form-item label="主要涉业地区">
        <a-cascader v-decorator="field.involve.dec" v-bind="field.involve.other" />
      </a-form-item>
      <a-form-item label="是否有公检法等工作经历" class="form-item-row">
        <a-radio-group v-decorator="field.isPub.dec" v-bind="field.isPub.other">
          <a-row>
            <a-col :span="5"><a-radio :value="true">是</a-radio></a-col>
            <a-col :span="5"><a-radio :value="false">否</a-radio></a-col>
          </a-row>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="当前是否存在其他兼职/任职" class="form-item-row">
        <a-radio-group v-decorator="field.avo.dec" v-bind="field.avo.other">
          <a-row>
            <a-col :span="5"><a-radio :value="true">是</a-radio></a-col>
            <a-col :span="5"><a-radio :value="false">否</a-radio></a-col>
          </a-row>
        </a-radio-group>
      </a-form-item>
      <div v-if="relation.isAvo">
        <a-form-item label="兼职/任职单位名称">
          <a-input v-decorator="field.avoSite.dec" v-bind="field.avoSite.other"/>
        </a-form-item>
        <a-form-item label="兼职/任职职务">
          <a-input v-decorator="field.avoPost.dec" v-bind="field.avoPost.other"/>
        </a-form-item>
      </div>

      <div class="factor-form-subtitle"><span>擅长优势</span></div>
      <a-form-item label="擅长业务类型" class="form-item-row">
        <a-checkbox-group v-decorator="adv.type.dec" v-bind="adv.type.other">
          <a-row>
            <a-col v-for="item in adv.type.options" :key="item.id" v-bind="item.id!==0?{span:5}:{}">
              <a-checkbox :value="item.value">{{item.label}}</a-checkbox>
              <a-input v-if="item.id===0" style="width: 180px" placeholder="多个方向请用中文顿号隔开"/>
            </a-col>
          </a-row>
        </a-checkbox-group>
      </a-form-item>
      <a-form-item label="擅长业务区域" >
        <a-textarea v-decorator="adv.area.dec" v-bind="adv.area.other"/>
      </a-form-item>

      <div class="factor-form-subtitle"><span>历史合作情况</span></div>
      <a-form-item label="是否曾与四大合作" class="form-item-row">
        <a-radio-group v-decorator="history.is.dec" v-bind="history.is.other">
          <a-row>
            <a-col :span="5"><a-radio :value="true">是</a-radio></a-col>
            <a-col :span="5"><a-radio :value="false">否</a-radio></a-col>
          </a-row>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="历史合作四大" class="form-item-row" v-if="relation.isCoo">
        <a-checkbox-group v-decorator="history.type.dec" v-bind="history.type.other">
          <a-row>
            <a-col v-for="item in history.type.options" :key="item.id" :span="5">
              <a-checkbox :value="item.value">{{item.label}}</a-checkbox>
            </a-col>
          </a-row>
        </a-checkbox-group>
      </a-form-item>
      <a-form-item label="是否曾与浙商合作" class="form-item-row" >
        <a-radio-group v-decorator="history.once.dec" v-bind="history.once.other" >
          <a-row>
            <a-col :span="5"><a-radio :value="1">是</a-radio></a-col>
            <a-col :span="5"><a-radio :value="2">否</a-radio></a-col>
            <a-col :span="10">
              <a-radio value="c">其他</a-radio>
              <a-input style="width: 180px" placeholder="请说明情况"/>
            </a-col>
          </a-row>
        </a-radio-group>
      </a-form-item>
      <div v-if="relation.isOnce">
        <a-form-item label="过往合作类型" class="form-item-row" >
          <a-checkbox-group v-decorator="history.coo.dec" v-bind="history.coo.other">
            <a-row>
              <a-col v-for="item in history.coo.options" :key="item.id" v-bind="item.id!==4?{span:5}:{}">
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
      </div>
      <a-form-item label="其他AMC合作情况">
        <a-textarea v-decorator="history.other.dec" v-bind="history.other.other"/>
      </a-form-item>

      <div class="factor-form-subtitle"><span>后续期望合作方向</span></div>
      <a-form-item label="合作意向" class="form-item-row">
        <a-checkbox-group v-decorator="dir.intent.dec" v-bind="dir.intent.other">
          <a-row>
            <a-col v-for="item in dir.intent.options" :key="item.id" v-bind="item.id!==0?{span:5}:{}">
              <a-checkbox :value="item.value">{{item.label}}</a-checkbox>
              <a-input v-if="item.id===0" style="width: 180px" placeholder="多个方向请用中文顿号隔开"/>
            </a-col>
          </a-row>
        </a-checkbox-group>
      </a-form-item>

      <a-form-item :wrapperCol="{span:24}" v-if="!officeInfo">
        <a-button type="dashed" block icon="plus" @click="handleAddOffice">添加律所信息</a-button>
      </a-form-item>
      <div v-if="officeInfo">
        <div class="factor-form-classTitle">
          <div class="classTitle_subtitle">
            <a-icon type="bank" />
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
        <a-form-item label="律所类型" class="form-item-row">
          <a-checkbox-group v-decorator="firms.type.dec" v-bind="firms.type.other">
            <a-row>
              <a-col v-for="item in firms.type.options" :key="item.id" v-bind="item.id!==0?{span:5}:{}">
                <a-checkbox :value="item.value">{{item.label}}</a-checkbox>
                <!--<a-input v-if="item.id===0" style="width: 180px" placeholder="多个方向请用中文顿号隔开"/>-->
              </a-col>
            </a-row>
          </a-checkbox-group>
        </a-form-item>
        <a-form-item label="律所是否持续经营3年以上" class="form-item-row">
          <a-checkbox-group v-decorator="firms.year.dec" v-bind="firms.year.other">
            <a-row>
              <a-col :span="5"><a-radio :value="true">是</a-radio></a-col>
              <a-col :span="5"><a-radio :value="false">否</a-radio></a-col>
            </a-row>
          </a-checkbox-group>
        </a-form-item>
        <a-form-item label="律所清收团队人数">
          <a-input v-decorator="firms.num.dec" v-bind="firms.num.other"/>
        </a-form-item>
        <a-form-item label="本人在律所担任职务" class="form-item-row">
          <a-checkbox-group v-decorator="firms.duty.dec" v-bind="firms.duty.other">
            <a-row>
              <a-col v-for="item in firms.duty.options" :key="item.id" v-bind="item.id!==0?{span:5}:{}">
                <a-checkbox :value="item.value">{{item.label}}</a-checkbox>
              </a-col>
            </a-row>
          </a-checkbox-group>
        </a-form-item>
        <a-form-item label="律所情况">
          <a-textarea v-decorator="firms.con.dec" v-bind="firms.con.other"/>
        </a-form-item>


      </div>
      <a-form-item label=" " class="form-item-no-title" >
        <a-button type="primary" @click="handleSubmit">确认无误并提交</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>

import { baseWidth, textarea, formItemLayout } from "../common/style";
import {
  areaOption,expOption, hisFour, hisCoo, orgAdvType, cooIntent,
  lawDuty, lawType
} from "../common/source";

export default {
  name: 'FormLawyerInfo',
  nameComment: '要素信息表单-律师基本信息',
  props:{
    userType:{
      type:String,
      default:'lawyer'
    }
  },
  data() {
    return {
      formItemLayout,
      field:{
        college:{
          dec:['college', { rules: [{ required: true, message: '毕业院校不能为空' }] }],
          other:{
            placeholder:'请填写毕业院校',
            ...textarea
          }
        },
        major:{
          dec:['major', { rules: [{ required: true, message: '专业不能为空' }] }],
          other:{
            placeholder:'请填写院校所选专业',
            ...textarea
          }
        },
        intro:{
          dec:['intro'],
          other:{
            placeholder:'请简要描述公司背景、主体资质、核心成员背景信息等',
            ...textarea
          }
        },
        exp:{
          dec:['exp', { rules: [{ required: true, message: '请选择从业不良时间经验!' }] }],
          options:expOption,
          other:{ ...baseWidth }
        },
        local:{
          dec:['local',{ rules: [{ required: true, message: '所在地区不能为空' }] }],
          other:{
            options:areaOption,
            placeholder:'请选择所在地区',
            ...baseWidth,
          }
        },
        involve:{
          dec:['involve',{ rules: [{ required: true, message: '主要涉业地区不能为空' }] }],
          other:{
            options:areaOption,
            placeholder:'请选择主要涉业地区',
            ...baseWidth,
          }
        },
        isPub:{
          dec:['isPub',{ rules: [{ required: true, message: '请选择有公检法等工作经历情况1' }] }],
          other:{
            ...baseWidth,
          }
        },
        avo:{
          dec:['avo',{
            rules: [{ required: true, message: '请选择是否存在其他兼职/任职' }],
            change:e=>this.handleChange(e,'avo')
          }],
          other:{
            ...baseWidth,
          }
        },
        avoSite:{
          dec:['avo_site', { rules: [{ required: true, message: '兼职/任职单位名称不能为空' }] }],
          other:{
            placeholder:'请填写兼职/任职单位名称',
            ...baseWidth
          }
        },
        avoPost:{
          dec:['avo_post', { rules: [{ required: true, message: '兼职/任职职务不能为空' }] }],
          other:{
            placeholder:'请填写兼职/任职职务',
            ...baseWidth
          }
        },
      },
      adv:{
        type:{
          dec:['exp', { rules: [{ required: true, message: '请选择从业不良时间经验!' }] }],
          options:orgAdvType,
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
          dec:['coo',{
            rules: [{ required: true, message: '请选择历史合作情况' }],
            change:e=>this.handleChange(e,'coo')
          }],
          other:{
            ...baseWidth,
          }
        },
        type:{
          dec:['coo_type', { rules: [{ required: true, message: '至少勾选一项历史合作四大' }] }],
          options:hisFour,
          other:{
            ...baseWidth,
          }
        },
        once:{
          dec:['once', {
            rules: [{ required: true, message: '请选择合作情况' }],
            change:e=>this.handleChange(e,'once')
          }],
          other:{
            ...baseWidth,
          }
        },
        coo:{
          dec:['once_coo', { rules: [{ required: true, message: '请勾选合作类型' }] }],
          options:hisCoo,
          other:{
            ...baseWidth,
          }
        },
        team:{
          dec:['once_team', { rules: [{ required: true, message: '请填写历史合作团队信息' }] }],
          other:{
            placeholder:'请输入过往合作过的浙商团队，多个团队以中文顿号隔开',
            ...textarea
          }
        },
        col:{
          dec:['once_col', { rules: [{ required: true, message: '请填写历史清收情况' }] }],
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
          options:cooIntent,
          other:{
            ...baseWidth,
          }
        }
      },
      firms:{
        name:{
          dec:['law_name', { rules: [{ required: true, message: '律所名称不能为空' }] }],
          other:{
            placeholder:'请填写律所名称',
            ...textarea
          }
        },
        code:{
          decA:['law_code', { rules: [{ required: true, message: '统一社会信用代码不能为空' }] }],
          decB:['law_code', { rules: [{ required: true, message: '统一社会信用代码不能为空' }] }],
          other:{
            placeholder:'请输入统一社会信用代码',
            ...textarea
          }
        },
        add:{
          dec:['law_add', { rules: [{ required: true, message: '律所地址不能为空' }] }],
          other:{
            placeholder:'请填写律所地址',
            ...textarea
          }
        },
        type:{
          dec:['law_type', {
            rules: [{ required: true, message: '请选择律所类型' }],
          }],
          options:lawType,
          other:{
            ...baseWidth,
          }
        },
        year:{
          dec:['law_year', {
            rules: [{ required: true, message: '请选择律所持续经营情况' }],
          }],
          other:{
            ...baseWidth,
          }
        },
        num:{
          dec:['law_num',{ rules: [{ required: true, message: '律所清收团队人数不能为空' }] }],
          other:{
            placeholder:'请输入清收团队人数',
            style:{  width:'200px' },
            addonAfter:"个"
          }
        },
        duty:{
          dec:['law_duty', {
            rules: [{ required: true, message: '请选择担任职务' }],
          }],
          options:lawDuty,
          other:{
            ...baseWidth,
          }
        },
        con:{
          dec:['law_con', { rules: [{ required: true, message: '请填写律所情况' }] }],
          other:{
            placeholder:'律所是否有催收公司、典当行等',
            ...textarea
          }
        },
      },
      // 联动字段属性
      relation:{
        isAvo:false,
        isCoo:false,
        isOnce:false,
      },
      officeInfo:false,

    };
  },
  beforeCreate() {
    this.form = this.$form.createForm(this);
  },
  methods:{
    getValue(){
      console.log(this.form.getFieldsValue());
    },
    DeleteLawInfo() {
      const _this = this;
      this.$confirm({
        title: 'Are you sure delete this task?',
        content: 'Some descriptions',
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
    handleChange(e,field){
      const value = e.target.value;
      const _temp ={};
      if(field ==='avo') _temp.isAvo = value;
      if(field ==='coo') _temp.isCoo = value;
      if(field ==='once') _temp.isOnce = value === 1;
      this.relation={
        ...this.relation,
        ..._temp
      }
    },
    handleAddOffice(){
      this.officeInfo = true;
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
        }
      });
    },
  },
}
</script>

<style scoped lang='scss'>

</style>
