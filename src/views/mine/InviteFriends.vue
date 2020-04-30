<template>
  <div class="invite-friends">
      <div class="tip">
          <p>邀请好友，一起赚</p>
          <p>一台手机就能兼职</p>
      </div>
      <div class="code">邀请码：{{ shareCode.yqm }}</div>
      <van-image :src="shareCode.qrcode"/>
      <van-button color="#8b64fe" class="copy-text" :data-clipboard-text="shareCode.url" block @click="copy('copy-text')">点击复制链接</van-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      shareCode: {}
    }
  },
  created() {
      this.getShareQRCode();
  },
  methods: {
    getShareQRCode() {
      this.$toast.loading({
        message: '加载中...',
        duration: 0,
        forbidClick: true,
      });
      this.$http.get(`Wap/Api/getShareQRCode?userid=${this.$store.state.userId}`).then(response => {
        if (response.body.status) {
          this.shareCode = response.body.data;
          this.shareCode.yqm = JSON.parse(localStorage.getItem("userinfo")).yqm;
          this.$toast.clear();
        }
      }, response => {
        this.$toast.clear();
        this.$toast("获取失败");
      })
    }
  },
};
</script>
<style lang="less">
    .invite-friends {
        position: relative;
        width: 100%;
        height: 100%;
        background: url(../../assets/images/share.png) no-repeat;
        background-size: 100% 100%;
        .tip {
            padding-top: 10px;
            p {
                font-size: 14px;
                margin: 0;
                text-align: center;
                color: #fff;
            }
        }
        .code {
            position: absolute;
            top: 40.5%;
            width: 100%;
            text-align: center;
            color: #fff;
        }
        .van-image {
            position: absolute;
            top: 51%;
            left: 50%;
            transform: translateX(-50%);
            width: 200px;
        }
        .van-button {
            width: 90%;
            position: absolute;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
        }
    }
</style>
