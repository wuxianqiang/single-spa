import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import { handleRouter } from './generator'
import Store from '../store'
import jsonp from 'jsonp'
const subAppMapInfo = require('../../app.json')

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
  const id = path.split('/')[2];
  const subAppModule = subAppMapInfo[id];
  if (subAppModule) {
    if (subAppRoutes[id]) {
      if (subAppRoutes[id].beforeEach) {
        let Route = router
        Route.handleRouter = handleRouter
        Route.cacheRouter = routes
        subAppRoutes[id].beforeEach(to, from, next, Store, Route)
      } else {
        next()
      }
    } else {
      jsonp(subAppMapInfo[id].js, { timeout: 500 }, function (err, date) {
        if (err) {
          console.log(`${id}项目加载失败：`, err)
          next('/subapp')
        } else {
          let result = date()
          console.log(`${id}项目加载成功：`, result)
          // 加载路由
          subAppRoutes[id] = result
          let children = routes[0].children
          if (children) {
            routes[0].children = children.concat(handleRouter({name: id, router: result.router}))
          } else {
            routes[0].children = handleRouter({name: id, router: result.router})
          }
          router.addRoutes(routes)
          // 加载状态
          Store.registerModule(id, result.store)
          next({...to, replace:true})
        }
      })
      next()
    }
  } else {
    next()
  }
})

export default router
