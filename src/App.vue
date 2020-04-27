<template>
  <div id="app">
    <navbar :title="title" :leftText="isReturn ? '返回' : ''" :leftArrow="isReturn" @back="back"></navbar>
    <router-view/>
      <van-tabbar v-model="active" active-color="#836afe" router v-if="isLogin">
          <van-tabbar-item to="home" icon="home-o">首页</van-tabbar-item>
          <van-tabbar-item to="topup" icon="balance-o">充值</van-tabbar-item>
          <van-tabbar-item to="graborder" icon="flag-o">抢单</van-tabbar-item>
          <van-tabbar-item to="record" icon="coupon-o">记录</van-tabbar-item>
          <van-tabbar-item to="mine" icon="manager-o">我的</van-tabbar-item>
      </van-tabbar>
      <van-overlay :show="isMask">
          <van-loading type="spinner" size="48px" />
      </van-overlay>
  </div>
</template>

<script>

export default {
  data() {
    return {
      isLogin: false,
      active: 0,
      title: "首页",
      isReturn: false,
      isMask: true
    }
  },
  created() {
    let path = this.$route.path;
    if (path != "/login" || path == "/home" || path == "/topup" || path == "/graborder" || path == "/record" || path == "/mine") this.isLogin = true;
  },
  mounted() {
    this.isMask = false;
  },
  watch: {
    $route(to, from) {
      let noShowBackList = ['/', '/home', '/topup', '/graborder', '/record', '/mine'];
      this.isReturn = (noShowBackList.indexOf(to.path) >-1 ? false : true );
      this.title = to.meta.title;
    }
  },
  methods: {
    back() {
      this.$router.go(-1);
    }
  },
}

</script>

<style lang="less">
  html {
    background-color: #f7f7f7;
  }
  .van-loading {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
  }
</style>
