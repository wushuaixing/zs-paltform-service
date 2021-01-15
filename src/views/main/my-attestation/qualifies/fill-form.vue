<template>
  <div class="qualifies-form-wrapper attest-form">
    <slot name="title"/>
    <div style="height: 10px"/>
    <a-form v-bind="formItemLayout" :form="form" autocomplete="off" v-if="userType ==='org'" selfUpdate>

      <div class="common-text-subtitle" style="margin-bottom: 20px" v-if="statusNeed">我的资质认证信息</div>

      <a-form-item :label="org.name.label">
        <a-input v-decorator="org.name.dec" v-bind="org.name.other"/>
      </a-form-item>
      <a-form-item :label="org.code.label">
        <a-input v-decorator="org.code.dec" v-bind="org.code.other"/>
      </a-form-item>
      <!--<a-form-item :label="org.name.label">-->
      <!--<a-select v-decorator="org.name.dec" v-bind="org.name.other">-->
      <!--<a-select-option v-for="i in nameOption" :key="i.id" :value="i.creditCode">{{i.name}}</a-select-option>-->
      <!--</a-select>-->
      <!--</a-form-item>-->
      <!--<a-form-item :label="org.code.label">-->
      <!--<a-input v-decorator="org.code.dec" style="display: none"/>-->
      <!--<span :class="codeClass">{{ relation.codeText }}</span>-->
      <!--</a-form-item>-->
      <a-form-item :label="org.identity.label">
        <a-textarea v-decorator="org.identity.dec" v-bind="org.identity.other"/>
      </a-form-item>
      <a-form-item :label="org.email.label">
        <a-input v-decorator="org.email.dec" v-bind="org.email.other"/>
      </a-form-item>
      <a-form-item :label="org.buEmail.label">
        <a-input v-decorator="org.buEmail.dec" v-bind="org.buEmail.other"/>
      </a-form-item>
      <a-form-item :label="org.license.label" :selfUpdate="false">
        <div class="fill-form-upload-wrapper">
          <a-upload v-decorator="org.license.dec" v-bind="upload.bind" v-on="upload.on">
            <div class="upload-container" v-if="!getValue(org.license.dec[0],1)">
              <a-icon type="plus"/>
            </div>
          </a-upload>
          <div class="upload-text">
            <div>*支持图片、pdf格式</div>
          </div>
        </div>
      </a-form-item>
      <a-form-item :label="org.letter.label" :selfUpdate="false">
        <div class="fill-form-upload-wrapper">
          <a-upload v-decorator="org.letter.dec" v-bind="upload.bind" v-on="upload.on">
            <div class="upload-container" v-if="!getValue(org.letter.dec[0],1)">
              <a-icon type="plus"/>
            </div>
          </a-upload>
          <div class="upload-text">
            <div>*请下载保密承诺函模板，签字、用印后扫描或拍照上传；支持图片、pdf格式</div>
            <a href="https://zsamc-public.zsamc.com/%E3%80%8A%E6%B5%99%E6%B1%9F%E7%9C%81%E6%B5%99%E5%95%86%E8%B5%84%E4%BA%A7%E7%AE%A1%E7%90%86%E6%9C%89%E9%99%90%E5%85%AC%E5%8F%B8%E4%BF%9D%E5%AF%86%E6%89%BF%E8%AF%BA%E4%B9%A6%E3%80%8B.doc"
               style="text-decoration: underline">承诺函模板下载</a>
          </div>
        </div>
      </a-form-item>
      <template v-if="statusNeed">
        <div class="common-text-subtitle" style="margin-bottom: 20px">资质更改证明</div>
        <a-form-item label="资质更改证据材料" :selfUpdate="false">
          <div style="width: 300px">
            <a-upload v-decorator="material.dec" v-bind="{...upload.bind, listType:'text'}" v-on="upload.on">
              <template v-if="!getValue(material.dec[0],1)">
                <a-button icon="upload">点击上传</a-button>
                <span class="text-remark" style="font-size: 12px;margin-left: 10px;">
									<span>*支持图片、pdf格式</span>
								</span>
              </template>
            </a-upload>
          </div>
        </a-form-item>
      </template>

    </a-form>
    <a-form v-bind="formItemLayout" :form="form" autocomplete="off" v-if="userType ==='lawyer'" selfUpdate>

      <div class="common-text-subtitle" style="margin-bottom: 20px" v-if="statusNeed">我的资质认证信息</div>
      <a-form-item :label="law.name.label">
        <a-input v-decorator="law.name.dec" v-bind="law.name.other"/>
        <span class="normal">{{ username }}</span>
      </a-form-item>
      <a-form-item :label="law.idNumber.label">
        <a-input v-decorator="law.idNumber.dec" v-bind="law.idNumber.other"/>
      </a-form-item>
      <a-form-item :label="law.sex.label">
        <a-radio-group v-decorator="law.sex.dec">
          <a-radio value="0">男</a-radio>
          <a-radio value="1">女</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item :label="law.cardNo.label">
        <a-input v-decorator="law.cardNo.dec" v-bind="law.cardNo.other"/>
      </a-form-item>
      <a-form-item :label="law.year.label">
        <a-select v-decorator="law.year.dec" v-bind="law.year.other">
          <a-select-option v-for="i in yearOption" :value="i.value" :key="i.value">{{ i.value }}年</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item :label="law.office.label">
        <a-input v-decorator="law.office.dec" v-bind="law.office.other"/>
        <span class="form-item-remark">*请在签约前完善律所信息</span>
      </a-form-item>
      <a-form-item :label="law.email.label">
        <a-input v-decorator="law.email.dec" v-bind="law.email.other"/>
      </a-form-item>
      <a-form-item :label="law.buEmail.label">
        <a-input v-decorator="law.buEmail.dec" v-bind="law.buEmail.other"/>
      </a-form-item>
      <a-form-item :label="law.card.label" :selfUpdate="false">
        <div class="fill-form-upload-wrapper fill-form-upload__block" style="padding-left: 200px;height: 132px;">
          <a-upload v-decorator="law.card.decA" v-bind="upload.bind" v-on="upload.on">
            <div class="upload-container" v-if="!getValue(law.card.decA[0],1)">
              <a-icon type="plus"/>
            </div>
          </a-upload>
          <div class="upload-text">证件反面（国徽面）</div>
        </div>
        <div class="fill-form-upload-wrapper fill-form-upload__remark">
          <div class="upload-text">*支持图片、pdf格式</div>
        </div>
      </a-form-item>
      <a-form-item class="fill-form-upload__card" :wrapperCol="{span:24}" :selfUpdate="false">
        <div class="fill-form-upload-wrapper fill-form-upload__block" style="height: 132px;">
          <a-upload v-decorator="law.card.decB" v-bind="upload.bind" v-on="upload.on">
            <div class="upload-container" v-if="!getValue(law.card.decB[0],1)">
              <a-icon type="plus"/>
            </div>
          </a-upload>
          <div class="upload-text">证件正面（人像面）</div>
        </div>
      </a-form-item>
      <a-form-item :label="law.cert.label" :selfUpdate="false">
        <div class="fill-form-upload-wrapper">
          <a-upload v-decorator="law.cert.dec" v-bind="upload.bind" v-on="upload.on">
            <div class="upload-container" v-if="!getValue(law.cert.dec[0],1)">
              <a-icon type="plus"/>
            </div>
          </a-upload>
          <div class="upload-text">
            <div>*支持图片、pdf格式</div>
          </div>
        </div>
      </a-form-item>
      <a-form-item :label="law.letter.label" :selfUpdate="false">
        <div class="fill-form-upload-wrapper">
          <a-upload v-decorator="law.letter.dec" v-bind="upload.bind" v-on="upload.on">
            <div class="upload-container" v-if="!getValue(law.letter.dec[0],1)">
              <a-icon type="plus"/>
            </div>
          </a-upload>
          <div class="upload-text">
            <div>*请下载保密承诺函模板，签字、用印后扫描或拍照上传；支持图片、pdf格式</div>
            <a href="https://zsamc-public.zsamc.com/%E3%80%8A%E6%B5%99%E6%B1%9F%E7%9C%81%E6%B5%99%E5%95%86%E8%B5%84%E4%BA%A7%E7%AE%A1%E7%90%86%E6%9C%89%E9%99%90%E5%85%AC%E5%8F%B8%E4%BF%9D%E5%AF%86%E6%89%BF%E8%AF%BA%E4%B9%A6%E3%80%8B.doc"
               style="text-decoration: underline">承诺函模板下载</a>
          </div>
        </div>
      </a-form-item>

      <template v-if="statusNeed">
        <div class="common-text-subtitle" style="margin-bottom: 20px">资质更改证明</div>
        <a-form-item label="资质更改证据材料" :selfUpdate="false">
          <div style="width: 300px">
            <a-upload v-decorator="material.dec" v-bind="{...upload.bind, listType:'text'}" v-on="upload.on">
              <template v-if="!getValue(material.dec[0],1)">
                <a-button icon="upload">点击上传</a-button>
                <span class="text-remark" style="font-size: 12px;margin-left: 10px;">
									<span>*支持图片、pdf格式</span>
								</span>
              </template>
            </a-upload>
          </div>
        </a-form-item>
      </template>
    </a-form>
    <a-form-item label=" " v-bind="formItemLayout" class="form-item-no-title" v-if="noAuction">
      <a-space>
        <a-button type="primary" @click="handleSubmit" v-if="append">确认无误并提交</a-button>
        <template v-else>
          <a-button type="primary">保存</a-button>
          <a-button>取消</a-button>
        </template>
      </a-space>
    </a-form-item>
  </div>
