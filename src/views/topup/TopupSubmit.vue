<template>
  <div class="topup-submit">
      <p class="topup-money">请您用刚刚填写姓名的支付宝转<span>{{ $route.query.money }}</span>元到以下账户！</p>
      <div class="payee-info">
          <p class="tl">收款人信息</p>
          <div class="info">
              <p>
                  <span>银行卡号</span>
                  <span>{{ bankInfo.bank_no }}</span>
                  <span class="copy-bank" :data-clipboard-text="bankInfo.bank_no" @click="copy('copy-bank')">复制</span>
              </p>
              <p>
                  <span>开户姓名</span>
                  <span>{{ bankInfo.bank_user_name }}</span>
                  <span class="copy-name" :data-clipboard-text="bankInfo.bank_user_name" @click="copy('copy-name')">复制</span>
              </p>
              <p>
                  <span>开户银行</span>
                  <span>{{ bankInfo.bank_name }}</span>
                  <span class="copy-addres" :data-clipboard-text="bankInfo.bank_name" @click="copy('copy-addres')">复制</span>
              </p>
          </div>
      </div>
      <p class="tip">转账完成后，请务必先提交转账截图再点击提交按钮！</p>
      <div class="upload">
          <p class="tip-info">
              <span>上传转账截图</span>
              <span>{{ cur }}/1</span>
          </p>
          <van-uploader v-model="fileList" accept="image/*" :max-count="1" :after-read="afterRead" @delete="updateCur"/>
      </div>
      <van-button color="#8b64fe" block @click="confirm">确认充值</van-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
        bankInfo: {},
        fileList: [],
        cur: 0,
        fileInfo: {},
        submitInfo: {}
    };
  },
  created() {
      this.getPlatAccount();
  },
  methods: {
      getPlatAccount() {
        this.$toast.loading({
            message: '加载中...',
            duration: 0,
            forbidClick: true,
        });
        this.$http.get("Wap/Api/getPlatAccount").then(response => {
            if (response.body.status) {
            this.bankInfo = response.body.data;
            this.$toast.clear();
            }
        }, response => {
            this.$toast("获取失败");
            this.$toast.clear();
        })
      },
      afterRead(file) {
          this.fileInfo = file;
          this.cur = 1;
      },
      updateCur() {
          this.cur = 0;
      },
      confirm() {
          if (this.cur) {
            this.$toast.loading({
                message: '加载中...',
                duration: 0,
                forbidClick: true,
            });
            this.$http.post('Wap/Api/upload',{ pic: "" }).then( response => {
                if (response.body.status) {
                    this.submitInfo = response.body.data;
                }
                this.$toast.clear();
                this.$toast(response.body.info);
            }, response => {
                this.$toast("获取失败");
                this.$toast.clear();
            })
          }else {
            this.$toast("请先上传转账凭证");
          }
      }
  },
};
</script>
<style lang="less">
    .topup-submit {
        width: 92%;
        margin: 0 auto;
        .topup-money {
            padding: 10px;
            margin-bottom: 5px;
            border-radius: 5px;
            font-size: 15px;
            font-weight: bold;
            background-color: #fff;
            span {
                color: #e54d42;
            }
        }
        .payee-info {
            .tl {
                font-size: 14px;
                color: #999;
            }
            .info {
                padding: 5px 10px;
                border-radius: 5px;
                box-shadow: 0 0 10px #8b64fe;
                background-color: #fff;
                p {
                    display: flex;
                    margin: 5px 0;
                    padding: 10px 0;
                    font-size: 15px;
                    border-bottom: 1px solid #eee;
                    &:last-child {
                        border-bottom: 0;
                    }
                    span {
                        &:first-child {
                            margin-right: 15px;
                            color: #999;
                        }
                        &:nth-child(2) {
                            flex: 1
                        }
                        &:last-child {
                            color: #8b64fe;
                        }
                    }
                }
            }
        }
        .tip {
            padding: 10px;
            border-radius: 5px;
            font-size: 15px;
            font-weight: bold;
            color: #e54d42;
            background-color: #fff;
        }
        .upload {
            padding: 0 10px;
            margin-bottom: 30px;
            border-radius: 5px;
            background-color: #fff;
            .tip-info {
                display: flex;
                justify-content: space-between;
                margin: 0;
                padding: 10px 0;
                color: #999;
            }
        }
    }
</style>
