<template>
  <div class="qualifies-form-wrapper attest-form">
    <slot name="title"/>
    <div style="height: 10px"/>
    <a-form v-bind="formItemLayout" :form="form" autocomplete="off" v-if="userType ==='org'">
      <a-form-item :label="org.name.label">
        <a-select v-decorator="org.name.dec" v-bind="org.name.other">
          <a-select-option v-for="i in nameOption" :key="i.id" :value="i.creditCode">{{i.name}}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item :label="org.code.label">
        <a-input v-decorator="org.code.dec" style="display: none"/>
        <span :class="codeClass">{{ relation.codeText }}</span>
      </a-form-item>
      <a-form-item :label="org.identity.label">
        <a-textarea v-decorator="org.identity.dec" v-bind="org.identity.other"/>
      </a-form-item>
      <a-form-item :label="org.email.label">
        <a-input v-decorator="org.email.dec" v-bind="org.email.other"/>
      </a-form-item>
      <a-form-item :label="org.buEmail.label">
        <a-input v-decorator="org.buEmail.dec" v-bind="org.buEmail.other"/>
      </a-form-item>
      <a-form-item :label="org.license.label">
        <div class="fill-form-upload-wrapper">
          <a-upload v-decorator="org.license.dec" v-bind="org.letter.other" class="upload-wrapper">
            <div class="upload-container">
              <a-icon type="plus" />
            </div>
          </a-upload>
          <div class="upload-text">
            <div>*支持jpg、pdf格式</div>
          </div>
        </div>
      </a-form-item>
      <a-form-item :label="org.letter.label">
        <div class="fill-form-upload-wrapper">
          <a-upload v-decorator="org.letter.dec" v-bind="org.letter.other" class="upload-wrapper">
            <div class="upload-container">
              <a-icon type="plus" />
            </div>
          </a-upload>
          <div class="upload-text">
            <div>*请下载保密承诺函模板，签字、用印后扫描或拍照上传；支持jpg、pdf格式</div>
            <a href="#">承诺函模板下载</a>
          </div>
        </div>
      </a-form-item>
    </a-form>
    <a-form v-bind="formItemLayout" :form="form" autocomplete="off" v-if="userType ==='lawyer'">
      <a-form-item :label="law.name.label">
        <a-input v-decorator="law.name.dec" v-bind="law.name.other"/>
      </a-form-item>
      <a-form-item :label="law.idNumber.label">
        <a-input v-decorator="law.idNumber.dec" v-bind="law.idNumber.other"/>
      </a-form-item>
      <a-form-item :label="law.sex.label">
        <a-radio-group v-decorator="law.sex.dec">
          <a-radio value="a">男</a-radio>
          <a-radio value="b">女</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item :label="law.cardNo.label">
        <a-input v-decorator="law.cardNo.dec" v-bind="law.cardNo.other"/>
      </a-form-item>
      <a-form-item :label="law.year.label">
        <a-select v-decorator="law.year.dec" v-bind="law.year.other">
          <a-select-option value="china">
            China
          </a-select-option>
          <a-select-option value="usa">
            U.S.A
          </a-select-option>
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
      <a-form-item :label="law.card.label" >
        <div class="fill-form-upload-wrapper fill-form-upload__block" style="padding-left: 200px">
          <a-upload v-decorator="law.card.decA" v-bind="law.card.other" class="upload-wrapper">
            <div class="upload-container">
              <a-icon type="plus" />
            </div>
          </a-upload>
          <div class="upload-text">证件正面（国徽面）</div>
        </div>
        <div class="fill-form-upload-wrapper fill-form-upload__remark">
          <div class="upload-text">*支持jpg、pdf格式</div>
        </div>
      </a-form-item>
      <a-form-item class="fill-form-upload__card" :wrapperCol="{span:24}">
        <div class="fill-form-upload-wrapper fill-form-upload__block">
          <a-upload v-decorator="law.card.decB" v-bind="law.card.other" class="upload-wrapper">
            <div class="upload-container">
              <a-icon type="plus" />
            </div>
          </a-upload>
          <div class="upload-text">证件正面（人像面）</div>
        </div>
      </a-form-item>
      <a-form-item :label="law.cert.label">
        <div class="fill-form-upload-wrapper">
          <a-upload v-decorator="law.cert.dec" v-bind="law.cert.other" class="upload-wrapper">
            <div class="upload-container">
              <a-icon type="plus" />
            </div>
          </a-upload>
          <div class="upload-text">
            <div>*支持jpg、pdf格式</div>
          </div>
        </div>
      </a-form-item>
      <a-form-item :label="law.letter.label">
        <div class="fill-form-upload-wrapper">
          <a-upload v-decorator="law.letter.dec" v-bind="law.letter.other" class="upload-wrapper">
            <div class="upload-container">
              <a-icon type="plus" />
            </div>
          </a-upload>
          <div class="upload-text">
            <div>*请下载保密承诺函模板，签字、用印后扫描或拍照上传；支持jpg、pdf格式</div>
            <a href="#">承诺函模板下载</a>
          </div>
        </div>
      </a-form-item>
    </a-form >
    <a-form-item label=" " v-bind="formItemLayout" class="form-item-no-title">
      <a-space>
        <a-button type="primary" @click="handleSubmit" v-if="append">确认无误并提交</a-button>
        <template v-else>
          <a-button type="primary">保存</a-button>
          <a-button >取消</a-button>
        </template>
      </a-space>
    </a-form-item>
  </div>
