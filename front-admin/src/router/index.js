import Vue from 'vue'
import VueRouter from 'vue-router'
import EnumLayout from "@/plugins/layout/enum-layout";
//
import Home from "@/views/Home";
import ContentsManage from "@/views/ContentsManage";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/contents-manage',
  },
  {
    path: '/home',
    component: Home,
    meta: { layout: EnumLayout.DefaultLayout }
  },
  {
    path: '/contents-manage',
    component: ContentsManage,
    meta: { layout: EnumLayout.FlatLayout }
  },



  /*{
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/!* webpackChunkName: "about" *!/ '../views/About.vue')
  }*/

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
