import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import { handleRouter } from './generator'
import subAppMapInfo from 'dir/config'
import Store from '../store'
Vue.use(VueRouter)

const routes = [
  {
    path: '/subapp',
    name: 'Home',
    component: Home
  },
  {
    path: '/',
    redirect: '/subapp'
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

const subAppRoutes = {}

router.beforeEach(function (to, from, next) {
  const { path } = to;
  // 取路径中标识子工程前缀的部分, 例如 '/subapp/xxx/index' 其中xxx即路由唯一前缀
  const id = path.split('/')[2];
  const subAppModule = subAppMapInfo[id];
  if (subAppModule) {
    if (subAppRoutes[id]) {
      console.log('这个路径加载过')
      next()
    } else {
      subAppModule.js().then((registerApp) => {
        console.log(registerApp)
        let result = registerApp.default()
        // 加载路由
        subAppRoutes[id] = result.router
        routes[0].children = handleRouter(result)
        console.log(routes)
        router.addRoutes(routes)
        // 加载状态
        Store.registerModule(id, result.store)
        next({...to, replace:true})
        console.log('ok', '加载子项目成功')
      }, (err) => {
        console.log(err, '加载子项目失败')
        next('/subapp')
      })
    }
  } else {
    next()
  }
})

export default router
