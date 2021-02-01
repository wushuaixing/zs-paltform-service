<template>
  <a-form v-bind="formItemLayout" :form="form" autocomplete="off" class="attest-form" selfUpdate>
    <!-- 历史合作情况 -->
    <div class="factor-form-subtitle"><span>历史合作情况</span></div>
    <a-form-item label="是否曾与浙商合作" class="form-item-row" :selfUpdate="false">
      <a-radio-group v-decorator="history.once.dec" v-bind="history.once.other">
        <a-row>
          <a-col :span="6">
            <a-radio value="1">是</a-radio>
          </a-col>
          <a-col :span="6">
            <a-radio value="2">否</a-radio>
          </a-col>
          <a-col :span="24">
            <a-radio value="0">其他</a-radio>
            <a-input style="width: 606px;margin-left: 3px" placeholder="请说明情况" v-decorator="history.once.detail"/>
          </a-col>
        </a-row>
      </a-radio-group>
    </a-form-item>
    <div v-if="getValue(history.once.dec[0]) ==='1'">
      <a-form-item label="过往合作类型" class="form-item-row" selfUpdate>
        <a-checkbox-group v-decorator="history.coo.dec" v-bind="history.coo.other">
          <a-row>
            <a-col v-for="item in history.coo.options" :key="item.id" v-bind="{span:6}">
              <a-checkbox :value="item.value">{{ item.label }}</a-checkbox>
            </a-col>
          </a-row>
        </a-checkbox-group>
      </a-form-item>
      <a-form-item label="历史合作团队" selfUpdate>
        <a-textarea v-decorator="history.team.dec" v-bind="history.team.other"/>
      </a-form-item>
      <a-form-item label="历史清收情况" selfUpdate>
        <a-textarea v-decorator="history.col.dec" v-bind="history.col.other"/>
      </a-form-item>
    </div>
    <a-form-item label="是否曾与其他AMC合作" class="form-item-row" :selfUpdate="false">
      <a-radio-group v-decorator="history.is.dec" v-bind="history.is.other">
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
    <div v-if="getValue(history.is.dec[0]) ==='1'">
      <a-form-item label="历史合作AMC" class="form-item-row" selfUpdate>
        <a-checkbox-group v-decorator="history.type.dec" v-bind="history.type.other">
          <a-row>
            <a-col v-for="item in history.type.options" :key="item.id" v-bind="item.id===0?{span:24}:{span:6}">
              <a-checkbox :value="item.value">{{ item.label }}</a-checkbox>
              <a-input v-if="item.id===0" style="width: 555px" placeholder="请列明具体合作AMC"
                       v-decorator="history.type.detail"/>
            </a-col>
          </a-row>
        </a-checkbox-group>
      </a-form-item>
      <a-form-item label="其他AMC合作情况" selfUpdate>
        <a-textarea v-decorator="history.other.dec" v-bind="history.other.other"/>
      </a-form-item>
    </div>
    <!-- 后续期望合作方向  -->
    <div class="factor-form-subtitle"><span>后续期望合作方向</span></div>
    <a-form-item label="合作意向" class="form-item-row">
      <a-checkbox-group v-decorator="dir.intent.dec" v-bind="dir.intent.other">
        <a-row>
          <a-col v-for="item in dir.intent.options" :key="item.id" v-bind="item.id===0?{span:24}:{span:6}">
            <a-checkbox :value="item.value">{{ item.label }}</a-checkbox>
            <a-input v-if="item.id===0" style="width: 606px;margin-left: 10px" placeholder="多个方向请用中文顿号隔开"
                     v-decorator="dir.intent.detail"/>
          </a-col>
        </a-row>
      </a-checkbox-group>
    </a-form-item>
    <slot name="lawOffice"></slot>
  </a-form>
</template>

<script>
import {baseWidth, textarea, formItemLayout} from "@/views/main/my-attestation/common/style";
import {cooIntent, typeOfCooperation, hisFour} from "@/views/main/my-attestation/common/source";
import {buildSource} from "@/plugin/tools";

const field = ["cooperatedAmc", "cooperatedAmcDetail", "cooperationIntention", "cooperationSituation", "isCooperatedWithOtherAmc", "isCooperatedWithZheshang", "isCooperatedWithZheshangDetail", "liquidationSituation", "otherCooperationIntention", "typeOfCooperationCode", "cooperationTeam"];

