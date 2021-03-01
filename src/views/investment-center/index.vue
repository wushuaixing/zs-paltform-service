<template>
  <a-layout style="padding: 76px 0 30px;">
    <div class="investment-center-wrapper">
      <div class="header">
        <img :src="img.logo" alt="">
        <span>浙商资产服务项目招商</span>
      </div>
      <div v-if="isAttestationOmission === 'success'">
        <div class="query-wrapper">
          <div class="content">
            <div v-for="(item,index) in queryOptions" :key="item.code" :class="`${item.code} part`">
              <div class="label">{{ item.label }}</div>
              <a-radio-group v-model="queryParams[item.code]" @change="handleSearch" button-style="solid">
                <a-radio-button v-for="childItem in (item.isCollapsed?item.list:item.list.slice(0,item.sliceKey))"
                                :value="childItem.value" :key="childItem.value">
                  {{ childItem.label }}
                </a-radio-button>
              </a-radio-group>
              <div class="collapse" v-if="item.code!=='priceType'">
                <span v-if="item.isCollapsed" @click="handleCollapse('up',index)">收起<a-icon type="up"
                                                                                            :style="{ fontSize: '12px', color: '#666' }"/></span>
                <span v-else @click="handleCollapse('down',index)">更多<a-icon type="down"
                                                                             :style="{ fontSize: '12px', color: '#666' }"/></span>
              </div>
            </div>
          </div>
        </div>
        <div class="table-wrapper">
          <div class="total-tips">
            *当前条件下共有 {{ pagination.total }} 条正在招商的项目
          </div>
          <a-table :columns="columns" :data-source="amcProjectInfo" :row-key="record => record.id"
                   :pagination="pagination" @change="handleTabChange" :loading="loading">
            <template slot="debtor" slot-scope="debtor">
              <a-tooltip>
                <template slot="title" v-if="textSize(debtor)>180">
                  {{ debtor }}
                </template>
                <div class="debtor-name">
                  {{ debtor || '-' }}
                </div>
              </a-tooltip>
            </template>
            <template slot="amount" slot-scope="amount">{{ amount|amountTh }}</template>
            <template slot="security" slot-scope="{security}">{{ SECURITY_TYPE[security] || '' }}</template>
            <template slot="collateralType" slot-scope="{amcProjectCollaterals}">
              <div v-if="amcProjectCollaterals&&amcProjectCollaterals.length" class="collateral-type">
                 <span v-for="item in amcProjectCollaterals" :key="item.id"
                       :class="handleTypeColor(item.collateralType)">{{ item.collateralType| collateralType }}</span>
              </div>
              <span v-else>-</span>
            </template>
            <template slot="area" slot-scope="{amcProjectCollaterals}">
              <template v-if="amcProjectCollaterals&&amcProjectCollaterals.length">
                <p v-for="(item,index) in uniqueArea(amcProjectCollaterals)" :key="index">{{ item || '-' }}</p>
              </template>
              <span v-else>-</span>
            </template>
            <template slot="auction" slot-scope="item">
              <a-button type="link" size="small" @click="handleAuction(item,'view')">查看抵押物清单</a-button>
              <a-divider type="vertical" style="margin:0"/>
              <a-button type="link" size="small" v-if="!parseInt(item.isSign)" @click="handleAuction(item,'signUp')">
                竞标报名
              </a-button>
              <a-button type="link" size="small" v-else disabled>已报名</a-button>
            </template>
          </a-table>
        </div>
      </div>
      <AttestationOmission v-else :attestation="isAttestationOmission==='qualifie'?'资质认证':'要素认证'"/>
      <ProjectModal :projectInfo="projectInfo" :sign="'signUp'" ref="signUpModal"
                    @handleSignUp="getTableList"/>
      <MsgInfoModal ref="msgInfoModal" :msgInfo="projectInfo"/>
    </div>
  </a-layout>
</template>

