<template>
  <div id="app">
    <navbar :title="$store.state.title" :leftText="isReturn ? '返回' : ''" :leftArrow="isReturn" @back="back"></navbar>
    <div class="main" :class="isLogin ? 'fixed-tabbar' : ''">
      <router-view/>
    </div>
    <van-tabbar v-model="active" active-color="#836afe" router v-if="isLogin">
        <van-tabbar-item to="home" icon="home-o">首页</van-tabbar-item>
        <van-tabbar-item to="topup" icon="balance-o">充值</van-tabbar-item>
        <van-tabbar-item to="graborder" icon="flag-o">抢单</van-tabbar-item>
        <van-tabbar-item to="order" icon="coupon-o">记录</van-tabbar-item>
        <van-tabbar-item to="mine" icon="manager-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLogin: false,
      active: 0,
      title: "首页",
      isReturn: false
    }
  },
  created() {
    this.getStatus();
  },
  watch: {
    $route(to, from) {
      // 监听路由一改变 显示对应的标题及判断是否需要返回
      let noShowBackList = ['/', '/home', '/topup', '/graborder', '/order', '/mine'];
      this.isReturn = (noShowBackList.indexOf(to.path) >-1 ? false : true );
      this.getStatus();
    }
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    getStatus() {
      // 设置哪些页面需要显示tabBar
      this.$store.commit('initTitle', this.$route.meta.title);

      let path = this.$route.path;
      if (path == "/home" || path == "/topup" || path == "/graborder" || path == "/order" || path == "/mine") {
        this.isLogin = true;
        // 监听路由变化让对应的tabbar高亮
        switch (path) {
          case '/home':
            this.active = 0;
            break;
          case '/topup':
            this.active = 1;
            break;
          case '/graborder':
            this.active = 2;
            break;
          case '/order':
            this.active = 3;
            break;
          case '/mine':
            this.active = 4;
            break;
        }
      }else {
        this.isLogin = false;
      }
      if (!localStorage.getItem("logininfo") || !localStorage.getItem("userinfo")) {
        this.isLogin = false;
      }
    }
  },
}

</script>

<style lang="less">
  html {
    background-color: #f7f7f7;
  }
  .main {
    height: calc(100vh - 46px);
    padding-top: 46px;
  }
  .fixed-tabbar {
    height: calc(100vh - 46px - 50px);
    padding-bottom: 50px;
  }
</style>