</template>

<script>

import {qualifies} from "@/plugin/api/attest";
import {fileListRuleAsync} from "@/plugin/tools";

import Deploy, {getValueFromEvent, getFileList} from '@/plugin/tools/qiniu-deploy';

const formItemLayout = {
  labelCol: {span: 6},
  wrapperCol: {span: 18},
};

const baseWidth = {
  maxLength: 100,
  style: {width: '678px'}
};

const nameOption = [
  {id: 1, name: '杭州杭州湾建筑劳务有限公司', creditCode: '91330104747171289M'},
  {id: 2, name: '安然数据科技有限公司1', creditCode: '91110112MA01AGNJ8Y'},
  {id: 3, name: '安然数据科技有限公司2', creditCode: ''},
];

const yearOption = (() => {
  const minYear = 1980;
  const maxYear = new Date().getFullYear() + 1;
  const length = maxYear - minYear < 0 ? 50 : maxYear - minYear;
  return new Array(length).fill(1).map((i, index) => ({value: (minYear + length - index).toString()}))
})();


export default {
  name: 'FillForm',
  nameComment: '机构或律师（表单填写）',
  props: {
    userType: {
      type: String,
      default: 'lawyer'
    },
    append: {
      type: Boolean,
      default: true
    },
    isFirst: {
      type: Boolean,
      default: false
    },
    source: {
      type: Object,
      default: () => {
      }
    },
    noAuction: {
      type: Boolean,
      default: true
    },
    onlyData: {
      type: Boolean,
      default: false
    },
    status: {
      type: Number,
      default: 1,
    }
  },
  data() {
    const validateCard = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('身份证号码不能为空'));
      } else {
        const reg = new RegExp(
            /^[1-9]\d{5}(18|19|20|(3\d))\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/);
        if (!reg.test(value)) callback('请输入有效的身份号码');
        callback();
      }
    };
    const CardB = (rule, value, callback) => {
      const cardA = this.getValue(this.law.card.decA[0], 1);
      const cardB = (value || []).length;
      if (!cardB) {
        callback(new Error('请上传身份证'));
      }
      if (!cardA) {
        callback();
      }
      callback();
    };
    const CardA = (rule, value, callback) => {
      const cardB = this.getValue(this.law.card.decB[0], 1);
      const cardA = (value || []).length;
      if (!cardB) {
        callback();
      }
      if (!cardA) {
        callback(new Error('请上传身份证'));
      }
      callback();
    };
    return {
      formItemLayout,
      nameOption,
      yearOption,
      uploadToken: '',
      org: {
        name: {
          label: '机构名称',
          // dec:['name',{
          //     initialValue:'',
          //     rules: [ { required: true, message: '机构名称不能为空！' } ],
          //     // change: this.handleOrgChange,
          //   },
          // ],
          // other:{
          //   allowClear:true,
          //   labelInValue: true,
          //   showSearch: true,
          //   optionFilterProp: "children",
          //   showArrow: false,
          //   filterOption: (input, option) => option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0,
          //   autoComplete:'off',
          //   placeholder:'请输入机构名称',
          //   ...baseWidth,
          // },
          // label:'邮箱地址',
          dec: ['name', {
            rules: [
              {required: true, message: '请输入机构名称'},
              // { min: 4, message: '请输入正确的机构名称'},
            ]
          },
          ],
          other: {
            autoComplete: 'off',
            placeholder: '请输入机构名称',
            ...baseWidth,
            maxLength: 40,
          }
        },
        code: {
          label: '统一社会信用代码',
          // dec:['orgSocialCreditCode'],
          // label:'邮箱地址',
          dec: ['orgSocialCreditCode', {
            rules: [
              {required: true, message: '请输入统一社会信用代码'},
            ]
          },
          ],
          other: {
            autoComplete: 'off',
            placeholder: '请输入统一社会信用代码',
            ...baseWidth,
          }
        },
        identity: {
          label: '合伙人身份',
          dec: ['partnerDetail'],
          other: {
            autoComplete: 'off',
            placeholder: '若为合伙企业请明确执行事务合伙人身份',
            autoSize: {minRows: 4},
            ...baseWidth,
            maxLength: 1024,
          }
        },
        email: {
          label: '邮箱地址',
          dec: ['email', {
            rules: [
              {type: 'email', message: '请输入正确的邮箱地址！'},
              {required: true, message: '请输入邮箱地址！'},
            ]
          },
          ],
          other: {
            placeholder: '请输入邮箱地址',
            ...baseWidth,
          }
        },
        buEmail: {
          label: '备用邮箱',
          dec: ['backupEmail', {
            rules: [{type: 'email', message: '请输入正确的邮箱地址！'}],
          }],
          other: {
            placeholder: '请输入备用的邮箱地址',
            ...baseWidth,
          }
        },
        license: {
          label: '营业执照',
          dec: ['businessLicense', {
            valuePropName: 'fileList',
            getValueFromEvent,
            rules: [
              {required: true, message: '请上传营业执照!'},
            ]
          },
          ],
        },
        letter: {
          label: '保密承诺函',
          dec: ['confidentialityCommitmentLetter', {
            valuePropName: 'fileList',
            getValueFromEvent,
            rules: [{required: true, message: '请上传保密承诺函!'},
            ]
          }],
        },
      },
      law: {
        name: {
          label: '律师姓名',
          dec: ['lawyerName'],
          other: {
            style: {
              display: 'none',
              width: '442px'
            },
            maxLength: 40,
          }
        },
        idNumber: {
          label: '身份证号码',
          dec: ['cardNumber', {
            trigger: 'blur',
            rules: [{required: true, validator: validateCard}]
          }],
          other: {
            placeholder: '请输入身份证号码',
            ...baseWidth,
            maxLength: 18,

          }
        },
        sex: {
          label: '性别',
          dec: ['sex', {
            rules: [{required: true, message: '请选择性别！'},]
          }],
        },
        cardNo: {
          label: '执业证号',
          dec: ['licenseNumber', {
            rules: [{required: true, message: '请输入执业证号!'},
              {pattern: /^([0-9a-zA-Z]{14}|[0-9a-zA-Z]{17})$/, message: '请输入正确格式的执业证号'},
            ]
          }],
          other: {
            placeholder: '请输入执业证号',
            ...baseWidth,
            maxLength: 17,

          }
        },
        year: {
          label: '执业开始年份',
          dec: ['licenseStart', {
            rules: [{required: true, message: '请选择执业开始年份！'},]
          }],
          other: {
            allowClear: true,
            placeholder: '请选择执业开始年份',
            style: {
              width: '175px'
            }
          }
        },
        office: {
          label: '挂靠律所',
          dec: ['lawOffice'],
          other: {
            placeholder: '请输入挂靠律所',
            style: {
              width: '450px'
            }
          }
        },
        email: {
          label: '邮箱地址',
          dec: ['email', {
            rules: [
              {type: 'email', message: '请输入正确的邮箱地址！'},
              {required: true, message: '请输入邮箱地址！!'},
            ],
          }],
          other: {
            placeholder: '请输入邮箱地址',
            ...baseWidth,
          }
        },
        buEmail: {
          label: '备用邮箱',
          dec: ['backupEmail', {
            rules: [
              {type: 'email', message: '请输入正确的邮箱地址！'},
            ]
          },
          ],
          other: {
            placeholder: '请输入备用的邮箱地址',
            ...baseWidth,
          }
        },
        card: {
          label: '身份证照片',
          decA: ['frontOfCard', {
            valuePropName: 'fileList',
            getValueFromEvent,
            rules: [
              {required: true, validator: CardA},
            ]
          }],
          decB: ['backOfCard', {
            valuePropName: 'fileList',
            getValueFromEvent,
            rules: [
              {required: true, validator: CardB},
            ]
          }],
        },
        cert: {
          label: '从业资格证',
          dec: ['qualificationCertificate', {
            valuePropName: 'fileList',
            getValueFromEvent,
            rules: [
              {required: true, message: '请上传从业资格证!'},
            ]
          }],
        },
        letter: {
          label: '保密承诺函',
          dec: ['confidentialityCommitmentLetter', {
            valuePropName: 'fileList',
            getValueFromEvent,
            rules: [
              {required: true, message: '请上传保密承诺函!'},
            ]
          }],
        },
      },
      material: {
        dec: ['qualifyMaterial', {
          rules: [{required: true, message: '请选择上传资质更改证明'},],
          valuePropName: 'fileList',
          getValueFromEvent,
        }],
      },
      upload: {
        on: {
          ...Deploy.event
        },
        bind: {
          ...Deploy.props,
          accept: 'application/pdf,image/*',
          listType: "picture-card",
          class: 'upload-wrapper',
        }
      },
      // 联动字段属性
      relation: {
        codeStatus: 'hint',
        codeText: ' 自动匹配所选机构的统一社会信用代码',
      },
    };
  },
  created() {
    this.form = this.$form.createForm(this);
  },
  methods: {
    // 获取状态值，及判断
    getValue(field, _value) {
      if (field) {
        const value = (this.form.getFieldValue(field) || []).length;
        return _value ? _value === value : value;
      }
    },
    // 下拉搜索相关逻辑
    handleOrgChange(option = {}) {
      const orgSocialCreditCode = option.key || '';
      if (Object.keys(option).length) {
        this.relation = orgSocialCreditCode ? {
          codeStatus: 'normal',
          codeText: orgSocialCreditCode
        } : {
          codeStatus: 'error',
          codeText: '当前机构名称并未匹配到，社会统一社会信用代码'
        };
      } else {
        this.relation = {
          codeStatus: 'hint',
          codeText: '自动匹配所选机构的统一社会信用代码'
        }
      }
      this.form.setFieldsValue({orgSocialCreditCode});
      // if(option.key)
    },
    // 确认无误并提交
    handleSubmit(e) {
      (e || window.event).preventDefault();
      return new Promise((resolve, reject) => {
        this.form.validateFields((err, values) => {
          if (!err) {
            // console.log('Received values of form: ', values);
            const source = this.processData(values);
            if (!this.onlyData) this.toUpdateInfo(source);
            resolve(source)
          } else {
            reject(err)
          }
        });
      })

    },
    // 变更认证信息
    toUpdateInfo(_source) {
      const addApi = this.userType === 'lawyer' ? qualifies.lawyerAdd : qualifies.orgAdd;
      addApi(_source).then(res => {
        if (res.code === 20000) {
          this.$store.commit("updateQualify");
          if (this.isFirst) {
            this.$success({
              title: '资质认证提交成功',
              okText: '点击前往"要素认证"',
              onOk: () => {
                this.$store.dispatch("updateIdentity", this.userType === 'lawyer' ? 1 : 2);
                this.$router.push('/attest/factor');
              }
            })
          }
          this.$emit('toTellRes', res)
        } else {
          this.$message.error('资质认证提交失败！');
        }
      })
    },
    // 处理当前数据
    processData(source = {}) {
      if (this.userType === 'org') {
        return Object.assign({}, source, {
          qualifyMaterial: getFileList(source.qualifyMaterial),
          businessLicense: getFileList(source.businessLicense),
          confidentialityCommitmentLetter: getFileList(source.confidentialityCommitmentLetter),
        })
      } else {
        const _source = Object.assign({}, source, {
          qualifyMaterial: getFileList(source.qualifyMaterial),
          frontOfCard: getFileList(source.frontOfCard),
          backOfCard: getFileList(source.backOfCard),
          qualificationCertificate: getFileList(source.qualificationCertificate),
          confidentialityCommitmentLetter: getFileList(source.confidentialityCommitmentLetter),
        });
        return {lawyerQualify: {..._source}}
      }
    },
    // resetFormValue
    async resetFormValue(source) {
      this.form.resetFields();
      const {
        backOfCard: bc, frontOfCard: fc, confidentialityCommitmentLetter: cc, businessLicense: bl, qualifyMaterial: qm,
        qualificationCertificate: qc, ..._source
      } = source;
      const fieldValues = this.userType === 'lawyer' ? {
        ..._source,
        licenseStart: source.licenseStart || undefined,
        backOfCard: bc ? await fileListRuleAsync(bc) : undefined,
        frontOfCard: fc ? await fileListRuleAsync(fc) : undefined,
        confidentialityCommitmentLetter: await fileListRuleAsync(cc),
        qualificationCertificate: await fileListRuleAsync(qc),
      } : {
        ..._source,
        businessLicense: await fileListRuleAsync(bl),
        confidentialityCommitmentLetter: await fileListRuleAsync(cc),
      };
      let qualifyMaterial = '';
      if (this.statusNeed) {
        qualifyMaterial = qm ? await fileListRuleAsync(qm) : undefined;
      }

      delete fieldValues.qualifyMaterial;
      delete fieldValues.contact;
      delete fieldValues.logId;
      delete fieldValues.createTime;
      delete fieldValues.phone;
      this.form.setFieldsValue({...fieldValues});
      this.$nextTick(() => {
        if (this.statusNeed) {
          this.form.setFieldsValue({
            qualifyMaterial,
          });
        }

      })
    },
  },
  computed: {
    codeClass: function () {
      if (this.relation.codeStatus === 'hint') return 'text-remark';
      if (this.relation.codeStatus === 'error') return 'text-error';
      else return 'normal';
    },
    username() {
      return this.$store.getters.getInfo.username;
    },
    statusNeed() {
      return this.status >= 3;
    }
  },
  async mounted() {
    // console.log(this.$store.getters.getInfo.username);
    const lawyerName = this.$store.getters.getInfo.username;
    if (this.form && this.userType === 'lawyer') {
      this.form.setFieldsValue({lawyerName})
    }
    if (Object.keys(this.source || {}).length) {
      await this.resetFormValue(this.source);
    }
  }
}
</script>

