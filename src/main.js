import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import VueResource from 'vue-resource'
Vue.use(VueResource);
Vue.prototype.resourceSrc = Vue.http.options.root = 'http://39.106.60.178:88/';
Vue.http.options.emulateJSON = true;

import {
  Tabbar, TabbarItem, NavBar, Button, Field, Form, Checkbox, CheckboxGroup, Toast, Swipe, SwipeItem, Lazyload, Grid, GridItem, Image as VanImage,
  Overlay, Loading, Tab, Tabs, NumberKeyboard, PullRefresh, NoticeBar  
} from 'vant';

Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(NavBar);
Vue.use(Button);
Vue.use(Field);
Vue.use(Form);
Vue.use(Checkbox).use(CheckboxGroup);
Vue.use(Toast);
Vue.use(Swipe).use(SwipeItem);
Vue.use(Lazyload);
Vue.use(Grid).use(GridItem).use(VanImage);
Vue.use(Overlay).use(Loading);
Vue.use(Tab).use(Tabs);
Vue.use(NumberKeyboard);
Vue.use(PullRefresh);
Vue.use(NoticeBar);

// 导入格式化时间插件
import moment from "moment"
// 定义全局时间过滤器
Vue.filter("dateFormat", function(dataStr, pattern = "YYYY-MM-DD HH:mm:ss"){
    dataStr = parseInt(dataStr)*1000;
    return moment(dataStr).format(pattern);
})

Vue.config.productionTip = false

import navbar from "./components/Header.vue"
Vue.component("navbar", navbar)


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
