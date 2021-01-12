<template>
  <a-form v-bind="formItemLayout" :form="form" autocomplete="off" selfUpdate>
    <div class="factor-form-subtitle"><span>基本信息</span></div>
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
    <div class="factor-form-subtitle"><span>擅长优势</span></div>
    <a-form-item label="擅长业务类型" class="form-item-row">
      <a-checkbox-group v-decorator="adv.goodCases.dec" v-bind="adv.goodCases.other">
        <a-row>
          <a-col v-for="item in adv.goodCases.options" :key="item.id" v-bind="item.id!==0?{span:6}:{}">
            <a-checkbox :value="item.value">{{ item.label }}</a-checkbox>
            <a-input v-if="item.id===0" style="width: 616px" placeholder="多个方向请用中文顿号隔开" :maxLength="100"
                     v-decorator="adv.goodCases.detail"/>
          </a-col>
        </a-row>
      </a-checkbox-group>
    </a-form-item>
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

    <a-form-item label="历史投行项目案例" v-if="getValue(adv.isHasBankExperience.dec[0]) ==='1'">
      <a-input v-decorator="adv.investmentBankProjectCase.dec" v-bind="adv.investmentBankProjectCase.other"/>
    </a-form-item>

    <div class="factor-form-subtitle"><span>投资意向</span></div>
    <a-form-item label="是否有投资意向" class="form-item-row" :selfUpdate="false">
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
    <template v-if="getValue(intention.hasInvestmentIntention.dec[0]) ==='1'">
      <a-form-item label="投资偏好类型" class="form-item-row" :selfUpdate="false">
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
  </a-form>
</template>

<script>
import { baseWidth, textarea } from "@/views/main/my-attestation/common/style";
import { areaOption, expOption, hisCoo, orgAdvType } from "@/views/main/my-attestation/common/source";
import { buildSource, areaAnalysis } from "@/plugin/tools";
const field = ["areasOfGoodCases","branchOfficeAddress","goodCases","hasInvestmentBankExperience","hasInvestmentIntention","headOfficeAddress","investmentArea","investmentBankProjectCase","investmentExperience","investmentPreferenceType","numberOfCompany","numberOfTeams","organizationInformation","organizationalStructureInformation","otherGoodCases","otherMasterSubject","otherResourcesAdvantage","totalTeamSize","workingTime"];

export default {
  name: 'FormOrg',
  nameComment: '要素信息表单-机构基本信息',

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
						value:[],
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
						value:[],
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
    }
  },
  props: {
    isFirst: {
      type: Boolean,
      default: false
    },
    source: {
      type: Object,
      default: () => {
      }
    },
  },
  created() {
    this.form = this.$form.createForm(this);
  },
  mounted() {
    if (Object.keys(this.source || {}).length) {
      this.resetFormValue(buildSource(this.source,field));
    }
  },
  methods: {
    getValue(params) {
      if (params) return this.form.getFieldValue(params);
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
	  handleSubmit(e) {
		  (e || window.event).preventDefault();
		  return new Promise((resolve,reject)=>{
			  this.form.validateFields((err, data) => {
				  if (!err)  resolve(this.processData(data));
				  else reject(err)
			  });
		  });
	  },
    // 处理当前数据
    processData(source = {}) {
      return Object.assign({}, source, {
        goodCases: (source.goodCases || []).join(','),
        headOfficeAddress: (source.headOfficeAddress || []).join(','),
        investmentPreferenceType: (source.investmentPreferenceType || []).join(','),
        investmentArea: (source.investmentArea || []).join(','),
      })
    },

    resetFormValue(source) {
	    const { investmentPreferenceType,investmentArea,investmentExperience,investmentBankProjectCase,..._source } = source;
			const fieldValues = {
        ..._source,
        goodCases: (source.goodCases || '').split(',').map(i => Number(i)),
        headOfficeAddress: (source.headOfficeAddress || '').split(',').map(i => Number(i)),
      };
      this.form.setFieldsValue({...fieldValues});
	    this.field.involve.other.value = areaAnalysis(source.branchOfficeAddress,false);
	    this.adv.involve.other.value = areaAnalysis(source.areasOfGoodCases,false);
	    this.$nextTick(()=>{
		    if(source.hasInvestmentIntention === '1') {
			    this.form.setFieldsValue({
				    investmentExperience,
				    investmentArea: (investmentArea || '').split(',').map(i => Number(i)).filter(i=>i),
				    investmentPreferenceType: (investmentPreferenceType || '').split(',').map(i => Number(i)),
			    });
		    }
		    if(source.hasInvestmentBankExperience === '1') {
			    this.form.setFieldsValue({
				    investmentBankProjectCase,
			    });
		    }
	    })
    },
  },
}
</script>

<style scoped lang='scss'>
.form-org {
}
</style>
