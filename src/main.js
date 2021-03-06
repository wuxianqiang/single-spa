import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import HelloWorld from 'src/components/HelloWorld'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

function registerGlobal (root, deps) {
  Object.keys(deps).forEach((key) => {
    root[key] = deps[key];
  });
}

registerGlobal(window, {
  vue: Vue,
  HelloWorld: HelloWorld
})

export default registerGlobal