<style lang='scss'>
.qualifies-form-wrapper {
  .fill-form-upload {
    &__remark {
      display: inline-block;
      vertical-align: bottom;
      margin-bottom: 38px;
    }

    &__block {
      display: inline-block;
    }

    &-wrapper {
      .upload-wrapper {
        overflow: hidden;
        display: inline;

        .ant-upload-select-picture-card {
          width: 184px;
          height: 104px;
        }

        .upload-container {
          width: 184px;
          display: table-cell;
          vertical-align: middle;

          i {
            color: rgba(0, 0, 0, 0.25);
            font-size: 30px;
            transition: all 0.3s;
          }
        }

        /*.ant-upload-list-picture-card .ant-upload-list-item-thumbnail img{*/
        /*object-fit: contain;*/
        /*-o-object-fit: contain;*/
        /*}*/
        .ant-upload-list-picture-card-container {
          width: 184px;

          .ant-upload-list-item {
            width: 184px;
          }
        }

      }

      .upload-text {
        line-height: 20px;
        font-size: 12px;
      }
    }

    &__card {
      margin-bottom: 0;

      .ant-form-item-control {
        position: absolute;
        top: -162px;
        left: 25%;
      }
    }
  }

  .form-item-remark {
    margin-left: 10px;
    color: $text-remark;
  }

}
</style>
