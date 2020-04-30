<template>
  <div class="artice">
      <p class="tl">{{ contentData.name }}</p>
      <div class="time">{{ time }}</div>
      <div class="content" v-html="contentData.content"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
        contentData: {},
        time: ""
    }
  },
  created() {
      this.getArticleDetail();
  },
  methods: {
    getArticleDetail() {
      this.$toast.loading({
        message: '加载中...',
        duration: 0,
        forbidClick: true,
      });
      this.$http.get(`Wap/Api/getArticleDetail?id=${this.$route.query.id}`).then(response => {
        if (response.body.status) {
          this.contentData = response.body.data;
          this.$store.commit("initTitle", this.contentData.name);
          this.time = this.$options.filters['dateFormat'](this.contentData.add_time);
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
    .artice {
        min-height: calc(100vh - 46px);
        padding: 0 15px;
        background-color: #fff;
        p {
            margin: 0;
            padding: 5px 0;
        }
        .tl {
            padding-top: 10px;
            font-size: 20px;
            font-weight: bold;
        }
        .time {
            font-size: 13px;
            color: #666;
        }
    }
</style>
