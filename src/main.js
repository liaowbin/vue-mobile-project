import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import VueResource from 'vue-resource'
Vue.use(VueResource);
Vue.http.options.root = 'http://39.106.60.178:88/Wap/Api/';
Vue.http.options.emulateJSON = true;

import {
  Tabbar, TabbarItem, NavBar, Button, Field, Form, Checkbox, CheckboxGroup, Toast, Swipe, SwipeItem, Lazyload, Grid, GridItem, Image as VanImage,
  Overlay, Loading, Tab, Tabs, NumberKeyboard 
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
Vue.use(NumberKeyboard)

Vue.config.productionTip = false

import navbar from "./components/Header.vue"
Vue.component("navbar", navbar)


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