export default {
  name: "FormPublic",
  nameComment: '律师机构表单公用-历史合作/后期期望合作',
  data() {
    return {
      formItemLayout,
      history: {
        once: {
          dec: ['isCooperatedWithZheshang', {
            rules: [{required: true, message: '请选择与浙商合作情况'}],
          }],
          detail: ['isCooperatedWithZheshangDetail'],
          other: {
            ...baseWidth,
          }
        },
        coo: {
          dec: ['typeOfCooperationCode', {rules: [{required: true, message: '请选择过往合作类型'}]}],
          options: typeOfCooperation,
          other: {
            ...baseWidth,
          }
        },
        team: {
          // TODO 历史合作情况
          dec: ['cooperationTeam', {rules: [{required: true, message: '请输入历史合作团队!'}]}],
          other: {
            placeholder: '请输入历史合作团队，多个团队以中文顿号隔开',
            ...textarea
          }
        },
        col: {
          dec: ['liquidationSituation', {rules: [{required: true, message: '请简要描述过往合作项目的清收情况'}]}],
          other: {
            placeholder: '请简要描述过往合作项目的清收情况',
            ...textarea
          }
        },
        is: {
          dec: ['isCooperatedWithOtherAmc', {rules: [{required: true, message: '请选择其他AMC合作情况'}]}],
          other: {
            ...baseWidth,
          }
        },
        type: {
          dec: ['cooperatedAmc', {rules: [{required: true, message: '请选择历史合作AMC'}]}],
          options: hisFour,
          detail: ['cooperatedAmcDetail'],
          other: {
            ...baseWidth,
          }
        },
        other: {
          dec: ['cooperationSituation'],
          other: {
            placeholder: '请简要描述与其他AMC合作的情况（包括但不限于合作次数、合作业务类型、业务合作地区、项目成果等等）',
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
      },
      assist: {},
    }
  },
  props: {
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
    getValue(field) {
      if (field) return this.form.getFieldValue(field);
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
      //isCooperatedWithZheshang 是否与浙商合作过（1：是，2：否，0：其他）
      //isCooperatedWithZheshangDetail  是否曾与浙商合作的其他补充

      //cooperatedAmc 历史合作AMC（1：东方，2：长城，3：华融，4：信达，0：地方持牌AMC）
      //cooperatedAmcDetail

      //cooperationIntention 合作意向（1：合作清收，2：保底清收，3：跟投，4：介绍投资人，5：担保类项目，0：其他）
      //otherCooperationIntention 其它合作意向
      return Object.assign({}, source, {
        cooperatedAmc: (source.cooperatedAmc || []).join(','),
        cooperationIntention: (source.cooperationIntention || []).join(','),
        typeOfCooperationCode: (source.typeOfCooperationCode || []).join(','),
        isCooperatedWithZheshangDetail: this.LinkageData(source.isCooperatedWithZheshang, source.isCooperatedWithZheshangDetail),
        cooperatedAmcDetail: this.LinkageData(source.cooperatedAmc, source.cooperatedAmcDetail),
        otherCooperationIntention: this.LinkageData(source.cooperationIntention, source.otherCooperationIntention),
      })
    },
    resetFormValue(source) {
      const {
        isCooperatedWithOtherAmc, isCooperatedWithZheshangDetail, isCooperatedWithZheshang, cooperationIntention,
        typeOfCooperationCode,
        cooperationTeam,
        liquidationSituation,
        cooperatedAmc,
        cooperatedAmcDetail,
        cooperationSituation,
        otherCooperationIntention
      } = source;
      this.form.setFieldsValue({
        isCooperatedWithOtherAmc: isCooperatedWithOtherAmc || undefined,
        isCooperatedWithZheshangDetail,
        isCooperatedWithZheshang:isCooperatedWithZheshang || undefined,
        otherCooperationIntention,
        cooperationIntention: cooperationIntention ? (cooperationIntention || '').split(',') : undefined,
      });
      this.$nextTick(() => {
        if (isCooperatedWithZheshang === '1') {
          this.form.setFieldsValue({
            typeOfCooperationCode: (typeOfCooperationCode || '').split(','),
            cooperationTeam,
            liquidationSituation,
          });
        }
        if (isCooperatedWithOtherAmc === '1') {
          this.form.setFieldsValue({
            cooperatedAmc: (cooperatedAmc || '').split(','),
            cooperatedAmcDetail,
            cooperationSituation,
          });
        }
      });
    },
  },
}
</script>

<style scoped>

</style>
