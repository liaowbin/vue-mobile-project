<template>
  <div class="financial-manage">
      <div class="money-info">
          <div class="lump-sum">
              <p>存入总额</p>
              <p>￥{{ interestInfo.interestTotal }}</p>
          </div>
          <div class="income">
              <p>总收益</p>
              <p>{{ interestInfo.interestProfitTotal }}</p>
          </div>
      </div>
      <div class="box">
          <router-link to="" tag="div" class="save-fortune">
              <van-image :src="require('@/assets/images/put.png')" />
              <span>存一笔</span>
          </router-link>
          <div class="list-empty">
              <div class="list-box" v-if="depositList.length != 0">
                  <div class="list" v-for="value in depositList" :key="value.id">
                      <div class="left">
                          <p>存入金额：{{ value.money }}</p>
                          <p>{{ value.start_time | dateFormat }}</p>
                      </div>
                      <div class="right">
                          <p>收益：{{ value.profit }}</p>
                          <p>存入期限：{{ value.days }}</p>
                      </div>
                  </div>
              </div>
              <div class="empty" v-else>
                  <van-image :src="require('@/assets/images/empty.png')"/>
                  <van-button color="#8c64fe" size="small" round>存一笔</van-button>
              </div>
          </div>
      </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      interestInfo: {},
      depositList: []
    }
  },
  created() {
      this.getInterestCount();
      this.getInterestList();
  },
  methods: {
    getInterestCount() {
      this.$toast.loading({
        message: '加载中...',
        duration: 0,
        forbidClick: true,
      });
      this.$http.get(`Wap/Api/getInterestCount?userid=${this.$store.state.userId}`).then(response => {
        if (response.body.status) {
          response.body.data.interestProfitTotal = response.body.data.interestProfitTotal.toFixed(2);
          this.interestInfo = response.body.data;
          this.$toast.clear();
        }
      }, response => {
        this.$toast.clear();
        this.$toast("获取失败");
      })
    },
    getInterestList() {
      this.$toast.loading({
        message: '加载中...',
        duration: 0,
        forbidClick: true,
      });
      this.$http.get(`Wap/Api/getInterestList?userid=${this.$store.state.userId}`).then(response => {
        if (response.body.status) {
          this.depositList = response.body.data;
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
    .financial-manage {
        .money-info {
            display: flex;
            align-items: center;
            padding: 30px 15px 40px;
            font-size: 14px;
            background: #8c64fe url(../../assets/images/mine-bg.png) 100% -55px no-repeat;
            background-size: 100%;
            p {
                margin: 3px 0;
                color: #fff;
            }
            .lump-sum {
                width: 50%;
            }
            .income {
                width: 50%;
            }
        }
        .box {
            width: 92%;
            margin: -20px auto 0;
            .save-fortune {
                display: flex;
                justify-content: center;
                align-items: center;
                padding: 10px 0;
                border-radius: 10px;
                background-color: #fff;
                .van-image {
                    width: 30px;
                    margin-right: 5px;
                }
                span {
                    font-size: 14px;
                }
            }
            .list-empty {
                .list-box {
                    margin-top: 10px;
                    .list {
                        display: flex;
                        justify-content: space-between;
                        padding: 10px;
                        font-size: 14px;
                        background-color: #fff;
                        .left,
                        .right {
                            p {
                                margin: 5px 0;
                                &:first-child {
                                    font-weight: bold;
                                }
                                &:last-child {
                                    color: #999;
                                }
                            }
                        }
                        .right {
                            text-align: right;
                        }
                    }
                }
                .empty {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    width: 200px;
                    margin: 0 auto;
                }
            }
        }
    }
</style>
