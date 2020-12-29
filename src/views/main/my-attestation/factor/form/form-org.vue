<template>
  <div class="factor-form-wrapper form-org">
    <a-form v-bind="formItemLayout" :form="form" autocomplete="off">
      <div class="factor-form-subtitle">基本信息</div>
      <a-form-item label="机构简介">
        <a-textarea v-decorator="field.intro.dec" v-bind="field.intro.other"/>
      </a-form-item>
      <a-form-item label="从业不良时间经验">
        <a-radio-group v-decorator="field.exp.dec" v-bind="field.exp.other">
          <a-row>
            <a-col v-for="item in field.exp.options" :key="item.id" v-bind={span:6}>
              <a-radio :value="item.value">{{ item.label }}</a-radio>
            </a-col>
          </a-row>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="公司总部所在地">
        <a-cascader v-decorator="field.local.dec" v-bind="field.local.other"/>
      </a-form-item>
      <a-form-item label="公司分部覆盖地区">
        <el-cascader v-bind="field.involve.other" @change="val=>handleEleCas(val,field.involve.dec[0])"
                     @visible-change="val=>this.visible = val"/>
        <a-input v-decorator="field.involve.dec" style="display: none"/>
      </a-form-item>
      <a-form-item label="公司总人数">
        <a-input-number v-decorator="field.numberOfCompany.dec" v-bind="field.numberOfCompany.other"/>
        <span :style="{marginLeft:'5px'}">个</span>
      </a-form-item>
      <a-form-item label="清收团队数">
        <a-input-number v-decorator="field.teamNum.dec" v-bind="field.teamNum.other"/>
        <span :style="{marginLeft:'5px'}">个</span>
      </a-form-item>
      <a-form-item label="清收团队总人数">
        <a-input-number v-decorator="field.teamNumTotal.dec" v-bind="field.teamNumTotal.other"/>
        <span :style="{marginLeft:'5px'}">个</span>
      </a-form-item>
      <a-form-item label="组织架构">
        <a-textarea v-decorator="field.framework.dec" v-bind="field.framework.other"/>
      </a-form-item>
      <a-form-item label="所控制的其他主体">
        <a-input v-decorator="field.otherMasterSubject.dec" v-bind="field.otherMasterSubject.other"/>
      </a-form-item>
      <div class="factor-form-subtitle">擅长优势</div>
      <div class="input-after-checkbox">
        <a-form-item label="擅长业务类型" class="form-item-row">
          <a-checkbox-group v-decorator="adv.goodCases.dec" v-bind="adv.goodCases.other">
            <a-row>
              <a-col v-for="item in adv.goodCases.options" :key="item.id" v-bind="item.id!==0?{span:6}:{}">
                <a-checkbox :value="item.value">{{ item.label }}</a-checkbox>
              </a-col>
            </a-row>
          </a-checkbox-group>
        </a-form-item>
        <a-form-item class="adv-input">
          <a-input style="width: 616px" placeholder="多个方向请用中文顿号隔开" v-decorator="adv.goodCases.detail"/>
        </a-form-item>
      </div>
      <a-form-item label="擅长业务区域">
        <el-cascader v-bind="adv.involve.other" @change="val=>handleEleCas(val,adv.involve.dec[0])"
                     @visible-change="val=>this.visible = val"/>
        <a-input v-decorator="adv.involve.dec" style="display: none"/>
      </a-form-item>
      <a-form-item label="社会资源优势">
        <a-textarea v-decorator="adv.otherResourcesAdvantage.dec" v-bind="adv.otherResourcesAdvantage.other"/>
      </a-form-item>
      <a-form-item label="是否有投行项目经验" class="form-item-row">
        <a-radio-group v-decorator="adv.isHasBankExperience.dec" v-bind="adv.isHasBankExperience.other">
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
      <template v-if="getValue(adv.isHasBankExperience.dec[0]) ==='1' ">
        <a-form-item label="历史投行项目案例">
          <a-input v-decorator="adv.investmentBankProjectCase.dec" v-bind="adv.investmentBankProjectCase.other"/>
        </a-form-item>
      </template>
      <div class="factor-form-subtitle">投资意向</div>
      <a-form-item label="是否有投资意向" class="form-item-row">
        <a-radio-group v-decorator="intention.hasInvestmentIntention.dec"
                       v-bind="intention.hasInvestmentIntention.other">
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
      <template v-if="getValue(intention.hasInvestmentIntention.dec[0]) ==='1' ">
        <a-form-item label="投资偏好类型" class="form-item-row">
          <a-checkbox-group v-decorator="intention.investmentPreferenceType.dec"
                            v-bind="intention.investmentPreferenceType.other">
            <a-row>
              <a-col v-for="item in intention.investmentPreferenceType.options" :key="item.id"
                     v-bind="item.id!==0?{span:5}:{}">
                <a-checkbox :value="item.value">{{ item.label }}</a-checkbox>
              </a-col>
            </a-row>
          </a-checkbox-group>
        </a-form-item>
        <a-form-item label="投资区域">
          <a-cascader v-decorator="intention.investmentArea.dec" v-bind="intention.investmentArea.other"/>
        </a-form-item>
        <a-form-item label="以往投资经历">
          <a-textarea v-decorator="intention.investmentExperience.dec" v-bind="intention.investmentExperience.other"/>
        </a-form-item>
      </template>
      <div class="factor-form-subtitle">历史合作情况</div>
      <a-form-item label="是否曾与浙商合作" class="form-item-row">
        <a-radio-group v-decorator="history.once.dec" v-bind="history.once.other">
          <a-row>
            <a-col :span="5">
              <a-radio value="1">是</a-radio>
            </a-col>
            <a-col :span="5">
              <a-radio value="2">否</a-radio>
            </a-col>
            <a-col :span="24">
              <a-radio value="0">其他</a-radio>
              <a-input style="width: 600px" placeholder="请说明情况" v-decorator="history.once.detail"/>
            </a-col>
          </a-row>
        </a-radio-group>
      </a-form-item>
      <template v-if="getValue(history.once.dec[0]) ==='1' ">
        <a-form-item label="过往合作类型" class="form-item-row">
          <a-checkbox-group v-decorator="history.typeOfCooperation.dec" v-bind="history.typeOfCooperation.other">
            <a-row>
              <a-col v-for="item in history.typeOfCooperation.options" :key="item.id" v-bind="item.id!==4?{span:5}:{}">
                <a-checkbox :value="item.value">{{ item.label }}</a-checkbox>
              </a-col>
            </a-row>
          </a-checkbox-group>
        </a-form-item>
        <a-form-item label="历史合作团队">
          <a-textarea v-decorator="history.team.dec" v-bind="history.team.other"/>
        </a-form-item>
        <a-form-item label="历史清收情况">
          <a-textarea v-decorator="history.liquidationSituation.dec" v-bind="history.liquidationSituation.other"/>
        </a-form-item>
      </template>
      <a-form-item label="是否曾与其他AMC合作" class="form-item-row">
        <a-radio-group v-decorator="history.isCooperatedWithOtherAmc.dec"
                       v-bind="history.isCooperatedWithOtherAmc.other">
          <a-row>
            <a-col :span="5">
              <a-radio value="1">是</a-radio>
            </a-col>
            <a-col :span="5">
              <a-radio value="2">否</a-radio>
            </a-col>
          </a-row>
        </a-radio-group>
      </a-form-item>
      <template v-if="getValue(history.isCooperatedWithOtherAmc.dec[0]) ==='1' ">
        <div class="input-after-checkbox">
          <a-form-item label="历史合作AMC" class="form-item-row">
            <a-checkbox-group v-decorator="history.cooperatedAmc.dec" v-bind="history.cooperatedAmc.other">
              <a-row>
                <a-col v-for="item in history.cooperatedAmc.options" :key="item.id" :span="5">
                  <a-checkbox :value="item.value">{{ item.label }}</a-checkbox>
                </a-col>
              </a-row>
            </a-checkbox-group>
          </a-form-item>
          <a-form-item class="amc-input">
            <a-input style="width: 540px" placeholder="请列明具体合作AMC" v-decorator="history.cooperatedAmc.detail"/>
          </a-form-item>
        </div>
        <a-form-item label="其他AMC合作情况">
          <a-textarea v-decorator="history.other.dec" v-bind="history.other.other"/>
        </a-form-item>
      </template>
      <div class="factor-form-subtitle">后续期望合作方向</div>
      <div class="input-after-checkbox">
        <a-form-item label="合作意向" class="form-item-row">
          <a-checkbox-group v-decorator="dir.intent.dec" v-bind="dir.intent.other">
            <a-row>
              <a-col v-for="item in dir.intent.options" :key="item.id" v-bind="item.id!=='0'?{span:5}:{}">
                <a-checkbox :value="item.value">{{ item.label }}</a-checkbox>
              </a-col>
            </a-row>
          </a-checkbox-group>
        </a-form-item>
        <a-form-item class="dir-input">
          <a-input style="width: 560px" placeholder="多个方向请用中文顿号隔开" v-decorator="dir.intent.detail"/>
        </a-form-item>
      </div>
      <a-form-item class="submit-btn">
        <a-button type="primary" @click="handleSubmit"> 确认无误并提交</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import {factor} from "@/plugin/api/attest";
