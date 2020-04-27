import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import Topup from '../views/Topup.vue'

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
      title: "首页"
    }
  },
  {
    path: '/topup',
    component: Topup,
    meta: {
      title: "充值"
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
    if (localStorage.getItem("loginInfo")) {
      next(); //表示已经登录
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