</template>

<script>
const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

// const baseWidth = {
//   style:{ width:'442px' }
// };

const nameOption = [
  { id :1, name:'杭州杭州湾建筑劳务有限公司',creditCode:'91330104747171289M'},
  { id :2, name:'安然数据科技有限公司1',creditCode:'91110112MA01AGNJ8Y'},
  { id :3, name:'安然数据科技有限公司2',creditCode:''},
];

export default {
  name: 'FillForm',
  nameComment: '机构或律师（表单填写）',
  props:{
    userType:{
      type:String,
      default:'lawyer'
    },
    append:{
      type:Boolean,
      default:true
    },
    source:Object,
  },
  data() {
    return {
      formItemLayout,
      nameOption,
      org:{
        name:{
          label:'机构名称',
          dec:[
            'name',{
              rules: [ { required: true, message: '机构名称不能为空！' } ],
              change: this.handleOrgChange,
            },
          ],
          other:{
            allowClear:true,
            labelInValue: true,
            showSearch: true,
            optionFilterProp: "children",
            showArrow: false,
            filterOption: (input, option) => option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0,
            autoComplete:'off',
            placeholder:'请输入机构名称',
            style:{
              width:'442px'
            }
          }
        },
        code:{
          label:'统一社会信用代码',
          dec:['orgSocialCreditCode'],
        },
        identity:{
          label:'合伙人身份',
          dec:['partnerDetail'],
          other:{
            autoComplete:'off',
            placeholder:'若为合伙企业请明确执行事务合伙人身份',
            style:{
              width:'442px'
            },
            autoSize:{ minRows: 4 }
          }
        },
        email:{
          label:'邮箱地址',
          dec:['email', { rules: [
                { type: 'email',message: '请输入正确的邮箱地址！'},
                { required: true, message: '邮箱地址不能为空!' },
              ]
            },
          ],
          other:{
            placeholder:'请输入邮箱地址',
            style:{
              width:'442px'
            }
          }
        },
        buEmail:{
          label:'备用邮箱',
          dec:[
            'buEmail', {
              rules: [
                { type: 'email',message: '请输入正确的邮箱地址！' },
              ],
            },
          ],
          other:{
            placeholder:'请输入备用的邮箱地址',
            style:{
              width:'442px'
            }
          }
        },
        license:{
          label:'营业执照',
          dec:[ 'license', {
            valuePropName: 'fileList',
            getValueFromEvent: this.normFile,
            rules: [
              { required: true, message: '请上传营业执照!' },
            ]
          },
          ],
          other:{
            beforeUpload:()=>false,
            listType:"picture-card",
            accept:'application/pdf,image/*',
          }
        },
        letter:{
          label:'保密承诺函',
          dec:[ 'letter', {
            valuePropName: 'fileList',
            getValueFromEvent: this.normFile,
            rules: [ { required: true, message: '请上传保密承诺函!' },
            ]
          }],
          other:{
            beforeUpload:()=>false,
            listType:"picture-card",
            accept:'application/pdf,image/*',
          }
        },
      },
      law:{
        name:{
          label:'律师姓名',
          dec:[ 'username'],
          other:{
            disabled:true,
            style:{
              width:'442px'
            }
          }
        },
        idNumber:{
          label:'身份证号码',
          dec:[ 'idNumber', {
            rules: [
              { required: true, message: '身份证号码不能为空！' },
            ]
          }],
          other:{
            placeholder:'请输入身份证号码',
            style:{
              width:'442px'
            }
          }
        },
        sex:{
          label:'性别',
          dec:[ 'sex', {
            rules: [
              { required: true, message: '请选择性别！' },
            ]
          }],
        },
        cardNo:{
          label:'执业证号',
          dec:[ 'cardNo', {
            rules: [
              { required: true, message: '执业证号不能为空!' },
            ]
          }],
          other:{
            placeholder:'请输入执业证号',
            style:{
              width:'442px'
            }
          }
        },
        year:{
          label:'执业开始年份',
          dec:[ 'startYear',{
            rules: [
              { required: true, message: '身份证号码不能为空！' },
            ]
          }],
          other:{
            placeholder:'请选择年份',
            style:{
              width:'152px'
            }
          }
        },

        office:{
          label:'挂靠律所',
          dec:[ 'office'],
          other:{
            placeholder:'请输入挂靠律所',
            style:{
              width:'442px'
            }
          }
        },
        email:{
          label:'邮箱地址',
          dec:['email', { rules: [
              { type: 'email',message: '请输入正确的邮箱地址！' },
              { required: true, message: '邮箱地址不能为空!' },
            ],
          },
          ],
          other:{
            placeholder:'请输入邮箱地址',
            style:{
              width:'442px'
            }
          }
        },
        buEmail:{
          label:'备用邮箱',
          dec:[
            'buEmail', {
              rules: [
                { type: 'email',message: '请输入正确的邮箱地址！' },
              ],
            },
          ],
          other:{
            placeholder:'请输入备用的邮箱地址',
            style:{
              width:'442px'
            }
          }
        },
        card:{
          label:'身份证照片',
          decA:[ 'idCardA', {
            valuePropName: 'fileList',
            getValueFromEvent: this.normFile,
            rules: [
              { required: true, message: '请上传身份证照片!' },
            ]
          }],
          decB:[ 'idCardB', {
            valuePropName: 'fileList',
            getValueFromEvent: this.normFile,
          }],
          other:{
            beforeUpload:()=>false,
            listType:"picture-card",
          }
        },
        cert:{
          label:'从业资格证',
          dec:[ 'license', {
            valuePropName: 'fileList',
            getValueFromEvent: this.normFile,
            rules: [
              { required: true, message: '请上传从业资格证!' },
            ]
          }],
          other:{
            beforeUpload:()=>false,
            listType:"picture-card",
          }
        },
        letter:{
          label:'保密承诺函',
          dec:[ 'letter', {
            valuePropName: 'fileList',
            getValueFromEvent: this.normFile,
            rules: [
              { required: true, message: '请上传保密承诺函!' },
            ]
          },
          ],
          other:{
            beforeUpload:()=>false,
            listType:"picture-card",
          }
        },

      },
      fileLists:0,
      // 联动字段属性
      relation:{
        codeStatus:'hint',
        codeText:' 自动匹配所选机构的统一社会信用代码',
      },
    };
  },
  created() {
    this.form = this.$form.createForm(this);
  },
  methods:{
    // 下拉搜索相关逻辑
    handleOrgChange(option = {}) {
      const orgSocialCreditCode = option.key || '';
      if(Object.keys(option).length){
        this.relation = orgSocialCreditCode ? {
          codeStatus:'normal',
          codeText:orgSocialCreditCode
        } : {
          codeStatus:'error',
          codeText:'当前机构名称并未匹配到，社会统一社会信用代码'
        };
      }else{
        this.relation = {
          codeStatus:'hint',
          codeText:'自动匹配所选机构的统一社会信用代码'
        }
      }
      this.form.setFieldsValue({ orgSocialCreditCode });
      // if(option.key)
    },
    // validateToNextPassword(rule, value, callback) {
    //   console.log(111111);
    //   const form = this.form;
    //   if (value && this.confirmDirty) {
    //     form.validateFields(['confirm'], { force: true });
    //   }
    //   callback();
    // },
    normFile(e) {
      console.log('Upload event:', e);
      if (Array.isArray(e)) {
        return e;
      }
      this.fileLists = e.fileList.length;
      return e && e.fileList;
    },

    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
        }
      });
    },
    // 处理当前数据
    processData(source = {}){
      const _source = this.userType === 'lawyer' ? {
        letter:'https://qiniu.yczcjk.com/123.png',
        license:'https://qiniu.yczcjk.com/123.png',
        name:(source.name || {}).label
      } : {

      };
      return Object.assign({},source,_source)
    },
  },
  computed:{
    codeClass:function () {
      if(this.relation.codeStatus === 'hint') return 'text-remark';
      if(this.relation.codeStatus === 'error') return 'text-error';
      else return 'normal';
    },
  }
}
</script>

<style lang='scss'>
.qualifies-form-wrapper{
  .fill-form-upload{
    &__remark{
      display: inline-block;
      vertical-align: bottom;
      margin-bottom: 38px;
    }
    &__block{
      display: inline-block;
    }
    &-wrapper{
      .upload-wrapper{
        overflow: hidden;
        display: inline;
        .ant-upload-select-picture-card{
          width: 184px;
          height: 104px;
        }
        .upload-container{
          width: 184px;
          display: table-cell;
          vertical-align: middle;
          i{
            color: rgba(0, 0, 0, 0.25);
            font-size: 30px;
            transition: all 0.3s;
          }
        }
        .ant-upload-list-picture-card-container{
          width: 184px;
          .ant-upload-list-item{
            width: 184px;
          }
        }

      }
      .upload-text{
        line-height: 20px;
        font-size: 12px;
      }
    }
    &__card{
      margin-bottom: 0;
      .ant-form-item-control{
        position: absolute;
        top: -165px;
        left:33.333%;
      }
    }
  }
  .form-item-remark{
    margin-left: 10px;
    font-size: 12px;
    color: $text-remark;
  }
  .text-remark{
    color: $text-remark;
  }
  .text-error{
    color: $common-error;
  }
}
</style>
