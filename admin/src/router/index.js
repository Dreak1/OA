import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../views/login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect:'/login'
  },
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/index',
    name: 'index',
    component: () => import('../views/Main.vue'),
    children :[
      {
        path : '/index/room/create',
        component: ()=> import('../views/RoomCreate.vue')
      },
      {
        path : '/index/room/list',
        component: ()=> import('../views/RoomList.vue')
      },
      {
        path : '/index/room/edit/:id',
        component: ()=> import('../views/RoomEdit.vue')
      },
      {
        path : '/index/user/list',
        component: ()=> import('../views/UserList.vue')
      },
      {
        path : '/index/Admin/list',
        component: ()=> import('../views/AdminList.vue')
      },
      {
        path : '/index/create/user',
        component: ()=> import('../views/CreateUser.vue')
      },
      {
        path : '/index/create/admin',
        component: ()=> import('../views/CreateAdmin.vue')
      },
      {
        path : '/index/admin/edit/:id',
        component: ()=> import('../views/EditAdmin.vue')
      },
      {
        path : '/index/user/edit/:id',
        component: ()=> import('../views/UserEdit.vue')
      },
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
