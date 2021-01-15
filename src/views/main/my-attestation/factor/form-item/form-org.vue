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
      <el-cascader v-bind="field.involve.other" @change="val=>handleEleCas(val,field.involve.dec[0],'company')"
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
            <a-input v-if="item.id===0" style="width: 616px" placeholder="多个优势请用中文顿号隔开" :maxLength="100"
                     v-decorator="adv.goodCases.detail"/>
          </a-col>
        </a-row>
      </a-checkbox-group>
    </a-form-item>
    <a-form-item label="擅长业务区域">
      <el-cascader v-bind="adv.involve.other" @change="val=>handleEleCas(val,adv.involve.dec[0],'business')"
                   @visible-change="val=>this.visible = val"/>
      <a-input v-decorator="adv.involve.dec" style="display: none"/>
    </a-form-item>
    <a-form-item label="社会资源优势">
      <a-textarea v-decorator="adv.otherResourcesAdvantage.dec" v-bind="adv.otherResourcesAdvantage.other"/>
    </a-form-item>
    <a-form-item label="是否有投行项目经验" class="form-item-row" :selfUpdate="false">
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
      <a-textarea v-decorator="adv.investmentBankProjectCase.dec" v-bind="adv.investmentBankProjectCase.other"/>
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
                   v-bind="item.id!==0?{span:6}:{}">
              <a-checkbox :value="item.value">{{ item.label }}</a-checkbox>
            </a-col>
          </a-row>
        </a-checkbox-group>
      </a-form-item>

			<a-form-item label="标的金额范围" :selfUpdate="false" required :style="{ marginBottom: 0 }">
				<a-form-item :selfUpdate="false" :style="{ display: 'inline-block' }">
					<a-input-number
						v-decorator="intention.startAmountOfSubject.min"
						style="width:200px" :min="0" :max="999999"
						:precision="0"
						:disabled="getValue(intention.startAmountOfSubject.disabled[0])"/>
					<span style="margin-left:5px">万元</span>
					<span style="margin-left:15px">~</span>
				</a-form-item>
				<a-form-item :selfUpdate="false" :style="{ display: 'inline-block',margin:'0 10px' }">
					<a-input-number
						v-decorator="intention.startAmountOfSubject.max"
						style="width:200px" :min="0" :max="999999"
						:precision="0"
						:disabled="getValue(intention.startAmountOfSubject.disabled[0])"/>
					<span style="margin-left:5px">万元</span>
				</a-form-item>
				<a-form-item :selfUpdate="false" :style="{ display: 'inline-block' }">
					<a-checkbox v-decorator="intention.startAmountOfSubject.disabled" @change="checkedChange">不限
					</a-checkbox>
				</a-form-item>
			</a-form-item>
      <a-form-item label="投资区域">
<!--        <a-cascader v-decorator="intention.investmentArea.dec" v-bind="intention.investmentArea.other"/>-->
        <el-cascader v-bind="intention.investmentArea.other" @change="val=>handleEleCas(val,intention.investmentArea.dec[0],'investmentArea')"
                     @visible-change="val=>this.visible = val"/>
        <a-input v-decorator="intention.investmentArea.dec" style="display: none"/>
      </a-form-item>
      <a-form-item label="以往投资经历">
        <a-textarea v-decorator="intention.investmentExperience.dec" v-bind="intention.investmentExperience.other"/>
      </a-form-item>
    </template>
  </a-form>
</template>

<script>
import {baseWidth, textarea} from "@/views/main/my-attestation/common/style";
import {areaOption, expOption, hisCoo, orgAdvType} from "@/views/main/my-attestation/common/source";
import {buildSource, areaAnalysis} from "@/plugin/tools";

const field = ["areasOfGoodCases", "branchOfficeAddress", "goodCases", "hasInvestmentBankExperience", "hasInvestmentIntention", "headOfficeAddress", "investmentArea", "investmentBankProjectCase", "investmentExperience", "investmentPreferenceType", "numberOfCompany", "numberOfTeams", "organizationInformation", "organizationalStructureInformation", "otherGoodCases", "otherMasterSubject", "otherResourcesAdvantage", "totalTeamSize", "workingTime", "startAmountOfSubject"];

