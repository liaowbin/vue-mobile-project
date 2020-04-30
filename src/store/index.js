import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userId: 0,
    title: ""
  },
  mutations: {
    initUserId(state,id) {
      state.userId = id;
    },
    initTitle(state, content) {
      state.title = content;
    }
  },
  actions: {
  },
  modules: {
  }
})
