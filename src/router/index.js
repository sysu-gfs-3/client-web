import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/view/Login'
import index from '@/view/index'
import Identity from '@/components/identity'
import userlist from '@/components/user_list'
import information from '@/components/information'
import changepwd from '@/components/changepwd'
import taskexam from '@/components/task_exam'
import tasklist from '@/components/task_list'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/首页',
      name: '首页',
      component: index,
      children: [{
        path: '/首页/用户审核',
        name: '用户审核',
        component: Identity
      },
      {
        path: '/首页/用户列表',
        name: '用户列表',
        component: userlist
      },
      {
        path: '/首页/任务审核',
        name: '任务审核',
        component: taskexam
      },
      {
        path: '/首页/任务目录',
        name: '任务目录',
        component: tasklist
      },
      {
        path: '/首页/个人信息',
        name: '个人信息',
        component: information
      },
      {
        path: '/首页/修改密码',
        name: '修改密码',
        component: changepwd
      }]
    }
  ]
})
