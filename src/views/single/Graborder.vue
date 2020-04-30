<template>
  <div class="graborder">
      <div class="order-summary">
        <div class="tl">淘宝订单汇总</div>
        <div class="list list-1">
          <div class="left">
            <p class="commi">
              <span>今日已抢佣金</span>
              <span>佣金{{ account.yj_rate }}%</span>
            </p>
            <p>￥{{ account.my_today_yj }}</p>
          </div>
          <div class="right">
            <p>团队总佣金</p>
            <p>￥{{ account.team_total_yj }}</p>
          </div>
        </div>
        <div class="list list-2">
          <div class="left">
            <p>今日已抢单数</p>
            <p>{{ account.day_task_num }}</p>
          </div>
          <div class="right">
            <p>今日冻结单数</p>
            <p>{{ account.my_today_dj_count }}</p>
          </div>
        </div>
        <div class="list list-3">
          <div class="left">
            <p>账户冻结总金额</p>
            <p>￥{{ account.forzen_money }}</p>
          </div>
          <div class="right">
            <p>当前余额</p>
            <p>￥{{ account.my_money }}</p>
          </div>
        </div>
      </div>
      <div class="operation">
        <van-button round block color="#8c64fe">自动抢单</van-button>
        <van-button round block color="#8c64fe" plain>停止抢单</van-button>
      </div>
      <div class="card">
        <div class="title">备注说明</div>
        <div class="content" v-html="cardContent"></div>
      </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      account: {},
      cardContent: ""
    };
  },
  created() {
    this.getAccountCount();
    this.getNoticeTip();
  },
  methods: {
    getNoticeTip() {
      this.$toast.loading({
        message: '加载中...',
        duration: 0,
        forbidClick: true,
      });
      this.$http.get("Wap/Api/getSystemNotice?id=10").then(response => {
        if (response.body.status) {
          this.cardContent = response.body.data.content;
          this.$toast.clear();
        }
      }, response => {
        this.$toast("获取失败");
        this.$toast.clear();
      })
    },
    getAccountCount() {
      this.$toast.loading({
        message: '加载中...',
        duration: 0,
        forbidClick: true,
      });
      this.$http.get(`Wap/Api/getAccountCount?type=1&userid=${this.$store.state.userId}`).then(response => {
        if (response.body.status) {
          this.account = response.body.data;
          this.$toast.clear();
        }
      }, response => {
        this.$toast("获取失败");
        this.$toast.clear();
      })
    }
  },
};
</script>
<style lang="less">
  .graborder {
    .order-summary {
      position: relative;
      box-sizing: border-box;
      width: 100%;
      padding: 10px 15px 15px;
      background-color: #836afe;
      &:after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: url(../../assets/images/mine-bg.png) no-repeat;
        background-size: cover;
      }
      .tl {
        padding-top: 5px;
        font-size: 14px;
        color: #fff;
      }
      .list {
        display: flex;
        padding: 5px 0;
        border-bottom: 1px solid #fff;
        &:last-child {
          border-bottom: 0;
        }
        .left {
          width: 50%;
        }
        .right {
          width: 50%;
        }
        p {
          margin: 5px 0;
          font-size: 12px;
          color: #fff;
        }
      }
      .list-1 {
        .left {
          .commi {
            display: flex;
            justify-content: space-between;
            span {
              &:last-child {
                padding: 2px 6px;
                margin-right: 15px;
                color: #fbbd08;
                border-radius: 10px;
                border: 1px solid #fbbd08;
              }
            }
          }
        }
      }
    }
    .operation {
      padding: 0 15px;
      .van-button {
        margin: 10px 0;
      }
    }
    .card {
      width: 83%;
      margin: 0 auto;
      padding: 10px 15px;
      border-radius: 10px;
      background-color: #fff;
      .title {
        padding-bottom: 10px;
        color: #836afe;
        border-bottom: 1px solid #eee;
      }
      .content {
        font-size: 14px;
        p {
          margin: 5px 0;
        }
      }
    }
  }
</style>
