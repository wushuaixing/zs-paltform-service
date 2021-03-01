<template>
  <a-form v-bind="formItemLayout" :form="form" autocomplete="off" class="attest-form" selfUpdate>
		<a-form-item label="律所名称">
			<a-input v-decorator="firms.name.dec" v-bind="firms.name.other"/>
		</a-form-item>
		<a-form-item label="统一社会信用代码">
			<a-input v-decorator="firms.code.dec" v-bind="firms.code.other"/>
		</a-form-item>
		<a-form-item label="律所地址">
			<a-input v-decorator="firms.add.dec" v-bind="firms.add.other"/>
		</a-form-item>
		<a-form-item label="展业地域">
			<el-cascader v-bind="firms.involve.other" v-on="firms.involve.on"/>
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
		<a-form-item label="是否存在分所" class="form-item-row" :selfUpdate="false">
			<a-radio-group v-decorator="firms.is.dec" v-bind="firms.is.other">
				<a-row>
					<a-col :span="6">
						<a-radio value="1">是</a-radio>
					</a-col>
					<a-col :span="6">
						<a-radio value="0">否</a-radio>
					</a-col>
				</a-row>
			</a-radio-group>
		</a-form-item>
		<a-form-item label="分所展业地域" v-if="hasOtherOffice()" :selfUpdate="false">
			<el-cascader v-bind="firms.part.other" v-on="firms.part.on"/>
			<a-input v-decorator="firms.part.dec" style="display: none"/>
		</a-form-item>
		<a-form-item label="分所人员情况"  v-if="hasOtherOffice()" :selfUpdate="false">
			<a-textarea v-decorator="firms.partInfo.dec" v-bind="firms.partInfo.other"/>
		</a-form-item>
		<a-form-item label="律所清收团队人数">
			<a-input-number v-decorator="firms.num.dec" v-bind="firms.num.other" :min="0" :max="999999"/>
      <span :style="{marginLeft:'5px'}">个</span>
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
  </a-form>

</template>

<script>
import { baseWidth, formItemLayout, textarea } from "@/views/main/my-attestation/common/style";
import { areaOption, lawDuty, lawType } from "@/views/main/my-attestation/common/source";
import { buildSource, areaAnalysis } from "@/plugin/tools";
const field = ["hasOtherOffice","isWorkForThreeYear","lawOfficeAddress","lawOfficeInformation","lawOfficeName","lawOfficeQualify","lawOfficeQualifyPerformance","lawOfficeType","officeWorkAddress","otherOfficeStaffInfo","otherOfficeWorkAddress","roleInLawOffice","totalTeamSize","code"];
export default {
  name: 'FormOffice',
  nameComment: '要素信息表单-律所基本信息',
  data() {
    return {
	    visible:false,
	    formItemLayout,
      firms: {
        name: {
          dec: ['lawOfficeName', {rules: [{required: true, message: '请输入律所名称'}]}],
          other: {
            placeholder: '请输入律所名称',
            ...textarea
          }
        },
        code: {
          dec: ['code', {rules: [{required: true, message: '请输入统一社会信用代码'}]}],
          other: {
            placeholder: '请输入统一社会信用代码',
            ...textarea
          }
        },
        add: {
          dec: ['lawOfficeAddress', {rules: [{required: true, message: '请输入律所地址'}]}],
          other: {
            placeholder: '请输入律所地址',
            ...textarea
          }
        },
        involve: {
          dec: ['officeWorkAddress', {rules: [{required: true, message: '请选择展业地域'}]}],
					on:{
						change:val=>this.handleEleCas(val,'officeWorkAddress','请选择展业地域'),
						visibleChange:this.visibleChange
					},
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
          dec: ['otherOfficeWorkAddress', {rules: [{required: true, message: '请选择分所展业地域'}]}],
	        on:{
		        change:val=>this.handleEleCas(val,'otherOfficeWorkAddress','请选择分所展业地域'),
		        visibleChange:this.visibleChange
	        },
          other: {
            clearable: true,
            options: areaOption,
            size: "small",
	          // value:[],
	          // collapseTags:true,
            props: {
              value: 'id',
              label: 'name',
              multiple: true,
              checkStrictly: true,
            },
            placeholder: '请选择分所展业地域',
            ...baseWidth,
          }
        },
        partInfo: {
          dec: ['otherOfficeStaffInfo', {rules: [{required: true, message: '请简述分所人员情况'}]}],
          other: {
            placeholder: '请简述分所人员情况',
            ...textarea
          }
        },
        num: {
          dec: ['totalTeamSize', {rules: [{required: true, message: '请输入清收团队人数'}]}],
          other: {
            placeholder: '请输入清收团队人数',
            style: {width: '200px'},
            precision:0,
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
          dec: ['lawOfficeInformation', {rules: [{required: true, message: '请输入律所简介'}]}],
          other: {
            placeholder: '律所性质，核心成员背景，以及是否有催收公司、典当行等',
            ...textarea
          }
        },
        con1: {
          dec: ['lawOfficeQualify', {rules: [{required: true, message: '请简述律所资质'}]}],
          other: {
            placeholder: '请简述律所资质',
            ...textarea
          }
        },
        con2: {
          dec: ['lawOfficeQualifyPerformance', {rules: [{required: true, message: '请简述执业所以往业绩'}]}],
          other: {
            placeholder: '请简述执业所以往业绩',
            ...textarea
          }
        },
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
	  hasOtherOffice() {
      return this.form.getFieldValue('hasOtherOffice') === '1' ;
    },
    visibleChange(val) {
      this.visible = val;
    },
    // ele 地区多选事件触发
    handleEleCas(val = [], field,err) {
      const {setFieldsValue, setFields} = this.form;
      if (!this.visible && !val.length) {
        setFields({
          [field]: {
            value: undefined,
            errors: [new Error(err || '请选择地域')]
          }
        })
      } else {
        const str = (val.map(i => i.join('/')).toString());
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
    //处理数据
    processData(source = {}) {
      return Object.assign({}, source, {
        officeWorkAddress: source.officeWorkAddress,//展业地区待处理
        otherOfficeWorkAddress: source.otherOfficeWorkAddress,//分布展业地区待处理
      })
    },
    resetFormValue(source) {
			const { otherOfficeWorkAddress, otherOfficeStaffInfo, ..._source } = source;
      const fieldValues = {
        ..._source,
        // officeWorkAddress: source.officeWorkAddress,//展业地区待处理
        // otherOfficeWorkAddress: source.otherOfficeWorkAddr当前是否存在其他兼职ess,//分布展业地区待处理
      };
      // TODO 展业地区:相关方法
      this.form.setFieldsValue({...fieldValues});
	    source.officeWorkAddress ? this.firms.involve.other.value = areaAnalysis(source.officeWorkAddress,false) : '';
	    this.$nextTick(()=>{
		    if(source.hasOtherOffice === '1') {
			    this.form.setFieldsValue({
						otherOfficeStaffInfo:otherOfficeStaffInfo || undefined,
				    otherOfficeWorkAddress:otherOfficeStaffInfo || undefined,
			    });
			    if(otherOfficeWorkAddress){
						this.firms.part.other.value = areaAnalysis(otherOfficeWorkAddress,false);
			    }
		    }
	    })
    },
  },

  mounted() {
    if (Object.keys(this.source || {}).length) {
      this.resetFormValue(buildSource(this.source,field));
    }
  },
}
</script>

<style scoped lang='scss'>

</style>
