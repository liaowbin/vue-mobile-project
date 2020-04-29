<template>
  <div class="mine">
    <div class="mine-info">
      <van-image :src="require('@/assets/images/face.png')">
        <template v-slot:loading>
          <van-loading type="spinner" size="20" />
        </template>
      </van-image>
      <div class="info">
        <p>
          <span class="phone">{{userInfo.mobile  }}</span>
          <span class="grade">{{ userInfo.level_name }}</span>
        </p>
        <p class="code">邀请码：{{ userInfo.yqm }}</p>
      </div>
      <div class="copy">复制链接</div>
    </div>
    <div class="box">
      <div class="account-info">
        <div class="money">
          <b>账户余额</b>
          <b>{{ userInfo.money }}</b>
        </div>
        <div class="operation">
          <van-button color="#9681fd" size="small" round>提现</van-button>
          <van-button color="#7c61fd" size="small" round>充值</van-button>
        </div>
      </div>
      <div class="list-box">
        <van-grid :border="false" :column-num="4">
          <van-grid-item>
              <van-image :src="require('@/assets/images/balance.png')"/>
              <span>总收益</span>
              <b style="color: #816bfe">{{ userInfo.total_yj }}</b>
          </van-grid-item>
          <van-grid-item>
              <van-image :src="require('@/assets/images/interest.png')"/>
              <span>利息宝</span>
              <b style="color: #ffa829">{{ userInfo.interest_money }}</b>
          </van-grid-item>
          <van-grid-item>
              <van-image :src="require('@/assets/images/record.png')"/>
              <span>账户明细</span>
              <b style="color: #c01cff">-- --</b>
          </van-grid-item>
          <van-grid-item>
              <van-image :src="require('@/assets/images/frozen.png')"/>
              <span>冻结资金</span>
              <b style="color: #fa293a">{{ userInfo.forzen_money }}</b>
          </van-grid-item>
        </van-grid>
      </div>
      <div class="service-center">
        <div class="title">服务中心</div>
        <div class="service-list">
          <van-grid :border="false" :column-num="4">
            <van-grid-item v-for="(value, index) in serviceList" :key="index">
              <div class="icon-box" :style="{background: 'linear-gradient(' + value.color[0] + ',' + value.color[1] + ')'}">
                <van-image :src="value.iconUrl"/>
              </div>
              <span>{{ value.text }}</span>
            </van-grid-item>
          </van-grid>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      userInfo: {},
      serviceList: [
        {
          iconUrl: require('@/assets/images/user.png'),
          text: "个人资料",
          color: ["#eb645a", "#e75147"]
        },
        {
          iconUrl: require('@/assets/images/team.png'),
          text: "直属下线",
          color: ["#83b7f4", "#153ed7"]
        },
        {
          iconUrl: require('@/assets/images/invivate.png'),
          text: "邀请好友",
          color: ["#92deb7", "#4cbf8e"]
        },
        {
          iconUrl: require('@/assets/images/news.png'),
          text: "系统消息",
          color: ["#d576f7", "#8d38f4"]
        },
        {
          iconUrl: require('@/assets/images/address.png'),
          text: "地址管理",
          color: ["#8ddd8b", "#779b76"]
        },
        {
          iconUrl: require('@/assets/images/customer.png'),
          text: "客服中心",
          color: ["#f8d78b", "#f0a430"]
        },
        {
          iconUrl: require('@/assets/images/safe.png'),
          text: "安全管理",
          color: ["#6fbef8", "#388ff4"]
        },
        {
          iconUrl: require('@/assets/images/about.png'),
          text: "关于我们",
          color: ["#f0a35b", "#ea473b"]
        }
      ]
    };
  },
  created() {
    this.getUserInfo();
  },
  methods: {
    getUserInfo() {
      this.$http.get(`Wap/Api/getUserInfo?userid=${this.$store.state.userId}`).then(response => {
        if (response.body.status) {
            this.userInfo = response.body.data;
        }
      }, response => {
        this.$toast("获取失败！");
      });
    }
  },
};
</script>
<style lang="less">
  .mine {
    .mine-info {
      display: flex;
      align-items: center;
      padding: 15px 15px 35px;
      background: #8c64fe url(../../assets/images/mine-bg.png) no-repeat;
      .van-image {
        margin-right: 10px;
      }
      .info {
        flex: 1;
        p {
          margin: 5px 0;
          &:first-child {
            font-size: 12px;
            color: #fff;
          }
        }
        .phone {
          margin-right: 10px;
        }
        .grade {
          padding: 2px 10px;
          border-radius: 3px;
          background-color: #000;
        }
        .code {
          font-size: 14px;
          color: #fff;
        }
      }
      .copy {
        font-size: 12px;
        color: #fff;
        border-radius: 10px;
        border: 1px solid #fff;
        padding: 5px 15px;
      }
    }
    .box {
      width: 92%;
      margin: -20px auto 0;
      .account-info {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 15px;
        border-radius: 10px;
        background-color: #fff;
        .money {
          b {
            display: block;
            font-size: 14px;
            margin: 5px 0;
            &:last-child {
              color: red;
            }
          }
        }
        .operation {
          .van-button {
            margin: 0 5px;
          }
        }
      }
      .list-box {
        margin: 10px 0;
        border-radius: 10px;
        overflow: hidden;
        .van-grid {
          flex-wrap: nowrap;
          .van-grid-item__content {
            padding: 8px;
          }
        }
        .van-image {
          width: 40px;
          height: 40px;
        }
        span,
        b {
          font-size: 14px;
        }
      }
      .service-center {
        padding: 10px 0;
        border-radius: 10px;
        background-color: #fff;
        .title {
          font-size: 14px;
          font-weight: bold;
          padding: 3px 15px 10px;
          border-bottom: 1px solid #eee;
        }
        .icon-box {
          box-sizing: border-box;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          padding: 8px;
        }
        .van-grid-item__content {
          padding: 8px;
        }
        span {
          font-size: 14px;
        }
      }
    }
  }
</style>