export default {
  name: 'FormOrg',
  nameComment: '要素信息表单-机构基本信息',

  data() {
    const Min = (rule, value, callback) => {
      const disabled = this.getValue(this.intention.startAmountOfSubject.disabled[0]);
      const Max = this.getValue(this.intention.startAmountOfSubject.max[0]);
      if(Max){
        this.$nextTick(() => {
          this.form.validateFields(['max'], {force: true});
        });
      }
      if (disabled) {
        callback();
      }
      if (!value) {
        callback(new Error('请输入标的金额最小范围'));
      }
      callback();
    };
    const Max = (rule, value, callback) => {
      const disabled = this.getValue(this.intention.startAmountOfSubject.disabled[0]);
      const min = this.getValue(this.intention.startAmountOfSubject.min[0]);
      if (disabled) {
        callback();
      }
      if (!value) {
        callback(new Error('请输入标的金额最大范围'));
      }
      if (value < min) {
        callback(new Error('不得小于标的金额最小范围'));
      }
      callback();
    };
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
          dec: ['branchOfficeAddress', {rules: [{required: true, message: '请选择公司分部覆盖地区！'}]}],
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
            placeholder: '请选择公司分部覆盖地区',
            ...baseWidth,
          }
        },
        teamNum: {
          dec: ['numberOfTeams', {rules: [{required: true, message: '请输入清收团队数'}]}],
          other: {
            placeholder: '请输入清收团队数',
            style: {width: '200px'},
						min:0,
	          max:999999,
	          precision:0,
          }
        },
        numberOfCompany: {
          dec: ['numberOfCompany', {rules: [{required: true, message: '请输入公司总人数'}]}],
          other: {
            placeholder: '请输入公司总人数',
            style: {width: '200px'},
            precision:0,
	          min:0,
	          max:999999,
          }
        },
        teamNumTotal: {
          dec: ['totalTeamSize', {rules: [{required: true, message: '请输入清收团队总人数'}]}],
          other: {
            placeholder: '请输入清收团队总人数',
            style: {width: '200px'},
            precision:0,
	          min:0,
	          max:999999,
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
          dec: ['investmentArea', {rules: [{required: true, message: '请选择投资区域'}]}],
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
            placeholder: '请选择投资区域',
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
        startAmountOfSubject: {
          min: ['min', {rules: [{required: true, validator: Min}]}],
          max: ['max', {rules: [{required: true, validator: Max}]}],
          disabled: ['disabled', {valuePropName: 'checked'}],
          other: {
            ...baseWidth,
          },
        }
      },
      adv: {
        goodCases: {
          dec: ['goodCases', {rules: [{required: true, message: '请选择擅长业务类型!'}]}],
          detail: ['otherGoodCases'],
          options: orgAdvType,
          other: {
            ...baseWidth,
          }
        },
        involve: {
          dec: ['areasOfGoodCases', {rules: [{required: true, message: '请选择擅长业务区域'}]}],
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
            placeholder: '请选择擅长业务区域',
            ...baseWidth,
          }
        },
        otherResourcesAdvantage: {
          dec: ['otherResourcesAdvantage', {rules: [{required: true, message: '请输入社会资源优势'}]}],
          other: {
            placeholder: '包括但不限于某法院、法官，法官请以“xx法院-xx法官形式输入，多个法院、法官间以中文顿号隔开”',
            ...textarea
          }
        },
        isHasBankExperience: {
          dec: ['hasInvestmentBankExperience', {rules: [{required: true, message: '请选择投行项目经验'}]}],
          other: {
            ...baseWidth,
          }
        },
        investmentBankProjectCase: {
          dec: ['investmentBankProjectCase', {rules: [{required: true, message: '请输入历史投行项目案例'}]}],
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
      this.resetFormValue(buildSource(this.source, field));
    }
  },
  methods: {
    getValue(params) {
      if (params) return this.form.getFieldValue(params);
    },
    //标的金额范围 不限 复选框 改变
    checkedChange() {
      this.$nextTick(() => {
        this.form.validateFields(['max', 'min'], {force: true});
      });
    },
    // ele 地区多选事件触发
    handleEleCas(val = [], field, sign) {
      const {setFieldsValue, setFields} = this.form;
      const rule = {
        business:'请选择擅长业务区域',
        investmentArea:'请选择投资区域',
        company:'请选择公司分部覆盖地区',
      };
      if (!this.visible && !val.length) {
        setFields({
          [field]: {
            value: undefined,
            errors: [new Error(rule[sign])]
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
      return new Promise((resolve, reject) => {
        this.form.validateFields((err, data) => {
          if (!err) resolve(this.processData(data));
          else reject(err)
        });
      });
    },
    /**
     * @return {string}
     */
    LinkageData(params, val) {
      if (params instanceof Array) {
        return params.some(i => Number(i) === 0) ? val : '';
      } else {
        return params === '0' ? val : '';
      }
    },
    // 处理当前数据
    processData(source = {}) {
      // goodCases 擅长业务类型（1：工业，2：商业，3：住宅，4：纯担保类，0：其他）
      // otherGoodCases 擅长其他业务类型
      const startAmountOfSubject = {
        min: source.disabled ? "" : source.min,
        max: source.disabled ? "" : source.max,
        disabled: source.disabled,
      };
      return Object.assign({}, source, {
        goodCases: (source.goodCases || []).join(','),
        headOfficeAddress: (source.headOfficeAddress || []).join(','),
        investmentPreferenceType: (source.investmentPreferenceType || []).join(','),
        startAmountOfSubject: JSON.stringify(startAmountOfSubject),
        otherGoodCases: this.LinkageData(source.goodCases, source.otherGoodCases),
      })
    },

    resetFormValue(source) {
      const {
        investmentPreferenceType,
        investmentExperience,
        investmentBankProjectCase,
        startAmountOfSubject,
        investmentArea,
        ..._source
      } = source;
      const fieldValues = {
        ..._source,
        goodCases: (source.goodCases || '').split(',').map(i => Number(i)),
        headOfficeAddress: source.headOfficeAddress ? source.headOfficeAddress.split(',').map(i => Number(i)) : undefined,
      };
      this.form.setFieldsValue({...fieldValues});
	    if(source.branchOfficeAddress){
		    this.field.involve.other.value = areaAnalysis(source.branchOfficeAddress, false);
	    }
	    if(source.areasOfGoodCases){
		    this.adv.involve.other.value = areaAnalysis(source.areasOfGoodCases, false);
	    }
      this.$nextTick(() => {
        if (source.hasInvestmentIntention === '1') {
          let _subject = {};
          try {
            _subject = JSON.parse(startAmountOfSubject);
          } catch (e) {
            console.log('-');
          }
          const { disabled, min, max } = _subject || {};
          this.form.setFieldsValue({
            investmentExperience,
            disabled,
            min,
            max,
            investmentArea,
            investmentPreferenceType: (investmentPreferenceType || '').split(',').map(i => Number(i)),
          });

	        if(investmentArea){
		        this.intention.investmentArea.other.value = areaAnalysis(investmentArea, false);
	        }
        }
        if (source.hasInvestmentBankExperience === '1') {
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
