<template>
    <div class="recording">
    <van-tabs v-model="active" type="card" animated background="transparent" title-inactive-color="#555" swipeable @change="getOrder(active)">
        <van-tab v-for="(item, index) in tabsList" :title="item" :key="index">
            <van-pull-refresh
            v-model="isLoading"
            success-text="刷新成功"
            disabled
            @refresh="onRefresh"
            >
            <div class="content">
                <div class="list" v-for="value in orderList" :key="value.id">
                    <p class="time">{{ value.add_time | dateFormat }}</p>
                    <div class="con">
                        <van-image :src="resourceSrc + value.goods_pic">
                            <template v-slot:loading>
                                <van-loading type="spinner" size="20" />
                            </template>
                        </van-image>
                        <div class="info">
                            <p class="order-num">订单号：{{ value.order_sn }}</p>
                            <p class="money">金额：￥{{ value.goods_price }}</p> 
                        </div>
                        <div class="oper" v-if="active == 0 || active == 1">
                            <van-button type="primary" round size="mini" v-show="active == 0">立即提交</van-button>
                            <van-button type="primary" round size="mini" disabled v-show="active == 1">已返{{ value.yj_money }}</van-button>
                        </div>
                    </div>
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
        tabsList: ["待处理", "已完成", "冻结中"],
        isLoading: false,
        orderList: []
    };
  },
  created() {
      this.getOrder(this.active);
  },
  methods: {
    onRefresh() {
        this.isLoading = false;
        this.getOrder(this.active);
    },
    getOrder(type) {
      this.$toast.loading({
        message: '加载中...',
        duration: 0,
        forbidClick: true,
      });
      let typeNum = 1;
      type == 0 ? typeNum = 1 : type == 1 ? typeNum = 3 : type == 2 ? typeNum = 4 : '';
      this.$http.get(`Wap/Api/getOrderList?type=${typeNum}&userid=${this.$store.state.userId}`).then(response => {
        if (response.body.status) {
          this.orderList = response.body.data;
          this.$toast.clear();
          console.log(response.body.data)
        }
      }, response => {
        this.$toast.clear();
        this.$toast("获取失败");
      })
    }
  }
};
</script>
<style lang="less">
.recording {
    height: 100%;
    .van-tabs {
        height: 100%;
    }
    .van-tabs__wrap {
        margin: 10px 0;
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
    .content {
        width: 92%;
        margin: 0 auto;
        .list {
            margin-bottom: 10px;
            padding: 10px;
            background-color: #fff;
            .time {
                margin-top: 5px;
                font-size: 12px;
                color: #777;
            }
            .con {
                display: flex;
                align-items: center;
                .van-image {
                    width: 50px;
                    height: 50px;
                    margin-right: 5px;
                    border-radius: 5px;
                }
                .info {
                    flex: 1;
                    p {
                        margin: 5px 0;
                    }
                    .order-num {
                        color: #000;
                        font-size: 14px;
                    }
                    .money {
                        font-size: 12px;
                        color: #777;
                    }
                }
                .oper {
                    .van-button {
                        padding: 0 10px;
                    }
                }
            }
        }
    }
}
</style>
