import { createRouter, createWebHistory } from 'vue-router'

import Login from '@/pages/login/Login.vue'
import Main from '@/pages/Main.vue'  //一级路由
import Home from '@/pages/home/index.vue'  //首页
import Agreement from '@/pages/agreement/index.vue'  //协议管理----
import Enterprise from '@/pages/enterprise/index.vue'  //企业认证----
import Landmark from '@/pages/landmark/index.vue'  //地标认证----
import Fund from '@/pages/fund/index.vue'  //资金到账情况----
import Order from '@/pages/order/index.vue'   //订单管理-----
import Gongxu from '@/pages/gongxu/index.vue'    //供需频道-----
import Account from '@/pages/account/index.vue'  //账号管理-----

import axios from 'axios'
import { useCounterStore } from '@/stores/counter.js'  //引入仓库

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        noAuth: true
      }
    },
    {
      path: '/',
      name: 'main',
      component: Main,
      meta: {
        noAuth: false
      },
      children: [
        {
          path: '/home',
          name: 'home',
          component: Home,
          meta: {
            noAuth: false,
            title: '首页'
          },
        },
        {
          path: '/agreement',
          name: 'agreement',
          component: Agreement,
          meta: {
            noAuth: false,
            title: '协议管理'
          },
        },
        {
          path: '/enterprise',
          name: 'enterprise',
          component: Enterprise,
          meta: {
            noAuth: false,
            title: '企业认证'
          },
        },
        {
          path: '/landmark',
          name: 'landmark',
          component: Landmark,
          meta: {
            noAuth: false,
            title: '地标认证'
          },
        },
        {
          path: '/fund',
          name: 'fund',
          component: Fund,
          meta: {
            noAuth: false,
            title: '资金到账情况'
          },
        },
        {
          path: '/order',
          name: 'order',
          component: Order,
          meta:{
            noAuth: false,
            title: '订单管理'
          },
          children:[
            {
              path: '/orders',
              name: 'orders',
              meta:{
                noAuth: false,
                title: '收购订单'
              },
              component: () => import('../pages/order/orders.vue')
            },
          ]
        },
        {
          path: '/gongxu',
          name: 'gongxu',
          component: Gongxu,
          meta:{
            noAuth: false,
            title: '供需频道'
          },
          children:[
            {
              path: '/gongying',
              name: 'gongying',
              meta:{
                noAuth: false,
                title: '需求信息'
              },
              component: () => import('../pages/gongxu/gongying.vue')
            },
            {
              path: '/xuqiu',
              name: 'xuqiu',
              meta:{
                noAuth: false,
                title: '需求发布'
              },
              component: () => import('../pages/gongxu/xuqiu.vue')
            }
          ]
        },
        {
          path: '/account',
          name: 'account',
          component: Account,
          meta:{
            noAuth: false,
            title: '账号管理'
          },
          children:[
            {
              path: '/nonghu',
              name: 'nonghu',
              meta:{
                noAuth: false,
                title: '农户管理'
              },
              component: () => import('../pages/account/nonghu.vue')
            },
            {
              path: '/mine',
              name: 'mine',
              meta:{
                noAuth: false,
                title: '我的账号'
              },
              component: () => import('../pages/account/mine.vue')
            },
            {
              path: '/huiyuan',
              name: 'huiyuan',
              meta:{
                noAuth: false,
                title: '会员注册'
              },
              component: () => import('../pages/account/huiyuan.vue')
            },
            {
              path: '/logon',
              name: 'logon',
              meta:{
                noAuth: false,
                title: '会员登录'
              },
              component: () => import('../pages/account/logon.vue')
            },
            {
              path: '/forget',
              name: 'forget',
              meta:{
                noAuth: false,
                title: '忘记密码'
              },
              component: () => import('../pages/account/forget.vue')
            },
            {
              path: '/information',
              name: 'information',
              meta:{
                noAuth: false,
                title: '账号信息'
              },
              component: () => import('../pages/account/information.vue')
            }
          ]
        },
      ]
    }
  ]
})

let personalStore; // 定义一个全局变量
// 路由的全局前置守卫的回调函数有三个参数，1：to：到哪个页面来 2：from：从哪个页面来，next是一个函数，表示是否放行
router.beforeEach((to, from, next) => {
  return next()
  if (!personalStore) { // 只会初始化一次
    personalStore = useCounterStore(); // 生成store一个实例
  }
  if (to.meta.noAuth) { // 如果不需要登录的页面，就直接放行
    next();// 放行
  } else if (!localStorage.userId) {  // 如果需要登录的页面，需要判断是否登录成功过
    // 跳转到登录页面，这里直接使用router
    router.replace('/login');
  } else {
    // 获取个人信息，并存入到全局状态
    axios.post('/api/detail/member', { id: localStorage.userId }).then(res => {
      const data = res.data;
      if (!data.success) {
        // 如果拉取个性信息没有成功，跳转到登录页面，这里直接使用router
        router.replace('/login');
      } else {
        // store.commit('setPersonal', data.result); // 直接使用store,相当于组件中的this.$store
        personalStore.send(data.result);
        next(); // 说明登录过，放行
      }
    });
  }
});


export default router;
