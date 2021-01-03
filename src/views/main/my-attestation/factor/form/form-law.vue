<template>
  <div class="factor-form-wrapper">
    <a-form
      v-bind="formItemLayout"
      :form="form"
      autocomplete="off"
      class="attest-form"
      selfUpdate
    >
      <!-- 基本信息 -->
      <div class="factor-form-subtitle"><span>基本信息</span></div>
      <a-form-item label="毕业院校">
        <a-input v-decorator="field.college.dec" v-bind="field.college.other" />
      </a-form-item>
      <a-form-item label="专业">
        <a-input v-decorator="field.major.dec" v-bind="field.major.other" />
      </a-form-item>
      <a-form-item label="从业不良时间经验">
        <a-radio-group v-decorator="field.exp.dec" v-bind="field.exp.other">
          <a-row>
            <a-col
              v-for="item in field.exp.options"
              :key="item.id"
              v-bind="item.id !== 4 ? { span: 5 } : {}"
            >
              <a-radio :value="item.value">{{ item.label }}</a-radio>
            </a-col>
          </a-row>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="所在地区">
        <a-cascader v-decorator="field.local.dec" v-bind="field.local.other" />
      </a-form-item>
      <a-form-item label="主要涉业地区">
        <el-cascader
          v-bind="field.involve.other"
          @change="(val) => handleEleCas(val, field.involve.dec[0])"
          @visible-change="(val) => (this.visible = val)"
        />
        <a-input v-decorator="field.involve.dec" style="display: none" />
      </a-form-item>
      <a-form-item label="是否有公检法等工作经历" class="form-item-row">
        <a-radio-group v-decorator="field.isPub.dec" v-bind="field.isPub.other">
          <a-row>
            <a-col :span="6"><a-radio value="1">是</a-radio></a-col>
            <a-col :span="6"><a-radio value="2">否</a-radio></a-col>
          </a-row>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="当前是否存在其他兼职/任职" class="form-item-row">
        <a-radio-group v-decorator="field.avo.dec" v-bind="field.avo.other">
          <a-row>
            <a-col :span="6"><a-radio value="1">是</a-radio></a-col>
            <a-col :span="6"><a-radio value="2">否</a-radio></a-col>
          </a-row>
        </a-radio-group>
      </a-form-item>
      <template v-if="getValue(field.avo.dec[0]) === '1'">
        <a-form-item label="兼职/任职单位名称">
          <a-input
            v-decorator="field.avoSite.dec"
            v-bind="field.avoSite.other"
          />
        </a-form-item>
        <a-form-item label="兼职/任职职务">
          <a-input
            v-decorator="field.avoPost.dec"
            v-bind="field.avoPost.other"
          />
        </a-form-item>
      </template>
      <a-form-item label="曾就业律所/单位">
        <a-textarea v-decorator="field.once.dec" v-bind="field.once.other" />
      </a-form-item>
      <a-form-item label="执业经历（不良）">
        <a-textarea
          v-decorator="field.workExp.dec"
          v-bind="field.workExp.other"
        />
      </a-form-item>
      <a-form-item label="执业经历（非不良）">
        <a-textarea
          v-decorator="field.noWorkExp.dec"
          v-bind="field.noWorkExp.other"
        />
      </a-form-item>
      <a-form-item label="是否曾入浙商律所库" class="form-item-row">
        <a-radio-group v-decorator="field.isIn.dec" v-bind="field.isIn.other">
          <a-row>
            <a-col :span="6"><a-radio value="1">是</a-radio></a-col>
            <a-col :span="6"><a-radio value="2">否</a-radio></a-col>
          </a-row>
        </a-radio-group>
      </a-form-item>
      <!-- 擅长优势 -->
      <div class="factor-form-subtitle"><span>擅长优势</span></div>
      <a-form-item label="擅长业务类型" class="form-item-row">
        <a-checkbox-group v-decorator="adv.type.dec" v-bind="adv.type.other">
          <a-row>
            <a-col
              v-for="item in adv.type.options"
              :key="item.id"
              v-bind="item.id === 0 ? { span: 24 } : { span: 6 }"
            >
              <a-checkbox :value="item.value">{{ item.label }}</a-checkbox>
              <a-input
                v-if="item.id === 0"
                style="width: 616px"
                placeholder="多个方向请用中文顿号隔开"
                v-model="assist[adv.type.else]"
              />
            </a-col>
          </a-row>
        </a-checkbox-group>
      </a-form-item>
      <a-form-item label="经典案例">
        <div style="width: 300px">
          <a-upload
            v-decorator="adv.case.dec"
            v-bind="upload.bind"
            v-on="upload.on"
          >
            <a-button> <a-icon type="upload" /> 点击上传 </a-button>
            <span
              class="text-remark"
              style="font-size: 12px; margin-left: 10px; vertical-align: bottom"
            >
              *支持jpg、pdf格式
            </span>
          </a-upload>
        </div>
      </a-form-item>
      <a-form-item label="擅长业务区域">
        <a-textarea v-decorator="adv.area.dec" v-bind="adv.area.other" />
      </a-form-item>
      <a-form-item label="主要代理案件管辖法院">
        <a-input v-decorator="adv.court.dec" v-bind="adv.court.other" />
      </a-form-item>
      <a-form-item label="熟悉法院">
        <a-input v-decorator="adv.court2.dec" v-bind="adv.court2.other" />
      </a-form-item>
      <a-form-item label="其他社会资源优势">
        <a-textarea v-decorator="adv.adv.dec" v-bind="adv.adv.other" />
      </a-form-item>
      <a-form-item label="其他资源" class="form-item-row">
        <a-checkbox-group v-decorator="adv.type1.dec" v-bind="adv.type1.other">
          <a-row>
            <a-col
              v-for="item in adv.type1.options"
              :key="item.id"
              v-bind="item.id === 0 ? { span: 24 } : { span: 6 }"
            >
              <a-checkbox :value="item.value">{{ item.label }}</a-checkbox>
              <a-input
                v-if="item.id === 0"
                style="width: 616px"
                placeholder="多个资源请用中文顿号隔开"
                v-model="assist[adv.type1.else]"
              />
            </a-col>
          </a-row>
        </a-checkbox-group>
      </a-form-item>
      <!-- 历史合作情况 -->
      <div class="factor-form-subtitle"><span>历史合作情况</span></div>
      <a-form-item label="是否曾与浙商合作" class="form-item-row">
        <a-radio-group
          v-decorator="history.once.dec"
          v-bind="history.once.other"
        >
          <a-row>
            <a-col :span="6"><a-radio value="1">是</a-radio></a-col>
            <a-col :span="6"><a-radio value="2">否</a-radio></a-col>
            <a-col :span="24">
              <a-radio value="0">其他</a-radio>
              <a-input
                style="width: 606px; margin-left: 3px"
                placeholder="请说明情况"
                v-model="assist[history.once.else]"
              />
            </a-col>
          </a-row>
        </a-radio-group>
      </a-form-item>
      <template v-if="getValue(history.once.dec[0]) === '1'">
        <a-form-item label="过往合作类型" class="form-item-row">
          <a-checkbox-group
            v-decorator="history.coo.dec"
            v-bind="history.coo.other"
          >
            <a-row>
              <a-col
                v-for="item in history.coo.options"
                :key="item.id"
                v-bind="item.id === 0 ? { span: 24 } : { span: 6 }"
              >
                <a-checkbox :value="item.value">{{ item.label }}</a-checkbox>
                <a-input v-if="item.id === 0" style="width: 100px" />
              </a-col>
            </a-row>
          </a-checkbox-group>
        </a-form-item>
        <a-form-item label="历史合作团队">
          <a-textarea
            v-decorator="history.team.dec"
            v-bind="history.team.other"
          />
        </a-form-item>
        <a-form-item label="历史清收情况">
          <a-textarea
            v-decorator="history.col.dec"
            v-bind="history.col.other"
          />
        </a-form-item>
      </template>
      <a-form-item label="是否曾与其他AMC合作" class="form-item-row">
        <a-radio-group v-decorator="history.is.dec" v-bind="history.is.other">
          <a-row>
            <a-col :span="6"><a-radio value="1">是</a-radio></a-col>
            <a-col :span="6"><a-radio value="2">否</a-radio></a-col>
          </a-row>
        </a-radio-group>
      </a-form-item>
      <template v-if="getValue(history.is.dec[0]) === '1'">
        <a-form-item label="历史合作AMC" class="form-item-row">
          <a-checkbox-group
            v-decorator="history.type.dec"
            v-bind="history.type.other"
          >
            <a-row>
              <a-col
                v-for="item in history.type.options"
                :key="item.id"
                v-bind="item.id === 0 ? { span: 24 } : { span: 6 }"
              >
                <a-checkbox :value="item.value">{{ item.label }}</a-checkbox>
                <a-input
                  v-if="item.id === 0"
                  style="width: 555px"
                  placeholder="请列明具体合作AMC"
                  v-model="assist[history.type.else]"
                />
              </a-col>
            </a-row>
          </a-checkbox-group>
        </a-form-item>
        <a-form-item label="其他AMC合作情况">
          <a-textarea
            v-decorator="history.other.dec"
            v-bind="history.other.other"
          />
        </a-form-item>
      </template>
      <!-- 后续期望合作方向  -->
      <div class="factor-form-subtitle"><span>后续期望合作方向</span></div>
      <a-form-item label="合作意向" class="form-item-row">
        <a-checkbox-group
          v-decorator="dir.intent.dec"
          v-bind="dir.intent.other"
        >
          <a-row>
            <a-col
              v-for="item in dir.intent.options"
              :key="item.id"
              v-bind="item.id === 0 ? { span: 24 } : { span: 6 }"
            >
              <a-checkbox :value="item.value">{{ item.label }}</a-checkbox>
              <a-input
                v-if="item.id === 0"
                style="width: 606px; margin-left: 10px"
                placeholder="多个方向请用中文顿号隔开"
                v-model="assist[dir.intent.else]"
              />
            </a-col>
          </a-row>
        </a-checkbox-group>
      </a-form-item>

      <a-form-item :wrapperCol="{ span: 24 }" v-if="!officeInfo">
        <a-button type="dashed" block icon="plus" @click="handleAddOffice"
          >添加律所信息</a-button
        >
      </a-form-item>
      <div v-if="officeInfo">
        <div class="factor-form-classTitle">
          <div class="classTitle_subtitle">
            <a-icon type="bank" />
            <span>律所信息</span>
          </div>
          <div class="classTitle_action">
            <a-button type="primary" @click="DeleteLawInfo">暂不添加</a-button>
          </div>
        </div>

        <a-form-item label="律所名称">
          <a-input v-decorator="firms.name.dec" v-bind="firms.name.other" />
        </a-form-item>
        <a-form-item label="统一社会信用代码">
          <div>123123123123</div>
          <!--        <a-input v-decorator="firms.code.dec" v-bind="firms.code.other"/>-->
        </a-form-item>
        <a-form-item label="律所地址">
          <a-input v-decorator="firms.add.dec" v-bind="firms.add.other" />
        </a-form-item>
        <a-form-item label="展业地域">
          <el-cascader
            v-bind="firms.involve.other"
            @change="(val) => handleEleCas(val, firms.involve.dec[0])"
            @visible-change="visibleChange"
          />
          <a-input v-decorator="firms.involve.dec" style="display: none" />
        </a-form-item>
        <a-form-item label="律所类型" class="form-item-row">
          <a-radio-group v-decorator="firms.type.dec" v-bind="firms.type.other">
            <a-row>
              <a-col
                v-for="item in firms.type.options"
                :key="item.id"
                v-bind="item.id === 0 ? { span: 24 } : { span: 6 }"
              >
                <a-radio :value="item.value">{{ item.label }}</a-radio>
                <!--<a-input v-if="item.id===0" style="width: 616px" placeholder="多个方向请用中文顿号隔开"/>-->
              </a-col>
            </a-row>
          </a-radio-group>
        </a-form-item>
        <a-form-item label="律所是否持续经营3年以上" class="form-item-row">
          <a-radio-group v-decorator="firms.year.dec" v-bind="firms.year.other">
            <a-row>
              <a-col :span="6"><a-radio value="1">是</a-radio></a-col>
              <a-col :span="6"><a-radio value="2">否</a-radio></a-col>
            </a-row>
          </a-radio-group>
        </a-form-item>
        <a-form-item label="是否存在分所" class="form-item-row">
          <a-radio-group v-decorator="firms.is.dec" v-bind="firms.is.other">
            <a-row>
              <a-col :span="6"><a-radio value="1">是</a-radio></a-col>
              <a-col :span="6"><a-radio value="2">否</a-radio></a-col>
            </a-row>
          </a-radio-group>
        </a-form-item>
        <template v-if="getValue(firms.is.dec[0]) === '1'">
          <a-form-item label="分所展业地域">
            <el-cascader
              v-bind="firms.part.other"
              @change="(val) => handleEleCas(val, firms.part.dec[0])"
              @visible-change="visibleChange"
            />
            <a-input v-decorator="firms.part.dec" style="display: none" />
          </a-form-item>
          <a-form-item label="分所人员情况">
            <a-textarea
              v-decorator="firms.partInfo.dec"
              v-bind="firms.partInfo.other"
            />
          </a-form-item>
        </template>
        <a-form-item label="律所清收团队人数">
          <a-input v-decorator="firms.num.dec" v-bind="firms.num.other" />
        </a-form-item>
        <a-form-item label="本人在律所担任职务" class="form-item-row">
          <a-radio-group v-decorator="firms.duty.dec" v-bind="firms.duty.other">
            <a-row>
              <a-col
                v-for="item in firms.duty.options"
                :key="item.id"
                v-bind="item.id === 0 ? { span: 24 } : { span: 6 }"
              >
                <a-radio :value="item.value">{{ item.label }}</a-radio>
              </a-col>
            </a-row>
          </a-radio-group>
        </a-form-item>
        <a-form-item label="律所简介">
          <a-textarea v-decorator="firms.con.dec" v-bind="firms.con.other" />
        </a-form-item>
        <a-form-item label="律所资质">
          <a-textarea v-decorator="firms.con1.dec" v-bind="firms.con1.other" />
        </a-form-item>
        <a-form-item label="律所业绩介绍">
          <a-textarea v-decorator="firms.con2.dec" v-bind="firms.con2.other" />
        </a-form-item>
      </div>
      <a-form-item label=" " class="form-item-no-title">
        <a-button type="primary" @click="handleSubmit">确认无误并提交</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import { factor } from "@/plugin/api/attest";
