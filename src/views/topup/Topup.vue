<template>
  <div class="topup">
        <van-tabs v-model="active" line-height="1px" line-width="33.3%" color="#8b64fe">
            <van-tab v-for="(item, index) in tab" :title="item" :key="index">
                <div class="content">
                    <div class="balance">
                        <span>当前余额：</span>
                        <span>{{ balance }} 元</span>
                    </div>
                    <div class="input-balance">
                        <b class="title">输入金额（元）</b>
                        <van-field
                            readonly
                            clickable
                            :value="money"
                            @touchstart.native.stop="show = true"
                        />
                        <van-number-keyboard
                            v-model="money"
                            theme="custom"
                            :show="show"
                            extra-key="."
                            close-button-text="完成"
                            @blur="show = false"
                        />
                        <p class="tip">*充值金额范围 100 ~ 10000</p>
                        <b class="title">快捷金额</b>
                        <div class="fast-amount">
                            <span :class="fastAmountAct == index ? 'active' : ''" v-for="(value, index) in fastAmount" :key="index" @click="fastAmountAct = index; money = value.toString()">{{ value }}</span>
                        </div>
                        <p class="notice">温馨提示：平台银行帐号随时更换，每次存款请到充值页面获取最新帐号，如入款至已过期帐号，平台无法查收，恕不负责！</p>
                        <van-button color="#8b64fe" block @click="topupFun">确认充值</van-button>
                    </div>
                </div>
            </van-tab>
        </van-tabs>
  </div>
</template>
<script>
export default {
  data() {
    return {
        active: 0,
        tab: ["网银转卡", "支付宝转卡", "微信转卡"],
        show: false,
        balance: 0,
        money: '100',
        fastAmount: [100, 500, 1000, 2000, 5000, 10000],
        fastAmountAct: 0
    };
  },
  created() {
      this.$http.get(`getUserInfo?userid=${this.$store.state.userId}`).then(response => {
        if (response.body.status) {
          this.balance = response.body.data.money;
        }
      }, response => {
        this.$toast("获取失败");
      })
  },
  methods: {
      topupFun() {

      }
  },
};
</script>
<style lang="less">
    .topup {
        .content {
            padding: 0 15px;
            .balance {
                display: flex;
                justify-content: space-between;
                padding: 10px;
                margin: 15px 0;
                font-size: 14px;
                border-radius: 5px;
                background-color: #8b64fe;
                span {
                    color: #fff;
                }
            }
            .input-balance {
                padding: 10px;
                border-radius: 10px;
                background-color: #fff;
                .van-cell--clickable {
                    &:active {
                        background-color: #fff;
                    }
                }
                .van-cell {
                    padding: 0 0 5px;
                    margin-top: 10px;
                    &:not(:last-child)::after {
                        left: 0;
                    }
                }
                .tip {
                    margin: 5px 0 10px;
                    font-size: 12px;
                    color: #8b64fe;
                }
                .fast-amount {
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: space-between;
                    align-content: space-between;
                    padding-bottom: 10px;
                    margin-top: 5px;
                    font-size: 14px;
                    border-bottom: 1px solid #ebedf0;
                    span {
                        width: calc((100% - 30px) / 3);
                        padding: 5px 0;
                        margin: 6px 0;
                        border-radius: 5px;
                        text-align: center;
                        background-color: #eee;
                    }
                    .active {
                        color: #fff;
                        background-color: #8b64fe;
                    }
                }
                .notice {
                    font-size: 14px;
                    color: #666;
                }
                .van-button {
                    margin-top: 30px;
                }
            }
        }
    }
</style>
