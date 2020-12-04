<template>
  <div class="factor-form-wrapper">
    <a-form v-bind="formItemLayout" :form="form" autocomplete="off">
      <div class="factor-form-subtitle">基本信息</div>
      <a-form-item label="机构简介">
        <a-textarea v-decorator="field.intro.dec" v-bind="field.intro.other"/>
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
      <a-form-item label="公司总部所在地">
        <a-cascader v-decorator="field.local.dec" v-bind="field.local.other" />
      </a-form-item>
      <a-form-item label="公司分部覆盖地区">
        <a-cascader v-decorator="field.local.dec" v-bind="field.local.other" />
      </a-form-item>


      <div class="factor-form-subtitle">擅长优势</div>
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
      <a-form-item label="其他AMC合作情况">
        <a-textarea v-decorator="history.other.dec" v-bind="history.other.other"/>
      </a-form-item>

      <div class="factor-form-subtitle">后续期望合作方向</div>
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

    </a-form>

  </div>
</template>

<script>

import { baseWidth, textarea } from "../common/style";
import { areaOption,expOption, hisFour, hisCoo, orgAdvType, cooIntent } from "../common/source";

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
          dec:['exp', { rules: [{ required: true, message: '请选择从业不良时间经验!' }] }],
          options:expOption,
          other:{ ...baseWidth }
        },
        local:{
          dec:['local',{ rules: [{ required: true, message: '请选择公司总部所在地!' }] }],
          other:{
            options:areaOption,
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
          dec:['is',{ rules: [{ required: true, message: '请选择历史合作情况' }] }],
          other:{
            ...baseWidth,
          }
        },
        type:{
          dec:['typeName', { rules: [{ required: true, message: '至少勾选一项历史合作四大' }] }],
          options:hisFour,
          other:{
            ...baseWidth,
          }
        },
        once:{
          dec:['once', { rules: [{ required: true, message: '请选择合作情况' }] }],
          other:{
            ...baseWidth,
          }
        },
        coo:{
          dec:['coo', { rules: [{ required: true, message: '请勾选合作类型' }] }],
          options:hisCoo,
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
          options:cooIntent,
          other:{
            ...baseWidth,
          }
        }
      }
    };
  },
  created() {
    this.form = this.$form.createForm(this);
  },
}
</script>

<style scoped lang='scss'>

</style>
