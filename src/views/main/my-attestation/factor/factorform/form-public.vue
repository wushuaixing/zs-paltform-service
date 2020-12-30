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
            <a-input style="width: 606px;margin-left: 3px" placeholder="请说明情况" v-model="assist[history.once.else]"/>
          </a-col>
        </a-row>
      </a-radio-group>
    </a-form-item>
    <template v-if="getValue(history.once.dec[0]) ==='1'">
      <a-form-item label="过往合作类型" class="form-item-row">
        <a-checkbox-group v-decorator="history.coo.dec" v-bind="history.coo.other">
          <a-row>
            <a-col v-for="item in history.coo.options" :key="item.id" v-bind="item.id===0?{span:24}:{span:6}">
              <a-checkbox :value="item.value">{{ item.label }}</a-checkbox>
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
    </template>
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
    <template v-if="getValue(history.is.dec[0]) ==='1'">
      <a-form-item label="历史合作AMC" class="form-item-row">
        <a-checkbox-group v-decorator="history.type.dec" v-bind="history.type.other">
          <a-row>
            <a-col v-for="item in history.type.options" :key="item.id" v-bind="item.id===0?{span:24}:{span:6}">
              <a-checkbox :value="item.value">{{ item.label }}</a-checkbox>
              <a-input v-if="item.id===0" style="width: 555px" placeholder="请列明具体合作AMC"
                       v-model="assist[history.type.else]"/>
            </a-col>
          </a-row>
        </a-checkbox-group>
      </a-form-item>
      <a-form-item label="其他AMC合作情况">
        <a-textarea v-decorator="history.other.dec" v-bind="history.other.other"/>
      </a-form-item>
    </template>
    <!-- 后续期望合作方向  -->
    <div class="factor-form-subtitle"><span>后续期望合作方向</span></div>
    <a-form-item label="合作意向" class="form-item-row">
      <a-checkbox-group v-decorator="dir.intent.dec" v-bind="dir.intent.other">
        <a-row>
          <a-col v-for="item in dir.intent.options" :key="item.id" v-bind="item.id===0?{span:24}:{span:6}">
            <a-checkbox :value="item.value">{{ item.label }}</a-checkbox>
            <a-input v-if="item.id===0" style="width: 606px;margin-left: 10px" placeholder="多个方向请用中文顿号隔开"
                     v-model="assist[dir.intent.else]"/>
          </a-col>
        </a-row>
      </a-checkbox-group>
    </a-form-item>
  </a-form>
</template>

<script>
import {baseWidth, textarea, formItemLayout} from "@/views/main/my-attestation/common/style";
import {cooIntent, hisCoo, hisFour} from "@/views/main/my-attestation/common/source";

export default {
  name: "form-public",
  nameComment: '律师机构表单公用-历史合作/后期期望合作',
  data() {
    return {
      formItemLayout,
      history: {
        once: {
          dec: ['isCooperatedWithZheshang', {
            rules: [{required: true, message: '请选择与浙商合作情况'}],
          }],
          other: {
            ...baseWidth,
          }
        },
        coo: {
          dec: ['typeOfCooperationCode', {rules: [{required: true, message: '请勾选合作类型'}]}],
          options: hisCoo,
          other: {
            ...baseWidth,
          }
        },
        team: {
          // TODO 历史合作情况
          dec: ['once_team', {rules: [{required: true, message: '请填写历史合作团队信息'}]}],
          other: {
            placeholder: '请输入过往合作过的浙商团队，多个团队以中文顿号隔开',
            ...textarea
          }
        },
        col: {
          dec: ['once_col', {rules: [{required: true, message: '请填写历史清收情况'}]}],
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
          dec: ['cooperatedAmc', {rules: [{required: true, message: '至少勾选一项历史合作AMC'}]}],
          options: hisFour,
          else: 'cooperatedAmcDetail',
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
          else: 'otherCooperationIntention',
          options: cooIntent,
          other: {
            ...baseWidth,
          }
        }
      },
      assist: {},
    }
  },
  beforeCreate() {
    this.form = this.$form.createForm(this);
  },
  methods:{
    getValue(field){
      if(field) return this.form.getFieldValue(field);
    },
  }
}
</script>

<style scoped>

</style>