import { baseWidth, textarea, formItemLayout } from "../../common/style";
import {
  areaOption,
  expOption,
  hisFour,
  hisCoo,
  cooIntent,
  lawAdvList,
  lawDuty,
  lawType,
  lawAdvType,
} from "../../common/source";
import Deploy, { getValueFromEvent } from "@/plugin/tools/qiniu-deploy";

export default {
  name: "FormLawyerInfo",
  nameComment: "要素信息表单-律师基本信息",
  props: {
    userType: {
      type: String,
      default: "lawyer",
    },
  },
  components: {},
  data() {
    return {
      formItemLayout,
      field: {
        college: {
          dec: [
            "graduateSchool",
            { rules: [{ required: true, message: "毕业院校不能为空" }] },
          ],
          other: {
            placeholder: "请填写毕业院校",
            ...textarea,
          },
        },
        major: {
          dec: [
            "major",
            { rules: [{ required: true, message: "专业不能为空" }] },
          ],
          other: {
            placeholder: "请填写院校所选专业",
            ...textarea,
          },
        },
        exp: {
          dec: [
            "workingTime",
            { rules: [{ required: true, message: "请选择从业不良时间经验!" }] },
          ],
          options: expOption,
          other: { ...baseWidth },
        },
        local: {
          dec: [
            "area",
            { rules: [{ required: true, message: "所在地区不能为空" }] },
          ],
          other: {
            options: areaOption,
            getPopupContainer: (e) => e.parentElement,
            fieldNames: {
              value: "id",
              label: "name",
              children: "children",
            },
            placeholder: "请选择所在地区",
            ...baseWidth,
          },
        },
        involve: {
          dec: [
            "workArea",
            { rules: [{ required: true, message: "主要涉业地区不能为空" }] },
          ],
          other: {
            clearable: true,
            options: areaOption,
            size: "small",
            // collapseTags:true,
            props: {
              value: "id",
              label: "name",
              multiple: true,
              checkStrictly: true,
            },
            placeholder: "请选择主要涉业地区",
            ...baseWidth,
          },
        },
        isPub: {
          dec: [
            "isWorkOfPublicSecurityOrgans",
            {
              rules: [
                { required: true, message: "请选择有公检法等工作经历情况" },
              ],
            },
          ],
          other: {
            ...baseWidth,
          },
        },
        avo: {
          dec: [
            "isWorkOther",
            {
              rules: [
                { required: true, message: "请选择是否存在其他兼职/任职" },
              ],
            },
          ],
          other: {
            ...baseWidth,
          },
        },
        avoSite: {
          dec: [
            "workUnitName",
            {
              rules: [{ required: true, message: "兼职/任职单位名称不能为空" }],
            },
          ],
          other: {
            placeholder: "请填写兼职/任职单位名称",
            ...baseWidth,
          },
        },
        avoPost: {
          dec: [
            "workRole",
            { rules: [{ required: true, message: "兼职/任职职务不能为空" }] },
          ],
          other: {
            placeholder: "请填写兼职/任职职务",
            ...baseWidth,
          },
        },
        once: {
          dec: [
            "formerWorkUnit",
            { rules: [{ required: true, message: "曾就业律所/单位不能为空" }] },
          ],
          other: {
            placeholder:
              "请输入您曾就业的律所或单位名称全称，若曾就业于多家律所或单位，请用中文顿号隔开",
            ...textarea,
          },
        },
        workExp: {
          dec: [
            "badAssetsWorkExp",
            {
              rules: [{ required: true, message: "执业经历（不良）不能为空" }],
            },
          ],
          other: {
            placeholder: "请输入您以往涉及不良资产业务的执业经历经验",
            ...textarea,
          },
        },
        noWorkExp: {
          dec: ["notBadAssetsWorkExp"],
          other: {
            placeholder: "请输入您以往不涉及不良资产业务的执业经历经验",
            ...textarea,
          },
        },
        isIn: {
          dec: [
            "isInStorage",
            {
              rules: [{ required: true, message: "请选择是否曾入浙商律所库" }],
            },
          ],
          other: {
            ...baseWidth,
          },
        },
      },
      adv: {
        case: {
          label: "保密承诺函",
          dec: [
            "confidentialityCommitmentLetter",
            {
              valuePropName: "fileList",
              getValueFromEvent,
            },
          ],
        },
        type: {
          dec: [
            "goodCases",
            { rules: [{ required: true, message: "请选择擅长业务类型" }] },
          ],
          options: lawAdvType,
          else: "otherGoodCases",
          other: {
            ...baseWidth,
          },
        },
        area: {
          dec: [
            "areasOfGoodCases",
            { rules: [{ required: true, message: "擅长业务区域不能为空" }] },
          ],
          other: {
            options: areaOption,
            getPopupContainer: (e) => e.parentElement,
            fieldNames: {
              value: "id",
              label: "name",
              children: "children",
            },
            placeholder: "请选择擅长业务区域",
            ...baseWidth,
          },
        },
        court: {
          dec: [
            "competentCourt",
            {
              rules: [
                { required: true, message: "主要代理案件管辖法院不能为空" },
              ],
            },
          ],
          other: {
            placeholder: "请填写主要代理案件管辖法院",
            ...textarea,
          },
        },
        court2: {
          dec: [
            "familiarCourts",
            { rules: [{ required: true, message: "熟悉法院不能为空" }] },
          ],
          other: {
            placeholder: "请填写熟悉法院",
            ...textarea,
          },
        },
        adv: {
          dec: [
            "otherResourcesAdvantage",
            { rules: [{ required: true, message: "请填写其他社会资源优势" }] },
          ],
          other: {
            placeholder:
              "包括但不限于某法院、法官，法官请以“xx法院-xx法官”形式输入，多个法院、法官间以中文顿号隔开",
            ...textarea,
          },
        },
        type1: {
          dec: ["otherResources"],
          options: lawAdvList,
          else: "otherResourcesDetail",
          other: {
            ...baseWidth,
          },
        },
      },
      history: {
        once: {
          dec: [
            "isCooperatedWithZheshang",
            {
              rules: [{ required: true, message: "请选择与浙商合作情况" }],
            },
          ],
          other: {
            ...baseWidth,
          },
        },
        coo: {
          dec: [
            "typeOfCooperationCode",
            { rules: [{ required: true, message: "请勾选合作类型" }] },
          ],
          options: hisCoo,
          other: {
            ...baseWidth,
          },
        },
        team: {
          // TODO 历史合作情况
          dec: [
            "once_team",
            { rules: [{ required: true, message: "请填写历史合作团队信息" }] },
          ],
          other: {
            placeholder: "请输入过往合作过的浙商团队，多个团队以中文顿号隔开",
            ...textarea,
          },
        },
        col: {
          dec: [
            "once_col",
            { rules: [{ required: true, message: "请填写历史清收情况" }] },
          ],
          other: {
            placeholder: "请简要描述过往合作项目的清收情况",
            ...textarea,
          },
        },
        is: {
          dec: [
            "isCooperatedWithOtherAmc",
            { rules: [{ required: true, message: "请选择其他AMC合作情况" }] },
          ],
          other: {
            ...baseWidth,
          },
        },
        type: {
          dec: [
            "cooperatedAmc",
            { rules: [{ required: true, message: "至少勾选一项历史合作AMC" }] },
          ],
          options: hisFour,
          else: "cooperatedAmcDetail",
          other: {
            ...baseWidth,
          },
        },
        other: {
          dec: ["cooperationSituation"],
          other: {
            placeholder: "请简要描述与其他AMC公司合作的情况",
            ...textarea,
          },
        },
      },
      dir: {
        intent: {
          dec: [
            "cooperationIntention",
            { rules: [{ required: true, message: "请勾选合作意向" }] },
          ],
          else: "otherCooperationIntention",
          options: cooIntent,
          other: {
            ...baseWidth,
          },
        },
      },
      firms: {
        name: {
          dec: [
            "lawOfficeName",
            { rules: [{ required: true, message: "律所名称不能为空" }] },
          ],
          other: {
            placeholder: "请填写律所名称",
            ...textarea,
          },
        },
        code: {
          decA: [
            "code",
            {
              rules: [{ required: true, message: "统一社会信用代码不能为空" }],
            },
          ],
          other: {
            placeholder: "请输入统一社会信用代码",
            ...textarea,
          },
        },
        add: {
          dec: [
            "lawOfficeAddress",
            { rules: [{ required: true, message: "律所地址不能为空" }] },
          ],
          other: {
            placeholder: "请填写律所地址",
            ...textarea,
          },
        },
        involve: {
          dec: [
            "officeWorkAddress",
            { rules: [{ required: true, message: "展业地域不能为空" }] },
          ],
          other: {
            clearable: true,
            options: areaOption,
            size: "small",
            // collapseTags:true,
            props: {
              value: "id",
              label: "name",
              multiple: true,
              checkStrictly: true,
            },
            placeholder: "请选择展业地域",
            ...baseWidth,
          },
        },
        type: {
          dec: [
            "lawOfficeType",
            {
              rules: [{ required: true, message: "请选择律所类型" }],
            },
          ],
          options: lawType,
          other: {
            ...baseWidth,
          },
        },
        year: {
          dec: [
            "isWorkForThreeYear",
            {
              rules: [{ required: true, message: "请选择律所持续经营情况" }],
            },
          ],
          other: {
            ...baseWidth,
          },
        },
        is: {
          dec: [
            "hasOtherOffice",
            {
              rules: [{ required: true, message: "请选择律所分所情况" }],
            },
          ],
          other: {
            ...baseWidth,
          },
        },
        part: {
          dec: [
            "otherOfficeWorkAddress",
            { rules: [{ required: true, message: "分所展业地域不能为空" }] },
          ],
          other: {
            clearable: true,
            options: areaOption,
            size: "small",
            // collapseTags:true,
            props: {
              value: "id",
              label: "name",
              multiple: true,
              checkStrictly: true,
            },
            placeholder: "请选择展业地域",
            ...baseWidth,
          },
        },
        partInfo: {
          dec: [
            "otherOfficeStaffInfo",
            { rules: [{ required: true, message: "请填写分所人员情况" }] },
          ],
          other: {
            placeholder: "请简述分所人员情况",
            ...textarea,
          },
        },
        num: {
          dec: [
            "totalTeamSize",
            {
              rules: [{ required: true, message: "律所清收团队人数不能为空" }],
            },
          ],
          other: {
            placeholder: "请输入清收团队人数",
            style: { width: "200px" },
            addonAfter: "个",
          },
        },
        duty: {
          dec: [
            "roleInLawOffice",
            {
              rules: [{ required: true, message: "请选择担任职务" }],
            },
          ],
          options: lawDuty,
          other: {
            ...baseWidth,
          },
        },
        con: {
          dec: [
            "lawOfficeInformation",
            { rules: [{ required: true, message: "请填写律所简介" }] },
          ],
          other: {
            placeholder: "律所性质，核心成员背景，以及是否有催收公司、典当行等",
            ...textarea,
          },
        },
        con1: {
          dec: [
            "lawOfficeQualify",
            { rules: [{ required: true, message: "请填写律所资质" }] },
          ],
          other: {
            placeholder: "请简述律所资质",
            ...textarea,
          },
        },
        con2: {
          dec: [
            "lawOfficeQualifyPerformance",
            { rules: [{ required: true, message: "请填写律所业绩介绍" }] },
          ],
          other: {
            placeholder: "请简述执业所以往业绩",
            ...textarea,
          },
        },
      },
      assist: {},
      officeInfo: false,
      visible: false,
      upload: {
        on: {
          ...Deploy.event,
        },
        bind: {
          ...Deploy.props,
          accept: "application/pdf,.doc,.docx,application/msword",
          class: "upload-wrapper",
        },
      },
    };
  },
  beforeCreate() {
    this.form = this.$form.createForm(this);
  },
  methods: {
    getValue(field) {
      if (field) return this.form.getFieldValue(field);
    },
    visibleChange(val) {
      this.visible = val;
    },
    // ele 地区多选事件触发
    handleEleCas(val = [], field) {
      const { setFieldsValue, setFields } = this.form;
      if (!this.visible && !val.length) {
        setFields({
          [field]: {
            value: undefined,
            errors: [new Error("主要涉业地区不能为空")],
          },
        });
      } else {
        const str = val.map((i) => i.join("/")).toString();
        console.log(str);
        setFieldsValue({ [field]: str });
      }
    },
    // 移除 律所相关信息警告
    DeleteLawInfo() {
      const _this = this;
      this.$confirm({
        title: "警告",
        content: "确认退出律所信息添加吗",
        okText: "确定",
        okType: "danger",
        cancelText: "取消",
        onOk() {
          _this.officeInfo = false;
        },
        onCancel() {
          console.log("Cancel");
        },
      });
    },
    handleAddOffice() {
      this.officeInfo = true;
    },
    handleSubmit(e) {
      e && e.preventDefault();
      this.form.validateFields((err, data) => {
        console.log(data, this.assist);
        if (!err) {
          factor
            .lawyerAdd({
              lawyerElement: {
                ...data,
                goodCases: (data.goodCases || []).join(","),
                otherGoodCases: (data.otherGoodCases || []).join(","),
                cooperationIntention: (data.cooperationIntention || []).join(
                  ","
                ),
                area: (data.area || []).join("/"),
              },
            })
            .then((res) => {
              console.log(res);
            });
          console.log("Received values of form: ", data);
        }
      });
    },
  },
};
</script>

<style lang='scss'>
.factor-form-wrapper {
  .el-input__icon {
    font-weight: bold;
  }
  .el-input__inner {
    padding-left: 12px;
  }
  .has-error {
    .el-input__inner,
    .el-input__inner:hover {
      background-color: #fff;
      border-color: #f5222d;
    }
    .el-input__icon {
      color: #f5222d;
    }
  }
}
.el-popper[x-placement^="bottom"] {
  margin-top: 5px;
}
.common-file-list {
  > span {
    display: flex;
  }
  .ant-upload-list {
    display: inline-block;
  }
  .ant-upload-list-item-card-actions {
    display: none;
  }
  .ant-upload-list-item {
    margin-top: 0;
    line-height: 24px;
    margin-bottom: 3px;
  }
  .ant-upload-list-item-info {
    padding-left: 0;
  }
}
</style>
