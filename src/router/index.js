import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/view/Login'
import index from '@/view/index'
import Identity from '@/components/identity'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/index',
      name: 'index',
      component: index,
      children: [{
        path: '/index/Identity',
        name: 'Identity',
        component: Identity
      }]
    }
  ]
})
