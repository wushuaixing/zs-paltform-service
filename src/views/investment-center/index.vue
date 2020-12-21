<template>
  <a-layout style="padding: 76px 120px 30px;">
    <div class="investment-center-wrapper">
      <div class="header">
        <img src="@/assets/img/logo.png" alt="">
        <span>浙商资产服务项目招商</span>
      </div>
      <templete v-if="!isAttestationOmission">
        <div class="query-wrapper">
          <div class="content">
            <div class="part">
              <div class="label">资产地域</div>
              <a-radio-group v-model="queryParams.area" @change="onChange" button-style="solid">
                <a-radio-button v-for="item in areaOptions" :value="item.value" :key="item.value">
                  {{ item.label }}
                </a-radio-button>
              </a-radio-group>
            </div>
            <div class="part">
              <div class="label">抵押物类型</div>
              <a-radio-group v-model="queryParams.type" @change="onChange" button-style="solid">
                <a-radio-button v-for="item in typeOptions" :value="item.value" :key="item.value">
                  {{ item.label }}
                </a-radio-button>
              </a-radio-group>
            </div>
            <div class="part">
              <div class="label">资产规模</div>
              <a-radio-group v-model="queryParams.grade" @change="onChange" button-style="solid">
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
          <a-table :columns="columns" :data-source="amcProjectInfo">
            <template slot="amount" slot-scope="amount">{{ amount|amountTh }}</template>
            <template slot="type" slot-scope="{type}">
              <span v-for="item in type" :key="item" :style="{marginRight:'5px'}">{{ MSGS_TYPE[item] }}</span>
            </template>
            <template slot="area" slot-scope="{area}">
              <p v-for="item in area" :key="item" :style="{margin:'0px'}">{{ item }}</p>
            </template>
            <template slot="auction" slot-scope="item">
              <a-button type="link" size="small" @click="handleAuction(item,'view')">查看抵押物清单</a-button>
              <a-divider type="vertical" style="margin:0"/>
              <a-button type="link" size="small" v-if="item.signUpStatus" @click="handleAuction(item,'signUp')">竞标报名
              </a-button>
              <a-button type="link" size="small" v-else style="cursor: Default">已报名</a-button>
            </template>
          </a-table>
        </div>
      </templete>
      <AttestationOmission v-else :attestation="isAttestationOmission===1?'资质认证':'要素认证'"/>
      <ProjectModal :projectInfo="projectInfo" :sign="'signUp'" ref="signUpModal"/>
      <MsgInfoModal ref="msgInfoModal"/>
    </div>
  </a-layout>
</template>

<script>
import {columns, MSGS_TYPE} from "./source";
import ProjectModal from '@/components/modal/project-modal';
import MsgInfoModal from './msgsInfo-modal';
import AttestationOmission from '@/components/authentication-omission';
import {clearProto} from "@/plugin/tools";

const areaOptions = [
  {label: '全部', value: '7000'},
  {label: '浙江', value: '7001'},
  {label: '四川', value: '7002'},
  {label: '广东', value: '7003'},
  {label: '福建', value: '7004'},
  {label: '山东', value: '7005'},
  {label: '江苏', value: '7006'},
  {label: '河北', value: '7007'},
  {label: '陕西', value: '7008'},
  {label: '山西', value: '7009'},
  {label: '辽宁', value: '7010'},
  {label: '吉林', value: '7011'},
  {label: '黑龙江', value: '7012'},
  {label: '安徽', value: '7013'},
  {label: '河南', value: '7014'},
  {label: '湖北', value: '7015'},
  {label: '湖南', value: '7016'},
  {label: '海南', value: '7017'},
  {label: '贵州', value: '7018'},
  {label: '云南', value: '7019'},
  {label: '甘肃', value: '7020'},
  {label: '青海', value: '7021'},
  {label: '江西', value: '7022'},
  {label: '台湾', value: '7023'},
  {label: '内蒙古自治区', value: '7024'},
  {label: '广西壮族自治区', value: '7025'},
  {label: '西藏自治区', value: '7026'},
  {label: '宁夏回族自治区', value: '7027'},
  {label: '新疆维吾尔自治区', value: '7028'},
  {label: '香港特别行政区', value: '7029'},
  {label: '澳门特别行政区', value: '7030'},
];
const typeOptions = [
  {label: '全部', value: 0},
  {label: '住宅', value: 1},
  {label: '商业用房', value: 2},
  {label: '工业厂房', value: 3},
  {label: '土地', value: 4},
  {label: '机械设备', value: 5},
  {label: '在建工程', value: 6},
  {label: '股权', value: 7},
  {label: '林权', value: 8},
  {label: '矿权', value: 9},
  {label: '船舶', value: 10},
  {label: '其他', value: 11},
];
const gradeOptions = [
  {label: '1000w以下', value: 0},
  {label: '1000w-5000w', value: 1},
  {label: '5000w-10000w', value: 2},
  {label: '10000w以上', value: 3},
];
export default {
  name: 'InvestmentCenter',
  nameComment: '服务项目招商中心',
  data() {
    return {
      columns,
      areaOptions,
      typeOptions,
      gradeOptions,
      MSGS_TYPE, //抵质押物类型
      isAttestationOmission: 0,
      total: 156,
      viewModalVisible: false, //查看抵质押物清单弹窗
      queryParams: {
        area: '7000',
        type: 0,
        grade: 0,
      },
      amcProjectInfo: [
        {
          key: 1,
          number: 1,//序号
          name: '浙江混天绫实业有限公司', //债务人名称
          money1: 14321.123123, //债权本金
          money2: 1435, //债权利息
          guaranty: '抵押+担保', //担保方式
          type: [1, 2, 3], //抵质押物类型
          area: ['广东省湛江市', '浙江省金华市义乌市'],//抵质押物分布区域
          endDate: '2023-11-02', //失效日期
          signUpStatus: 0, //是否报名
          guarantorsList: ['上海市奉贤区南奉公路999弄370号1层，张艰苦，李奋斗'],
          msgsInfoList: ['贵州省遵义市播州区鸭溪镇黎明路溪城鸣苑2栋1层1-11号商业用房', '惠州大亚湾霞涌霞光西路3号海韵雅苑2栋24层03号房屋']
        },
        {
          key: 2,
          number: 2,
          name: '北京天地无极科技有限公司',
          money1: 41.123123,
          money2: 54,
          guaranty: '抵押+担保',
          type: [4, 5, 6],
          area: ['浙江省金华市义乌市', '广东省湛江市'],
          endDate: '2036-11-02',
          signUpStatus: 1,
          guarantorsList: ['浙江天策生态科技有限公司，张三，李四'],
          msgsInfoList: ['兴业银行杭州分行关于玉环县雅迪水暖器材有限不良债权转让公告', '惠州大亚湾霞涌霞光西路3号海韵雅苑2栋24层03号房屋']
        },
      ],
      projectInfo: {},//竞标报名弹窗中-项目信息
      msgInfo: {},//查看抵押物清单
    };
  },
  components: {
    ProjectModal,
    MsgInfoModal,
    AttestationOmission,
  },
  methods: {
    handleAuction(params, sign) {
      if (sign === 'signUp') {
        this.projectInfo = clearProto(params);
        this.$refs.signUpModal.handleOpenModal();
      } else {
        this.msgInfo = clearProto(params);
        this.$refs.msgInfoModal.handleOpenModal();
      }
    },
    onChange() {
      console.log(clearProto(this.queryParams));
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
      border-radius: 0;
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
