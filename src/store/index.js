import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    name: 'app'
  },
  mutations: {
    todo (state) {
      console.log(state, 'app')
    }
  },
  actions: {
  },
  modules: {
  }
})
