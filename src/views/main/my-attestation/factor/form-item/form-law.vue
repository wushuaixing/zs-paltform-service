<template>
  <a-form v-bind="formItemLayout" :form="form" autocomplete="off" class="attest-form" selfUpdate>
    <!-- 基本信息 -->
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
            <a-radio :value="item.value">{{ item.label }}</a-radio>
          </a-col>
        </a-row>
      </a-radio-group>
    </a-form-item>
    <a-form-item label="所在地区">
      <a-cascader v-decorator="field.local.dec" v-bind="field.local.other"/>
    </a-form-item>
    <a-form-item label="主要涉业地区">
      <el-cascader v-bind="field.involve.other" @change="val=>handleEleCas(val,field.involve.dec[0],field.involve.other.placeholder)"
                   @visible-change="val=>this.visible = val"/>
      <a-input v-decorator="field.involve.dec" style="display: none"/>
    </a-form-item>
    <a-form-item label="是否有公检法等工作经历" class="form-item-row">
      <a-radio-group v-decorator="field.isPub.dec" v-bind="field.isPub.other">
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
    <a-form-item label="当前是否存在其他兼职/任职" class="form-item-row" :selfUpdate="false">
      <a-radio-group v-decorator="field.avo.dec" v-bind="field.avo.other">
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
		<a-form-item label="兼职/任职单位名称" v-if="isWorkOther()" :selfUpdate="false">
			<a-input v-decorator="field.avoSite.dec" v-bind="field.avoSite.other"/>
		</a-form-item>
		<a-form-item label="兼职/任职职务" v-if="isWorkOther()" :selfUpdate="false">
			<a-input v-decorator="field.avoPost.dec" v-bind="field.avoPost.other"/>
		</a-form-item>
    <a-form-item label="曾就业律所/单位">
      <a-textarea v-decorator="field.once.dec" v-bind="field.once.other"/>
    </a-form-item>
    <a-form-item label="执业经历（不良）">
      <a-textarea v-decorator="field.workExp.dec" v-bind="field.workExp.other"/>
    </a-form-item>
    <a-form-item label="执业经历（非不良）">
      <a-textarea v-decorator="field.noWorkExp.dec" v-bind="field.noWorkExp.other"/>
    </a-form-item>
    <a-form-item label="是否曾入浙商律所库" class="form-item-row">
      <a-radio-group v-decorator="field.isIn.dec" v-bind="field.isIn.other">
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
    <!-- 擅长优势 -->
    <div class="factor-form-subtitle"><span>擅长优势</span></div>
    <a-form-item label="擅长业务类型" class="form-item-row">
      <a-checkbox-group v-decorator="adv.type.dec" v-bind="adv.type.other">
        <a-row>
          <a-col v-for="item in adv.type.options" :key="item.id" v-bind="item.id===0?{span:24}:{span:6}">
            <a-checkbox :value="item.value">{{ item.label }}</a-checkbox>
            <a-input v-if="item.id===0" style="width: 616px" placeholder="多个优势请用中文顿号隔开" :maxLength="100"
                     v-decorator="adv.type.detail"/>
          </a-col>
        </a-row>
      </a-checkbox-group>
    </a-form-item>
    <a-form-item label="经典案例" :selfUpdate="false">
      <div style="width: 300px">
        <a-upload v-decorator="adv.case.dec" v-bind="upload.bind" v-on="upload.on">
					<div v-if="!(getValue(adv.case.dec[0])||[]).length">
						<a-button icon="upload">点击上传</a-button>
						<span class="text-remark" style="font-size: 12px;margin-left: 10px;">
						*支持pdf、word格式
					</span>
					</div>
        </a-upload>
      </div>
    </a-form-item>
    <a-form-item label="擅长业务区域">
			<el-cascader v-bind="adv.area.other" @change="val=>handleEleCas(val,adv.area.dec[0],adv.area.other.placeholder)"
									 @visible-change="val=>this.visible = val"/>
			<a-input v-decorator="adv.area.dec" style="display: none"/>
    </a-form-item>
    <a-form-item label="主要代理案件管辖法院">
      <a-input v-decorator="adv.court.dec" v-bind="adv.court.other"/>
    </a-form-item>
    <a-form-item label="熟悉法院">
      <a-input v-decorator="adv.court2.dec" v-bind="adv.court2.other"/>
    </a-form-item>
    <a-form-item label="其他社会资源优势">
      <a-textarea v-decorator="adv.adv.dec" v-bind="adv.adv.other"/>
    </a-form-item>
    <a-form-item label="其他资源" class="form-item-row">
      <a-checkbox-group v-decorator="adv.type1.dec" v-bind="adv.type1.other">
        <a-row>
          <a-col v-for="item in adv.type1.options" :key="item.id" v-bind="item.id===0?{span:24}:{span:6}">
            <a-checkbox :value="item.value">{{ item.label }}</a-checkbox>
            <a-input v-if="item.id===0" style="width: 616px" placeholder="多个资源请用中文顿号隔开" :maxLength="100"
                     v-decorator="adv.type1.detail"/>
          </a-col>
        </a-row>
      </a-checkbox-group>
    </a-form-item>
  </a-form>
