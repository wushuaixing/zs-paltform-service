<template>
  <a-layout style="padding: 76px 120px 30px;">
    <div class="investment-center-wrapper">
      <div class="header">
        <img :src="img.logo" alt="">
        <span>浙商资产服务项目招商</span>
      </div>
      <div v-if="!isAttestationOmission">
        <div class="query-wrapper">
          <div class="content">
            <div class="part">
              <div class="label">资产地域</div>
              <a-radio-group v-model="queryParams.provinceCode" @change="getTableList" button-style="solid">
                <a-radio-button v-for="item in areaOptions" :value="item.value" :key="item.value">
                  {{ item.label }}
                </a-radio-button>
              </a-radio-group>
            </div>
            <div class="part">
              <div class="label">抵押物类型</div>
              <a-radio-group v-model="queryParams.type" @change="getTableList" button-style="solid">
                <a-radio-button v-for="item in typeOptions" :value="item.value" :key="item.value">
                  {{ item.label }}
                </a-radio-button>
              </a-radio-group>
            </div>
            <div class="part">
              <div class="label">资产规模</div>
              <a-radio-group v-model="queryParams.priceType" @change="getTableList" button-style="solid">
                <a-radio-button v-for="item in gradeOptions" :value="item.value" :key="item.value">
                  {{ item.label }}
                </a-radio-button>
              </a-radio-group>
            </div>
          </div>
        </div>
        <div class="table-wrapper">
          <div class="total-tips">
            *当前条件下共有 {{ total }} 条正在招商的项目
          </div>
          <a-table :columns="columns" :data-source="amcProjectInfo" :row-key="record => record.id">
            <template slot="amount" slot-scope="amount">{{ amount|amountTh }}</template>
            <template slot="security" slot-scope="{security}">{{ SECURITY_TYPE[security] }}</template>
            <template slot="collateralType" slot-scope="{amcProjectCollaterals}">
              <span v-for="item in amcProjectCollaterals" :key="item.id"
                    :style="{marginRight:'5px'}">{{ MSGS_TYPE[item.collateralType] }}</span>
            </template>
            <template slot="area" slot-scope="{amcProjectCollaterals}">
              <p v-for="item in amcProjectCollaterals" :key="item.id">{{ item|area }}</p>
            </template>
            <template slot="auction" slot-scope="item">
              <a-button type="link" size="small" @click="handleAuction(item,'view')">查看抵押物清单</a-button>
              <a-divider type="vertical" style="margin:0"/>
              <a-button type="link" size="small" v-if="!parseInt(item.isSign)" @click="handleAuction(item,'signUp')">
                竞标报名
              </a-button>
              <a-button type="link" size="small" v-else style="cursor: Default">已报名</a-button>
            </template>
          </a-table>
        </div>
      </div>
      <AttestationOmission v-else :attestation="isAttestationOmission===1?'资质认证':'要素认证'"/>
      <ProjectModal :projectInfo="projectInfo" :sign="'signUp'" ref="signUpModal" @handleSignUp="getTableList"/>
      <MsgInfoModal ref="msgInfoModal" :msgInfo="msgInfo"/>
    </div>
  </a-layout>
</template>

<script>
import {columns, MSGS_TYPE, SECURITY_TYPE, areaOptions, typeOptions, gradeOptions} from "./source";
import ProjectModal from '@/components/modal/project-modal';
import MsgInfoModal from './msgsInfo-modal';
import AttestationOmission from '@/components/authentication-omission';
import {clearProto, removeObjectNullVal} from "@/plugin/tools";
import logo from "@/assets/img/logo.png";
import {amcProjectListApi} from "@/plugin/api/investment-center";
import {message} from "ant-design-vue";

