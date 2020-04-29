import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

import Login from '../views/Login.vue'
import Home from '../views/home/Home.vue'
import Topup from '../views/topup/Topup.vue'
  import FinancialManage from '../views/topup/FinancialManage.vue'
import Graborder from '../views/single/Graborder.vue'
import Recording from '../views/order/Recording.vue'
import Mine from '../views/mine/index.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    redirect: "/login"
  },
  {
    path: '/login',
    component: Login,
    name: "login",
    meta: {
      title: "登录"
    }
  },
  {
    path: '/home',
    component: Home,
    meta: {
      title: "首页",
      isLogin: true
    }
  },
  {
    path: '/topup',
    component: Topup,
    meta: {
      title: "充值",
      isLogin: true
    }
  },
  {
    path: "/topup/financialmanage",
    component: FinancialManage,
    meta: {
      title: "定期理财",
      isLogin: true
    }
  },
  {
    path: '/graborder',
    component: Graborder,
    meta: {
      title: "抢单",
      isLogin: true
    }
  },
  {
    path: '/recording',
    component: Recording,
    meta: {
      title: "记录",
      isLogin: true
    }
  },
  {
    path: '/mine',
    component: Mine,
    meta: {
      title: "我",
      isLogin: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(function(to, from, next) {
  if (to.meta.isLogin) {
    if (localStorage.getItem("logininfo") && localStorage.getItem("userinfo")) {
      next(); //表示已经登录
      // 获取 localStorage 里存储的userid 随后把id传到vuex 使得每个页面都能获取到id
      let id = JSON.parse(localStorage.getItem("userinfo")).id;
      store.commit('initUserId', id);
    } else {
      //next可以传递一个路由对象作为参数 表示需要跳转到的页面
      next({
        name: "login"
      });
    }
  } else {
    //表示不需要登录
    next(); //继续往后走
  }
})

export default router
