<template>
  <div class="withdrawal-manage">
      <div class="money-info">
          <p class="balance">
              <span>当前可用余额</span>
              <span>{{ userInfo.money }}</span>
          </p>
          <p class="tip">提现费率：0.90 （单笔提现最低手续费：3元）</p>
      </div>
      <div class="bank-info">
            <div class="tl-box">
                <span class="tl">输入金额（元）</span>
                <span class="tip">*单笔提现最小100元</span>
                <van-button type="primary" size="mini" round @click="allWithdraw">全部提现</van-button>
            </div>
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
            <div class="user-bank-info">
                <p><span class="tl">手机号码</span><span>{{ userInfo.mobile }}</span></p>
                <p><span class="tl">银行卡号</span><span>{{ bankInfo.bank_no }}</span></p>
                <p><span class="tl">开户姓名</span><span>{{ bankInfo.bank_name }}</span></p>
                <p><span class="tl">开户银行</span><span>{{ bankInfo.bank_kaihu }}</span></p>
            </div>
            <div class="notice-tip">
                <p class="tl">温馨提示：</p>
                <ul>
                    <li>1.请准确填写银行账号相关信息，因信息错误导致的资金损失，我们将不承担任务责任；</li>
                    <li>2.到账时间次日24点以前，具体到账时间以银行为准。</li>
                </ul>
            </div>
            <van-button color="#8b64fe" block @click="withdraw">确认提现</van-button>
      </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      userInfo: {},
      bankInfo: {},
      money: "100",
      show: false,
      isBindBank: true
    }
  },
  created() {
      this.getUserInfo();
      this.getBankInfo();
  },
  updated() {
      this.showAlert();
  },
  methods: {
    getUserInfo() {
      this.$toast.loading({
        message: '加载中...',
        duration: 0,
        forbidClick: true,
      });
      this.$http.get(`Wap/Api/getUserInfo?userid=${this.$store.state.userId}`).then(response => {
        if (response.body.status) {
          this.userInfo = response.body.data;
          this.$toast.clear();
        }
      }, response => {
        this.$toast.clear();
        this.$toast("获取失败");
      })
    },
    getBankInfo() {
      this.$toast.loading({
        message: '加载中...',
        duration: 0,
        forbidClick: true,
      });
      this.$http.get(`Wap/Api/getBank?userid=${this.$store.state.userId}`).then(response => {
        if (response.body.status) {
          this.bankInfo = response.body.data;
          Object.keys(response.body.data).forEach( key => {
              if (response.body.data[key] == "" || response.body.data[key] == null ) this.isBindBank = false;
          })
          this.$toast.clear();
        }
      }, response => {
        this.$toast.clear();
        this.$toast("获取失败");
      })
    },
    allWithdraw() {
        this.money = this.userInfo.money.toString();
    },
    showAlert() {
        if (!this.isBindBank) {
            this.$dialog.confirm({
                title: '标题',
                message: '请先绑定银行看再进行提现！',
            }).then(() => {
                // on confirm
            }).catch(() => {
                // on cancel
            });
        }
    },
    withdraw() {

    }
  },
};
</script>
<style lang="less">
    .withdrawal-manage {
        width: 92%;
        margin: 0 auto;
        .money-info {
            margin-top: 10px;
            padding: 5px 15px;
            border-radius: 5px;
            background-color: #8b64fe;
            p {
                margin: 5px 0;
                font-size: 12px;
                color: #fff;
            }
            .balance {
                display: flex;
                justify-content: space-between;
                padding-bottom: 10px;
                border-bottom: 1px solid #fff;
                span {
                    &:first-child {
                        font-size: 14px;
                    }
                }
            }
            .tip {
                padding-top: 5px;
            }
        }
        .bank-info {
            padding: 15px;
            border-radius: 5px;
            background-color: #fff;
            .tl-box {
                display: flex;
                align-items: center;
                .tl {
                    margin-right: 10px;
                    font-size: 14px;
                    font-weight: bold;
                }
                .tip {
                    flex: 1;
                    font-size: 12px;
                    color: #805bfd;
                }
                .van-button {
                    padding: 0 5px;
                }
            }
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
            .user-bank-info {
                p {
                    margin: 5px 0 10px;
                    padding: 10px 0;
                    border-bottom: 1px solid #eee;
                    font-size: 14px;
                    span {
                        &:first-child {
                            margin-right: 10px;
                            color: #666;
                        }
                    }
                }
            }
            .notice-tip {
                font-size: 14px;
                padding-bottom: 20px;
                .tl {
                    margin-bottom: 5px;
                    font-weight: bold;
                }
                ul {
                    li {
                        color: #666;
                    }
                }
            }
        }
    }
</style>