export default {
  name: 'InvestmentCenter',
  nameComment: '服务项目招商中心',
  data() {
    return {
      img: {
        logo,
      },
      columns,
      areaOptions,
      typeOptions,
      gradeOptions,
      MSGS_TYPE, //抵质押物类型
      SECURITY_TYPE, //担保方式
      isAttestationOmission: 0,
      total: 0,
      viewModalVisible: false, //查看抵质押物清单弹窗
      queryParams: {
        page: 1,
        size: 10,
        sortOrder: 'DESC',
        provinceCode: '',
        type: '',
        priceType: '',
      },
      // amcProjectInfo: [
      //   {
      //     id: 1,
      //     number: 1,//序号
      //     debtor: '浙江混天绫实业有限公司', //债务人名称
      //     debtCaptial: 14321.123123, //债权本金
      //     debtInterest: 1435, //债权利息
      //     security: 2, //担保方式
      //     type: [1, 2, 3], //抵质押物类型
      //     area: ['广东省湛江市', '浙江省金华市义乌市'],//抵质押物分布区域
      //     deadline: '2023-11-02', //失效日期
      //     isSign: 0, //是否报名
      //     guarantorsList: ['上海市奉贤区南奉公路999弄370号1层，张艰苦，李奋斗'],
      //     msgsInfoList: ['贵州省遵义市播州区鸭溪镇黎明路溪城鸣苑2栋1层1-11号商业用房', '惠州大亚湾霞涌霞光西路3号海韵雅苑2栋24层03号房屋']
      //   },
      //   {
      //     id: 2,
      //     number: 1,//序号
      //     debtor: '浙江混天绫实业有限公司', //债务人名称
      //     debtCaptial: 14321.123123, //债权本金
      //     debtInterest: 1435, //债权利息
      //     security: 2, //担保方式
      //     type: [1, 2, 3], //抵质押物类型
      //     area: ['广东省湛江市', '浙江省金华市义乌市'],//抵质押物分布区域
      //     deadline: '2023-11-02', //失效日期
      //     isSign: 0, //是否报名
      //     guarantorsList: ['上海市奉贤区南奉公路999弄370号1层，张艰苦，李奋斗'],
      //     msgsInfoList: ['贵州省遵义市播州区鸭溪镇黎明路溪城鸣苑2栋1层1-11号商业用房', '惠州大亚湾霞涌霞光西路3号海韵雅苑2栋24层03号房屋']
      //   },
      //   {
      //     id: 3,
      //     number: 1,//序号
      //     debtor: '浙江混天绫实业有限公司', //债务人名称
      //     debtCaptial: 14321.123123, //债权本金
      //     debtInterest: 1435, //债权利息
      //     security: 2, //担保方式
      //     type: [1, 2, 3], //抵质押物类型
      //     area: ['广东省湛江市', '浙江省金华市义乌市'],//抵质押物分布区域
      //     deadline: '2023-11-02', //失效日期
      //     isSign: 0, //是否报名
      //     guarantorsList: ['上海市奉贤区南奉公路999弄370号1层，张艰苦，李奋斗'],
      //     msgsInfoList: ['贵州省遵义市播州区鸭溪镇黎明路溪城鸣苑2栋1层1-11号商业用房', '惠州大亚湾霞涌霞光西路3号海韵雅苑2栋24层03号房屋']
      //   },
      //   {
      //     id: 4,
      //     number: 1,//序号
      //     debtor: '浙江混天绫实业有限公司', //债务人名称
      //     debtCaptial: 14321.123123, //债权本金
      //     debtInterest: 1435, //债权利息
      //     security: 2, //担保方式
      //     type: [1, 2, 3], //抵质押物类型
      //     area: ['广东省湛江市', '浙江省金华市义乌市'],//抵质押物分布区域
      //     deadline: '2023-11-02', //失效日期
      //     isSign: 0, //是否报名
      //     guarantorsList: ['上海市奉贤区南奉公路999弄370号1层，张艰苦，李奋斗'],
      //     msgsInfoList: ['贵州省遵义市播州区鸭溪镇黎明路溪城鸣苑2栋1层1-11号商业用房', '惠州大亚湾霞涌霞光西路3号海韵雅苑2栋24层03号房屋']
      //   },
      //   {
      //     id: 5,
      //     number: 1,//序号
      //     debtor: '浙江混天绫实业有限公司', //债务人名称
      //     debtCaptial: 14321.123123, //债权本金
      //     debtInterest: 1435, //债权利息
      //     security: 2, //担保方式
      //     type: [1, 2, 3], //抵质押物类型
      //     area: ['广东省湛江市', '浙江省金华市义乌市'],//抵质押物分布区域
      //     deadline: '2023-11-02', //失效日期
      //     isSign: 0, //是否报名
      //     guarantorsList: ['上海市奉贤区南奉公路999弄370号1层，张艰苦，李奋斗'],
      //     msgsInfoList: ['贵州省遵义市播州区鸭溪镇黎明路溪城鸣苑2栋1层1-11号商业用房', '惠州大亚湾霞涌霞光西路3号海韵雅苑2栋24层03号房屋']
      //   },
      //   {
      //     id: 6,
      //     number: 1,//序号
      //     debtor: '浙江混天绫实业有限公司', //债务人名称
      //     debtCaptial: 14321.123123, //债权本金
      //     debtInterest: 1435, //债权利息
      //     security: 2, //担保方式
      //     type: [1, 2, 3], //抵质押物类型
      //     area: ['广东省湛江市', '浙江省金华市义乌市'],//抵质押物分布区域
      //     deadline: '2023-11-02', //失效日期
      //     isSign: 0, //是否报名
      //     guarantorsList: ['上海市奉贤区南奉公路999弄370号1层，张艰苦，李奋斗'],
      //     msgsInfoList: ['贵州省遵义市播州区鸭溪镇黎明路溪城鸣苑2栋1层1-11号商业用房', '惠州大亚湾霞涌霞光西路3号海韵雅苑2栋24层03号房屋']
      //   },
      //   {
      //     id: 7,
      //     number: 1,//序号
      //     debtor: '浙江混天绫实业有限公司', //债务人名称
      //     debtCaptial: 14321.123123, //债权本金
      //     debtInterest: 1435, //债权利息
      //     security: 2, //担保方式
      //     type: [1, 2, 3], //抵质押物类型
      //     area: ['广东省湛江市', '浙江省金华市义乌市'],//抵质押物分布区域
      //     deadline: '2023-11-02', //失效日期
      //     isSign: 0, //是否报名
      //     guarantorsList: ['上海市奉贤区南奉公路999弄370号1层，张艰苦，李奋斗'],
      //     msgsInfoList: ['贵州省遵义市播州区鸭溪镇黎明路溪城鸣苑2栋1层1-11号商业用房', '惠州大亚湾霞涌霞光西路3号海韵雅苑2栋24层03号房屋']
      //   },
      //   {
      //     id: 8,
      //     number: 1,//序号
      //     debtor: '浙江混天绫实业有限公司', //债务人名称
      //     debtCaptial: 14321.123123, //债权本金
      //     debtInterest: 1435, //债权利息
      //     security: 2, //担保方式
      //     type: [1, 2, 3], //抵质押物类型
      //     area: ['广东省湛江市', '浙江省金华市义乌市'],//抵质押物分布区域
      //     deadline: '2023-11-02', //失效日期
      //     isSign: 0, //是否报名
      //     guarantorsList: ['上海市奉贤区南奉公路999弄370号1层，张艰苦，李奋斗'],
      //     msgsInfoList: ['贵州省遵义市播州区鸭溪镇黎明路溪城鸣苑2栋1层1-11号商业用房', '惠州大亚湾霞涌霞光西路3号海韵雅苑2栋24层03号房屋']
      //   },
      //   {
      //     id: 9,
      //     number: 1,//序号
      //     debtor: '浙江混天绫实业有限公司', //债务人名称
      //     debtCaptial: 14321.123123, //债权本金
      //     debtInterest: 1435, //债权利息
      //     security: 2, //担保方式
      //     type: [1, 2, 3], //抵质押物类型
      //     area: ['广东省湛江市', '浙江省金华市义乌市'],//抵质押物分布区域
      //     deadline: '2023-11-02', //失效日期
      //     isSign: 0, //是否报名
      //     guarantorsList: ['上海市奉贤区南奉公路999弄370号1层，张艰苦，李奋斗'],
      //     msgsInfoList: ['贵州省遵义市播州区鸭溪镇黎明路溪城鸣苑2栋1层1-11号商业用房', '惠州大亚湾霞涌霞光西路3号海韵雅苑2栋24层03号房屋']
      //   },
      //   {
      //     id: 10,
      //     number: 1,//序号
      //     debtor: '浙江混天绫实业有限公司', //债务人名称
      //     debtCaptial: 14321.123123, //债权本金
      //     debtInterest: 1435, //债权利息
      //     security: 2, //担保方式
      //     type: [1, 2, 3], //抵质押物类型
      //     area: ['广东省湛江市', '浙江省金华市义乌市'],//抵质押物分布区域
      //     deadline: '2023-11-02', //失效日期
      //     isSign: 0, //是否报名
      //     guarantorsList: ['上海市奉贤区南奉公路999弄370号1层，张艰苦，李奋斗'],
      //     msgsInfoList: ['贵州省遵义市播州区鸭溪镇黎明路溪城鸣苑2栋1层1-11号商业用房', '惠州大亚湾霞涌霞光西路3号海韵雅苑2栋24层03号房屋']
      //   },
      //   {
      //     id: 11,
      //     number: 1,//序号
      //     debtor: '浙江混天绫实业有限公司', //债务人名称
      //     debtCaptial: 14321.123123, //债权本金
      //     debtInterest: 1435, //债权利息
      //     security: 2, //担保方式
      //     type: [1, 2, 3], //抵质押物类型
      //     area: ['广东省湛江市', '浙江省金华市义乌市'],//抵质押物分布区域
      //     deadline: '2023-11-02', //失效日期
      //     isSign: 0, //是否报名
      //     guarantorsList: ['上海市奉贤区南奉公路999弄370号1层，张艰苦，李奋斗'],
      //     msgsInfoList: ['贵州省遵义市播州区鸭溪镇黎明路溪城鸣苑2栋1层1-11号商业用房', '惠州大亚湾霞涌霞光西路3号海韵雅苑2栋24层03号房屋']
      //   },
      //   {
      //     id: 12,
      //     number: 1,//序号
      //     debtor: '浙江混天绫实业有限公司', //债务人名称
      //     debtCaptial: 14321.123123, //债权本金
      //     debtInterest: 1435, //债权利息
      //     security: 2, //担保方式
      //     type: [1, 2, 3], //抵质押物类型
      //     area: ['广东省湛江市', '浙江省金华市义乌市'],//抵质押物分布区域
      //     deadline: '2023-11-02', //失效日期
      //     isSign: 0, //是否报名
      //     guarantorsList: ['上海市奉贤区南奉公路999弄370号1层，张艰苦，李奋斗'],
      //     msgsInfoList: ['贵州省遵义市播州区鸭溪镇黎明路溪城鸣苑2栋1层1-11号商业用房', '惠州大亚湾霞涌霞光西路3号海韵雅苑2栋24层03号房屋']
      //   },
      //   {
      //     id: 13,
      //     number: 1,//序号
      //     debtor: '浙江混天绫实业有限公司', //债务人名称
      //     debtCaptial: 14321.123123, //债权本金
      //     debtInterest: 1435, //债权利息
      //     security: 2, //担保方式
      //     type: [1, 2, 3], //抵质押物类型
      //     area: ['广东省湛江市', '浙江省金华市义乌市'],//抵质押物分布区域
      //     deadline: '2023-11-02', //失效日期
      //     isSign: 0, //是否报名
      //     guarantorsList: ['上海市奉贤区南奉公路999弄370号1层，张艰苦，李奋斗'],
      //     msgsInfoList: ['贵州省遵义市播州区鸭溪镇黎明路溪城鸣苑2栋1层1-11号商业用房', '惠州大亚湾霞涌霞光西路3号海韵雅苑2栋24层03号房屋']
      //   },
      //   {
      //     id: 14,
      //     number: 1,//序号
      //     debtor: '浙江混天绫实业有限公司', //债务人名称
      //     debtCaptial: 14321.123123, //债权本金
      //     debtInterest: 1435, //债权利息
      //     security: 2, //担保方式
      //     type: [1, 2, 3], //抵质押物类型
      //     area: ['广东省湛江市', '浙江省金华市义乌市'],//抵质押物分布区域
      //     deadline: '2023-11-02', //失效日期
      //     isSign: 0, //是否报名
      //     guarantorsList: ['上海市奉贤区南奉公路999弄370号1层，张艰苦，李奋斗'],
      //     msgsInfoList: ['贵州省遵义市播州区鸭溪镇黎明路溪城鸣苑2栋1层1-11号商业用房', '惠州大亚湾霞涌霞光西路3号海韵雅苑2栋24层03号房屋']
      //   },
      //   {
      //     id: 15,
      //     number: 1,//序号
      //     debtor: '浙江混天绫实业有限公司', //债务人名称
      //     debtCaptial: 14321.123123, //债权本金
      //     debtInterest: 1435, //债权利息
      //     security: 2, //担保方式
      //     type: [1, 2, 3], //抵质押物类型
      //     area: ['广东省湛江市', '浙江省金华市义乌市'],//抵质押物分布区域
      //     deadline: '2023-11-02', //失效日期
      //     isSign: 0, //是否报名
      //     guarantorsList: ['上海市奉贤区南奉公路999弄370号1层，张艰苦，李奋斗'],
      //     msgsInfoList: ['贵州省遵义市播州区鸭溪镇黎明路溪城鸣苑2栋1层1-11号商业用房', '惠州大亚湾霞涌霞光西路3号海韵雅苑2栋24层03号房屋']
      //   },
      //   {
      //     id: 16,
      //     number: 1,//序号
      //     debtor: '浙江混天绫实业有限公司', //债务人名称
      //     debtCaptial: 14321.123123, //债权本金
      //     debtInterest: 1435, //债权利息
      //     security: 2, //担保方式
      //     type: [1, 2, 3], //抵质押物类型
      //     area: ['广东省湛江市', '浙江省金华市义乌市'],//抵质押物分布区域
      //     deadline: '2023-11-02', //失效日期
      //     isSign: 0, //是否报名
      //     guarantorsList: ['上海市奉贤区南奉公路999弄370号1层，张艰苦，李奋斗'],
      //     msgsInfoList: ['贵州省遵义市播州区鸭溪镇黎明路溪城鸣苑2栋1层1-11号商业用房', '惠州大亚湾霞涌霞光西路3号海韵雅苑2栋24层03号房屋']
      //   },
      //   {
      //     id: 17,
      //     number: 1,//序号
      //     debtor: '浙江混天绫实业有限公司', //债务人名称
      //     debtCaptial: 14321.123123, //债权本金
      //     debtInterest: 1435, //债权利息
      //     security: 2, //担保方式
      //     type: [1, 2, 3], //抵质押物类型
      //     area: ['广东省湛江市', '浙江省金华市义乌市'],//抵质押物分布区域
      //     deadline: '2023-11-02', //失效日期
      //     isSign: 0, //是否报名
      //     guarantorsList: ['上海市奉贤区南奉公路999弄370号1层，张艰苦，李奋斗'],
      //     msgsInfoList: ['贵州省遵义市播州区鸭溪镇黎明路溪城鸣苑2栋1层1-11号商业用房', '惠州大亚湾霞涌霞光西路3号海韵雅苑2栋24层03号房屋']
      //   },
      // ],
      amcProjectInfo: [],
      projectInfo: {},//竞标报名弹窗中-项目信息
      msgInfo: {},//查看抵押物清单
    };
  },
  components: {
    ProjectModal,
    MsgInfoModal,
    AttestationOmission,
  },
  created() {
    this.getTableList();
  },
  methods: {
    getTableList() {
      amcProjectListApi(removeObjectNullVal(this.queryParams)).then((res) => {
        if (res.code === 20000) {
          const data = res.data;
          this.total = data.total;
          this.amcProjectInfo = data.list;
        } else {
          message.warning(res.message)
        }
      })
    },
    handleAuction(params, sign) {
      if (sign === 'signUp') {
        this.projectInfo = clearProto(params);
        this.$refs.signUpModal.handleOpenModal();
      } else {
        this.msgInfo = clearProto(params);
        this.$refs.msgInfoModal.handleOpenModal();
      }
    },
  },
  filters: {
    area: (params) => {
      return `省份：${params.provinceCode} 市区：${params.cityCode} 区：${params.areaCode}`
    }
  }
}
</script>

<style lang='scss'>
.investment-center-wrapper {
  flex: 1;
  background: #ffffff;

  .header {
    display: flex;
    height: 56px;
    align-items: center;
    padding-left: 24px;
    border-bottom: 1px solid #E8E8E8;

    span {
      margin-left: 8px;
      color: #262626;
      font-size: 16px;
      font-weight: 500;
    }
  }

  .query-wrapper {
    padding: 24px;

    .content {
      border: 1px solid #E9E9E9;
    }

    .part {
      display: flex;
      padding: 15px 16px;
      border-bottom: 1px solid #E9E9E9;

      &:last-child {
        border: none;
      }

      .label {
        min-width: 108px;
      }
    }

    .ant-radio-button-wrapper {
      border: none;
      box-shadow: none;
      height: 22px;
      line-height: 22px;
      border-radius: 2px;
      transition: none;
    }

    .ant-radio-button-wrapper::before {
      content: none;
    }
  }

  .table-wrapper {
    padding: 0 24px;

    .total-tips {
      font-size: 14px;
      padding-bottom: 16px;
      line-height: 14px;
      color: #8C8C8C;
    }
  }
}
</style>




