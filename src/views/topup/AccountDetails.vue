<template>
  <div class="account-details">
    <van-tabs v-model="active" type="card" animated background="transparent" title-inactive-color="#555" swipeable @change="myWallet">
        <van-tab v-for="(item, index) in tabsList" :title="item" :key="index">
            <van-pull-refresh
            v-model="isLoading"
            success-text="刷新成功"
            @refresh="onRefresh"
            >
            <div class="content">
                <div class="type" v-if="active != 0">
                    <p v-for="(value, index) in detailsList" :key="index">
                        <span>{{ value.add_time | dateFormat }}</span>
                        <span class="money">+{{ active == 1 ? value.money : active == 2 ? value.price : active == 3 ? value.goods_price : active == 4 ? value.count : '' }}</span>
                        <span v-if="active == 1">{{ value.status == 1 ? '待审核' : value.status == 2 ? '充值成功' : '充值失败' }}</span>
                        <span v-else-if="active == 2">{{ value.status == 1 ? '待审核' : value.status == 2 ? '提现成功' : '提现失败' }}</span>
                        <span v-else-if="active == 3">{{ value.status == 1 ? '待处理' : value.status == 3 ? '已完成' : value.status == 4 ? '冻结中' : '' }}</span>
                        <span v-else-if="active == 4">任务返佣</span>
                    </p>
                </div>
                <div class="type" v-else>
                    <p v-for="(value, index) in allDetailsList.recharge" :key="'recharge' + index">
                        <span>{{ value.add_time | dateFormat }}</span>
                        <span class="money">+{{ value.money }}</span>
                        <span>{{ value.status == 1 ? '待审核' : value.status == 2 ? '充值成功' : '充值失败' }}</span>
                    </p>
                    <p v-for="(value, index) in allDetailsList.withdraw" :key="'withdraw' + index">
                        <span>{{ value.add_time | dateFormat }}</span>
                        <span class="money">+{{ value.price }}</span>
                        <span>{{ value.status == 1 ? '待审核' : value.status == 2 ? '提现成功' : '提现失败' }}</span>
                    </p>
                    <p v-for="(value, index) in allDetailsList.order" :key="'order' + index">
                        <span>{{ value.add_time | dateFormat }}</span>
                        <span class="money">+{{ value.goods_price }}</span>
                        <span>{{ value.status == 1 ? '待处理' : value.status == 3 ? '已完成' : value.status == 4 ? '冻结中' : '' }}</span>
                    </p>
                    <p v-for="(value, index) in allDetailsList.sy" :key="'sy' + index">
                        <span>{{ value.add_time | dateFormat }}</span>
                        <span class="money">+{{ value.count }}</span>
                        <span>任务返佣</span>
                    </p>
                </div>
            </div>
            </van-pull-refresh>
        </van-tab>
    </van-tabs>
  </div>
</template>
<script>
export default {
  data() {
    return {
        active: 0,
        tabsList: ["全部", "充值", "提现", "抢单", "返佣"],
        isLoading: false,
        allDetailsList: {},
        detailsList: []
    };
  },
  created() {
      this.myWallet();
  },
  methods: {
      myWallet() {
        this.detailsList = [];
        this.$toast.loading({
            message: '加载中...',
            duration: 0,
            forbidClick: true,
        });
        this.$http.get(`Wap/Api/myWallet?type=${this.active}&userid=${this.$store.state.userId}`).then(response => {
            if (response.body.status) {
                if (this.active) {
                    var arr = [];
                    this.detailsList = arr.concat(response.body.data.order, response.body.data.recharge, response.body.data.sy, response.body.data.withdraw);
                }else {
                    this.allDetailsList = response.body.data;
                }
                this.$toast.clear();
            }
        }, response => {
            this.$toast("获取失败！");
            this.$toast.clear();
        });
      },
      onRefresh() {
          this.isLoading = false;
          this.myWallet();
      }
  },
};
</script>
<style lang="less">
    .account-details {
        min-height: 100%;
        background-color: #fff;
        .van-tabs {
            height: 100%;
        }
        .van-tabs__wrap {
            padding: 10px 0;
        }
        .van-tab,
        .van-tabs__nav--card {
            border: 0;
        }
        .van-tabs__nav--card {
            .van-tab--active {
            font-weight: bold;
            border-radius: 20px;
            background-color: #836afe;
            }
        }
        .van-tabs__wrap--scrollable .van-tab {
            flex: 0;
        }
        .content {
            padding: 0 15px;
            .type {
                font-size: 14px;
                p {
                    display: flex;
                    justify-content: space-between;
                    .money {
                        color: #f80;
                    }
                }
            }
        }
    }
</style>