<script>
import {columns, SECURITY_TYPE, SORTER_TYPE, queryOptions} from "./source";
import ProjectModal from '@/components/modal/project-modal';
import MsgInfoModal from './msgsInfo-modal';
import AttestationOmission from '@/components/authentication-omission';
import {clearProto, removeObjectNullVal, getArea} from "@/plugin/tools";
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
      loading: false,
      SECURITY_TYPE, //担保方式
      SORTER_TYPE, //排序方式
      queryOptions, //搜索条件
      isAttestationOmission: 0, //是否完成资质认证或要素认证
      viewModalVisible: false, //查看抵质押物清单弹窗
      pagination: {
        current: 1,
        total: 1,
        showQuickJumper: true,
        showLessItems: true,
        size: 'middle',
        showTotal: val => `共${val}条信息`,
      },
      queryParams: { //入参
        page: 1,
        size: 10,
        provinceCode: '',
        type: '',
        priceType: '',
      },
      amcProjectInfo: [], //项目信息
      projectInfo: {}, //弹窗信息
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
  mounted() {
    const {isCertification, isConfirmElements} = this.$store.getters.getInfo;
    if (isCertification && isConfirmElements) {
      this.isAttestationOmission = 'success';
    } else if (isCertification) {
      this.isAttestationOmission = 'factor';
    } else {
      this.isAttestationOmission = 'qualifie';
    }
  },
  methods: {
    getTableList() {
      this.loading = true;
      amcProjectListApi(removeObjectNullVal(this.queryParams)).then((res) => {
        if (res.code === 20000) {
          const data = res.data;
          this.pagination.total = data.total;
          this.amcProjectInfo = data.list;
        } else {
          message.warning(res.message);
        }
      }).finally(() => this.loading = false);
    },

    //搜索条件切换
    handleSearch() {
      this.queryParams = {
        ...this.queryParams,
        page: 1,
      };
      this.pagination.current = 1;
      this.getTableList();
    },
    //查看抵押物信息 竞标报名弹窗
    handleAuction(params, sign) {
      this.projectInfo = clearProto(params);
      if (sign === 'signUp') {
        this.$refs.signUpModal.handleOpenModal();
      } else {
        this.$refs.msgInfoModal.handleOpenModal();
      }
    },

    //换页 排序
    handleTabChange(pagination) {
      this.queryParams = {
        ...this.queryParams,
        page: pagination.current,
      }
      this.pagination.current = pagination.current;
      this.getTableList();
    },

    handleTypeColor(val) {
      return queryOptions[1].list.find(i => val === i.value).color;
    },


    /**
     * 搜索条件 展开收起
     * @param flag down：展开 up：收起
     * @param index 0地域  1类型
     */
    handleCollapse(flag, index) {
      this.queryOptions[index].isCollapsed = flag === 'down';
    },
    textSize(text) {
      let span = document.createElement("span");
      let result = {};
      result.width = span.offsetWidth;
      result.height = span.offsetHeight;
      span.style.visibility = "hidden";
      span.style.fontSize = 14;
      span.style.fontFamily =
          'Avenir, Helvetica,Arial SC,sans-serif';
      span.style.display = "inline-block";
      document.body.appendChild(span);
      if (typeof span.textContent !== "undefined") {
        span.textContent = text;
      } else {
        span.innerText = text;
      }
      let textWidth =
          parseFloat(window.getComputedStyle(span).width) - result.width;
      span.parentNode.removeChild(span); //删除节点
      return textWidth;
    },
    uniqueArea(arr = []) {
      return Array.from(new Set(arr.map((i) => getArea(i.provinceCode, i.cityCode, i.areaCode))));
    }
  },
  filters: {
    //抵质押物类型
    collateralType: (val) => {
      if (!val) return "-";
      return queryOptions[1].list.find(i => val === i.value).label;
    }
  }
}
</script>

<style lang='scss'>
.investment-center-wrapper {
  flex: 1;
  background: #ffffff;
  width: 1200px;
  margin: 0 auto;

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
      padding: 12px 24px 0 16px;
      border-bottom: 1px solid #E9E9E9;

      &:last-child {
        border: none;
      }

      .label {
        min-width: 116px;
        color: #333;
      }

      .collapse {
        min-width: 44px;
        text-align: right;
        margin-left: auto;
        color: #666;
        cursor: pointer;
      }

      .ant-radio-button-wrapper {
        border: none;
        box-shadow: none;
        height: 24px;
        line-height: 24px;
        border-radius: 2px;
        transition: none;
        margin-bottom: 12px;
        font-size: 14px;
        padding: 0;
        text-align: center;
      }
    }

    .provinceCode {
      .ant-radio-button-wrapper {
        width: 88px;
        margin-right: 4px;

        &:first-child {
          height: 24px;
        }
      }
    }

    .type {
      .ant-radio-button-wrapper {
        width: 88px;
        margin-right: 16px;
      }
    }

    .priceType {
      .ant-radio-button-wrapper {
        width: auto;
        min-width: 88px;
        margin-right: 30px;
      }
    }

    .ant-radio-button-wrapper::before {
      content: none;
    }
  }

  .table-wrapper {
    padding: 0 24px;

    .ant-table-body {
      tr {
        th {
          padding: 15px 8px;
        }

        td {
          padding: 15px 8px;
        }
      }
      .debtCaptial{
        padding-right:20px !important;
      }
    }

    .collateral-type {
      span {
        padding: 0 8px;
        height: 20px;
        line-height: 20px;
        font-size: 12px;
        display: inline-block;
        text-align: center;
        border-radius: 2px;
        margin: 0 8px 4px 0;
      }
    }

    .orange {
      color: #FA541C;
      background-color: #FFF2E8;
      border: 1px solid #FFBB96;
    }

    .violet {
      color: #AD99F9;
      background-color: #F0ECFF;
      border: 1px solid #AD99F9;
    }

    .cyan {
      color: #6BDECD;
      background: #ECFFFE;
      border: 1px solid #6BDECD;
    }

    .blue {
      color: #5A79DE;
      background: rgba(231, 247, 255, 0.58);
      border: 1px solid #5A79DE;
    }

    .total-tips {
      font-size: 14px;
      padding-bottom: 16px;
      line-height: 14px;
      color: #8C8C8C;
    }

    .debtor-name {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      width: 180px;
    }

    p {
      margin-bottom: 0;
    }
  }
}

.spin-wrapper {
  width: 100%;
  padding-top: 10vh !important;
}
</style>




