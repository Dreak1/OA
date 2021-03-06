import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: "/index"
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/index',
    name: 'Index',
    component: () => import('../views/Main.vue'),
    children: [
      {
        path: "query/room",
        component: () => import('../views/QueryRoom.vue')
      },
      {
        path: "order/room/:id/:address",
        component: () => import('../views/OrderRoom.vue')
      },
      {
        path: 'room/approval',
        component: () => import("../views/Approval.vue")
      },
      {
        path:'examine/room',
        component: () => import("../views/ExamineRoom.vue")
      },
      {
        path:'meeting/room/:id',
        component: () => import("../views/Editmeeting.vue")
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
