<template>
  <div class="order-details">
      <div class="addres-info">
        <div class="icon"><van-image :src="require('@/assets/images/location.png')"/></div>
        <div class="addres">
            <p>{{ addresInfo.address_city + addresInfo.address_detail }}</p>
            <p>
                <span class="name">{{ addresInfo.name }}</span>
                <span class="phone">{{ addresInfo.mobile }}</span>
            </p>
        </div>
      </div>
      <div class="status">
          <div class="status-1" v-if="orderInfo.order.status == 1"><b>等待买家确认</b>您的订单将于<van-count-down :time="time" format="mm 分 ss 秒" />后进入冻结状态</div>
          <div class="status-3" v-else-if="orderInfo.order.status == 3 || orderInfo.order.status == 2"><b>订单已完成</b></div>
          <div class="status-4" v-else-if="orderInfo.order.status == 4"><b>订单已冻结</b></div>
      </div>
      <div class="shop-info">
          <div class="business">
              <van-image :src="require('@/assets/images/tb.png')" />
              <span>淘宝商家旗舰店</span>
          </div>
          <div class="shop">
              <van-image :src="orderInfo.goods.goods_pic"/>
              <div class="info">
                  <p class="tl">{{ orderInfo.goods.goods_name }}</p>
                  <p class="money-num">
                      <span>￥{{ orderInfo.goods.goods_price }}</span>
                      <span>x1</span>
                  </p>
                  <p class="tip">官方担保</p>
              </div>
          </div>
      </div>
      <div class="price">
        <p>
          <span>商品总额</span>
          <span>{{ orderInfo.goods.goods_price }}</span>
        </p>
        <p>
          <span>预计返佣</span>
          <span class="res-money">{{ parseFloat(orderInfo.goods.goods_price) + parseFloat(orderInfo.order.yj_money) }}</span>
        </p>
      </div>
      <van-submit-bar :price="parseFloat(orderInfo.goods.goods_price)*100" button-text="提交订单" v-if="orderInfo.order.status == 1" @submit="finishOrder" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      addresInfo: {
        address_city: "",
        address_detail: "",
        name: "",
        mobile: "",
      },
      time: 120000,
      orderInfo: {
          goods: {
              goods_price: ""
          },
          order: {
              status: 0
          }
      }
    }
  },
  created() {
      this.getAddress();
      this.getOrder();
  },
  methods: {
    getAddress() {
      this.$toast.loading({
        message: '加载中...',
        duration: 0,
        forbidClick: true,
      });
      this.$http.get(`Wap/Api/getAddress?userid=${this.$store.state.userId}`).then(response => {
        if (response.body.status) {
          this.addresInfo = response.body.data;
          this.$toast.clear();
        }
      }, response => {
        this.$toast.clear();
        this.$toast("获取失败");
      })
    },
    getOrder() {
      this.$toast.loading({
        message: '加载中...',
        duration: 0,
        forbidClick: true,
      });
      this.$http.get(`Wap/Api/getOrder?order_id=${this.$route.query.id}`).then(response => {
        if (response.body.status) {
          response.body.data.goods.goods_pic = this.resourceSrc + response.body.data.goods.goods_pic; 
          this.orderInfo = response.body.data;
          this.$toast.clear();
        }
      }, response => {
        this.$toast.clear();
        this.$toast("获取失败");
      })
    },
    finishOrder() {
      this.$toast.loading({
        message: '加载中...',
        duration: 0,
        forbidClick: true,
      });
      this.$http.post('Wap/Api/finishOrder', {
        orderid: this.$route.query.id,
        address_id: 3
      }).then(response => {
        this.$toast(response.body.info);
        if (response.body.status) {
          this.$router.push({ path: '/graborder'});
        }
        this.$toast.clear();
      }, response => {
        this.$toast('获取失败！');
        this.$toast.clear();
      });
    }
  },
};
</script>
<style lang="less">
    .order-details {
        .addres-info {
            display: flex;
            align-items: center;
            padding: 15px;
            border-radius: 15px;
            border-bottom: 2px dashed #8c64fe;
            background-color: #fff;
            .icon {
                box-sizing: border-box;
                width: 30px;
                height: 30px;
                margin-right: 10px;
                padding: 5px;
                border-radius: 50%;
                background-color: #8c64fe;
            }
            .addres {
                flex: 1;
                p {
                    margin: 5px 0;
                    &:last-child {
                        font-size: 14px;
                    }
                    .name {
                        margin-right: 10px;
                    }
                }
            }
        }
        .status {
            margin: 10px 0;
            padding: 15px;
            font-size: 14px;
            background-color: #fbf8d9;
            div {
                color: #666;
            }
            b {
                color: #000;
                margin-right: 5px;
            }
            .status-1 {
                display: flex;
                align-items: center;
            }
        }
        .shop-info {
            padding: 15px;
            border-radius: 10px;
            font-size: 14px;
            background-color: #fff;
            .business {
                display: flex;
                align-items: center;
                margin-bottom: 10px;
                .van-image {
                    width: 20px;
                    height: 20px;
                    margin-right: 10px;
                    border-radius: 50%;
                    overflow: hidden;
                }
            }
            .shop {
                display: flex;
                .van-image {
                    width: 90px;
                    height: 90px;
                    margin-right: 10px;
                    border-radius: 10px;
                    overflow: hidden;
                }
                .info {
                    flex: 1;
                    p {
                        margin: 5px 0;
                    }
                    .tl {
                        margin-top: 0;
                    }
                    .money-num {
                        display: flex;
                        justify-content: space-between;
                    }
                    .tip {
                        display: inline-block;
                        padding: 3px 10px;
                        margin-top: 0;
                        border-radius: 5px;
                        color: #fff;
                        background-color: #4caf50;
                    }
                }
            }
        }
        .price {
            padding: 15px;
            margin: 10px 0;
            border-radius: 10px;
            font-size: 14px;
            background-color: #fff;
            p {
                display: flex;
                justify-content: space-between;
                margin: 5px 0;
                span {
                    color: #999;
                }
                .res-money {
                    font-weight: bold;
                    color: #7755d8;
                }
            }
        }
        .van-submit-bar__button {
            height: 35px;
            line-height: 35px;
        }
        .van-submit-bar__text {
            text-align: left;
        }
    }
</style>