</template>

<script>
import {baseWidth, textarea, formItemLayout} from "@/views/main/my-attestation/common/style";
import {
  areaOption, expOption, lawAdvList, lawAdvType
} from "@/views/main/my-attestation/common/source";
import Deploy, {getFileList, getValueFromEvent} from '@/plugin/tools/qiniu-deploy';
import { fileListRuleAsync, buildSource, areaAnalysis} from "@/plugin/tools";
const field = ["area","areasOfGoodCases","badAssetsWorkExp","competentCourt","familiarCourts","formerWorkUnit","graduateSchool","isInStorage","isWorkOfPublicSecurityOrgans","isWorkOther","major","notBadAssetsWorkExp","otherGoodCases","otherResources","otherResourcesAdvantage","workArea","workRole","workUnitName","workingTime","goodCases","otherResourcesDetail","classicCase"];

export default {
  name: 'FormLaw',
  nameComment: '要素信息表单-律师基本信息',
  components: {},
  data() {
    return {
      formItemLayout,
      field: {
        college: {
          dec: ['graduateSchool', {rules: [{required: true, message: '请输入毕业院校'}]}],
          other: {
            placeholder: '请输入毕业院校',
            ...textarea
          }
        },
        major: {
          dec: ['major', {rules: [{required: true, message: '请输入院校所选专业'}]}],
          other: {
            placeholder: '请输入院校所选专业',
            ...textarea
          }
        },
        exp: {
          dec: ['workingTime', {rules: [{required: true, message: '请选择从业不良时间经验!'}]}],
          options: expOption,
          other: {
						style:{
							verticalAlign:'middle',
							...baseWidth.style
						},
					}
        },
        local: {
          dec: ['area', {rules: [{required: true, message: '请选择所在地区'}]}],
          other: {
            options: areaOption,
            getPopupContainer: e => e.parentElement,
            fieldNames: {
              value: 'id',
              label: 'name',
              children: 'children'
            },
            placeholder: '请选择所在地区',
            ...baseWidth,
          }
        },
        involve: {
          dec: ['workArea', {rules: [{required: true, message: '请选择主要涉业地区'}]}],
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
        isPub: {
          dec: ['isWorkOfPublicSecurityOrgans', {rules: [{required: true, message: '请选择有公检法等工作经历情况'}]}],
          other: {
            ...baseWidth,
          }
        },
        avo: {
          dec: ['isWorkOther', {
            rules: [{required: true, message: '请选择是否存在其他兼职/任职'}],
          }],
          other: {
            ...baseWidth,
          }
        },
        avoSite: {
          dec: ['workUnitName', {rules: [{required: true, message: '请输入兼职/任职单位名称'}]}],
          other: {
            placeholder: '请输入兼职/任职单位名称',
            ...baseWidth
          }
        },
        avoPost: {
          dec: ['workRole', {rules: [{required: true, message: '请输入兼职/任职职务'}]}],
          other: {
            placeholder: '请输入兼职/任职职务',
            ...baseWidth
          }
        },
        once: {
          dec: ['formerWorkUnit', {rules: [{required: true, message: '请输入您曾就业的律所或单位名称全称'}]}],
          other: {
            placeholder: '请输入您曾就业的律所或单位名称全称，若曾就业于多家律所或单位，请用中文顿号隔开',
            ...textarea
          }
        },
        workExp: {
          dec: ['badAssetsWorkExp', {rules: [{required: true, message: '请输入您以往涉及不良资产业务的执业经历经验'}]}],
          other: {
            placeholder: '请输入您以往涉及不良资产业务的执业经历经验',
            ...textarea
          }
        },
        noWorkExp: {
          dec: ['notBadAssetsWorkExp'],
          other: {
            placeholder: '请输入您以往不涉及不良资产业务的执业经历经验',
            ...textarea
          }
        },
        isIn: {
          dec: ['isInStorage', {
            rules: [{required: true, message: '请选择是否曾入浙商律所库'}],
          }],
          other: {
            ...baseWidth,
          }
        },
      },
      adv: {
        case: {
          dec: ['classicCase', {
            valuePropName: 'fileList',
            getValueFromEvent,
          }],
        },
        type: {
          dec: ['goodCases', {rules: [{required: true, message: '请选择擅长业务类型'}]}],
          options: lawAdvType,
          detail: ['otherGoodCases'],
          other: {
            ...baseWidth,
          }
        },
        area: {
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
        court: {
          dec: ['competentCourt', {rules: [{required: true, message: '请输入主要代理案件管辖法院'}]}],
          other: {
            placeholder: '请输入主要代理案件管辖法院',
            ...textarea
          }
        },
        court2: {
          dec: ['familiarCourts', {rules: [{required: true, message: '请输入熟悉法院'}]}],
          other: {
            placeholder: '请输入熟悉法院',
            ...textarea
          }
        },
        adv: {
          dec: ['otherResourcesAdvantage', {rules: [{required: true, message: '请输入其他社会资源优势'}]}],
          other: {
            placeholder: '包括但不限于某法院、法官，法官请以“xx法院-xx法官”形式输入，多个法院、法官间以中文顿号隔开',
            ...textarea
          }
        },
        type1: {
          dec: ['otherResources'],
          options: lawAdvList,
          detail: ['otherResourcesDetail'],
          other: {
            ...baseWidth,
          }
        },
      },
      assist: {},
      upload: {
        on: {
          ...Deploy.event
        },
        bind: {
          ...Deploy.props,
          accept: 'application/pdf,.doc,.docx,application/msword',
          class: 'upload-wrapper',
        }
      },
    };
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
  methods: {
	  isWorkOther(){
			return this.form.getFieldValue('isWorkOther') === '1';
		},
    getValue(field) {
      if (field) return this.form.getFieldValue(field);
    },
    // ele 地区多选事件触发
    handleEleCas(val = [], field,placeholder) {
      const {setFieldsValue, setFields} = this.form;
      if (!this.visible && !val.length) {
        setFields({
          [field]: {
            value: undefined,
            errors: [new Error(placeholder || '请选择地区')]
          }
        })
      } else {
        const str = (val.map(i => i.join('/')).toString());
        setFieldsValue({[field]: str});
      }
    },

		// 表单提交事件
		handleSubmit(e) {
      (e || window.event).preventDefault();
      return new Promise((resolve,reject)=>{
				this.form.validateFields((err, data) => {
					if (!err)  resolve(this.processData(data));
					else reject(err)
				});
			});
      // return this.form.validateFields((err, data) => {
			// 	console.log(err,data);
	    //   // Promise.resolve();
			// 	return Promise.then(data=>data);
      //   // if (!err) {
      //   //   return this.processData(data);
      //   // } else {
			// 	// 	return Promise.reject(err)
      //   // }
      // });
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
      return Object.assign({}, source, {
	      classicCase: getFileList(source.classicCase),
        otherResources: (source.otherResources || []).join(','),
        area: (source.area || []).join(','),
	      goodCases: (source.goodCases || []).join(','),
        otherGoodCases: this.LinkageData(source.goodCases, source.otherGoodCases),
        otherResourcesDetail: this.LinkageData(source.otherResources, source.otherResourcesDetail),
      })
    },
    async resetFormValue(source) {
      const { classicCase,workUnitName,workRole,areasOfGoodCases } = source;
      const fieldValues = {
        ...source,
	      classicCase: await fileListRuleAsync(classicCase),
        goodCases: (source.goodCases || '').split(',').map(i => Number(i)),
        area: source.area ? (source.area || '').split(',').map(i => Number(i)) : undefined,
        otherResources: (source.otherResources || '').split(','),
	      isWorkOfPublicSecurityOrgans:source.isWorkOfPublicSecurityOrgans || null,
      };
	    delete fieldValues.workUnitName;
	    delete fieldValues.workRole;
      this.form.setFieldsValue({...fieldValues});
	    if(source.workArea){
		    this.field.involve.other.value = areaAnalysis(source.workArea,false);
	    }
	    if(areasOfGoodCases){
		    this.adv.area.other.value = areaAnalysis(areasOfGoodCases,false);
	    }
      this.$nextTick(()=>{
				if(source.isWorkOther === '1') {
					this.form.setFieldsValue({workUnitName,workRole});
	      }
      })
    },
  },
  async mounted() {
    if (Object.keys(this.source || {}).length) {
      await this.resetFormValue(buildSource(this.source,field));
    }
  },
}
</script>

<style lang='scss'>
</style>