import {baseWidth, textarea} from "../../common/style";
import {
  areaOption,
  hisFour,
  orgAdvType,
  cooIntent,
  expOption,
  hisCoo,
  typeOfCooperation,
} from "../../common/source";

export default {
  name: 'FormOrgInfo',
  nameComment: '要素信息表单-机构基本信息',
  props: {
    userType: {
      type: String,
      default: 'lawyer'
    }
  },
  data() {
    return {
      formItemLayout: {
        labelCol: {span: 6},
        wrapperCol: {span: 18},
      },
      field: {
        intro: {
          dec: ['organizationInformation'],
          other: {
            placeholder: '请简要描述公司背景、主体资质、核心成员背景信息等',
            ...textarea
          }
        },
        exp: {
          dec: ['workingTime', {rules: [{required: true, message: '请选择从业不良时间经验!'}]}],
          options: expOption,
          other: {...baseWidth}
        },
        local: {
          dec: ['headOfficeAddress', {rules: [{required: true, message: '请选择公司总部所在地!'}]}],
          other: {
            options: areaOption,
            placeholder: '请选择公司总部所在地',
            fieldNames: {label: 'name', value: 'id', children: 'children'},
            ...baseWidth,
          }
        },
        involve: {
          dec: ['branchOfficeAddress', {rules: [{required: true, message: '主要涉业地区不能为空'}]}],
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
            placeholder: '请选择主要涉业地区',
            ...baseWidth,
          }
        },
        teamNum: {
          dec: ['numberOfTeams', {rules: [{required: true, message: '清收团队数不能为空'}]}],
          other: {
            placeholder: '请输入清收团队数',
            style: {width: '200px'},
            addonAfter: "个"
          }
        },
        numberOfCompany: {
          dec: ['numberOfCompany', {rules: [{required: true, message: '公司总人数不能为空'}]}],
          other: {
            placeholder: '请输入公司总人数',
            style: {width: '200px'},
          }
        },
        teamNumTotal: {
          dec: ['totalTeamSize', {rules: [{required: true, message: '清收团队总数不能为空'}]}],
          other: {
            placeholder: '请输入清收团队总人数',
            style: {width: '200px'},
          }
        },
        framework: {
          dec: ['organizationalStructureInformation'],
          other: {
            placeholder: '请简要描述团队组织架构',
            ...textarea
          }
        },
        otherMasterSubject: {
          dec: ['otherMasterSubject'],
          other: {
            placeholder: '请输入曾使用并参与过不良资产业务的其他主体，若有多个请用中文顿号隔开',
            ...textarea
          }
        },
      },
      adv: {
        goodCases: {
          dec: ['goodCases', {rules: [{required: true, message: '擅长业务类型不能为空!'}]}],
          detail: ['otherGoodCases'],
          options: orgAdvType,
          other: {
            ...baseWidth,
          }
        },
        involve: {
          dec: ['areasOfGoodCases', {rules: [{required: true, message: '主要涉业地区不能为空'}]}],
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
            placeholder: '请选择主要涉业地区',
            ...baseWidth,
          }
        },
        otherResourcesAdvantage: {
          dec: ['otherResourcesAdvantage', {rules: [{required: true, message: '主要涉业地区不能为空'}]}],
          other: {
            placeholder: '包括但不限于某法院、法官，法官请以“xx法院-xx法官形式输入，多个法院、法官间以中文顿号隔开”',
            ...textarea
          }
        },
        isHasBankExperience: {
          dec: ['hasInvestmentBankExperience', {rules: [{required: true, message: '请选择有公检法等工作经历情况'}]}],
          other: {
            ...baseWidth,
          }
        },
        investmentBankProjectCase: {
          dec: ['investmentBankProjectCase'],
          other: {
            placeholder: '请输入历史投行项目案例',
            ...textarea
          }
        },
      },
      intention: {
        hasInvestmentIntention: {
          dec: ['hasInvestmentIntention', {rules: [{required: true, message: '请选择投资意向'}]}],
          other: {
            ...baseWidth,
          }
        },
        investmentPreferenceType: {
          dec: ['investmentPreferenceType', {rules: [{required: true, message: '请选择投资偏好类型!'}]}],
          options: hisCoo,
          other: {
            ...baseWidth,
          }
        },
        investmentArea: {
          dec: ['investmentArea', {rules: [{required: true, message: '请选择投资区域!'}]}],
          other: {
            options: areaOption,
            placeholder: '请选择投资区域',
            fieldNames: {label: 'name', value: 'id', children: 'children'},
            ...baseWidth,
          }
        },
        investmentExperience: {
          dec: ['investmentExperience'],
          other: {
            placeholder: '若曾有投资经验，请描述历史项目案例',
            ...textarea
          }
        },
      },
      history: {
        once: {
          dec: ['isCooperatedWithZheshang', {rules: [{required: true, message: '请选择合作情况'}]}],
          detail: ['isCooperatedWithZheshangDetail'],
          other: {
            ...baseWidth,
          }
        },
        typeOfCooperation: {
          dec: ['typeOfCooperationCode', {rules: [{required: true, message: '请勾选合作类型'}]}],
          options: typeOfCooperation,
          other: {
            ...baseWidth,
          }
        },
        team: {
          dec: ['hTeam', {rules: [{required: true, message: '请填写擅长业务区域'}]}],
          other: {
            placeholder: '请输入过往合作过的浙商团队，多个团队以中文顿号隔开',
            ...textarea
          }
        },
        liquidationSituation: {
          dec: ['liquidationSituation', {rules: [{required: true, message: '请简要描述过往合作项目的清收情况'}]}],
          other: {
            placeholder: '请简要描述过往合作项目的清收情况',
            ...textarea
          }
        },
        isCooperatedWithOtherAmc: {
          dec: ['isCooperatedWithOtherAmc', {rules: [{required: true, message: '请选择历史合作情况'}]}],
          other: {
            ...baseWidth,
          }
        },
        cooperatedAmc: {
          dec: ['cooperatedAmc', {rules: [{required: true, message: '至少勾选一项历史合作AMC'}]}],
          detail: ['cooperatedAmcDetail'],
          options: hisFour,
          other: {
            ...baseWidth,
          }
        },
        other: {
          dec: ['cooperationSituation'],
          other: {
            placeholder: '请简要描述与其他AMC公司合作的情况',
            ...textarea
          }
        },
      },
      dir: {
        intent: {
          dec: ['cooperationIntention', {rules: [{required: true, message: '请勾选合作意向'}]}],
          detail: ['otherCooperationIntention'],
          options: cooIntent,
          other: {
            ...baseWidth,
          }
        }
      }
    }
  },
  created() {
    this.form = this.$form.createForm(this);
  },
  methods: {
    getValue(params) {
      if (params) return this.form.getFieldValue(params);
    },
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
  }
}
</script>

<style scoped lang='scss'>
.form-org {
  .input-after-checkbox {
    position: relative;

    .adv-input {
      position: absolute;
      top: 30px;
      left: 30%;
    }

    .amc-input {
      position: absolute;
      top: 30px;
      left: 35%;
    }

    .dir-input {
      position: absolute;
      top: 30px;
      left: 35%;
    }
  }

  .submit-btn {
    text-align: center;
  }
}
</style>
