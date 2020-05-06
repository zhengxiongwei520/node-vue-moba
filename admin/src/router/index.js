import Vue from 'vue'
import VueRouter from 'vue-router'

import Main from '../views/Main.vue'
import Login from '../views/Login.vue'


import CateEdit from '../views/CateEdit.vue'
import CateList from '../views/CateList.vue'

import ItemEdit from '../views/ItemEdit.vue'
import ItemList from '../views/ItemList.vue'

import HeroEdit from '../views/HeroEdit.vue'
import HeroList from '../views/HeroList.vue'

import ArticleEdit from '../views/ArticleEdit.vue'
import ArticleList from '../views/ArticleList.vue'

import AdEdit from '../views/AdEdit.vue'
import AdList from '../views/AdList.vue'

import AdminUserEdit from '../views/AdminUserEdit.vue'
import AdminUserList from '../views/AdminUserList.vue'

import StrategyEdit from '../views/StrategyEdit.vue'
import StrategyList from '../views/StrategyList.vue'

import RaceEdit from '../views/RaceEdit.vue'
import RaceList from '../views/RaceList.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    component: Login,
    meta: { isPublic: true }
  },
  {
    path: '/',
    name: 'main',
    component: Main,
    children: [
      { path: '/cates/create', component: CateEdit },
      { path: '/cates/edit/:id', component: CateEdit, props: true }, // props true会把:id传给cateedit页面
      { path: '/cates/list', component: CateList },

      { path: '/items/create', component: ItemEdit },
      { path: '/items/edit/:id', component: ItemEdit, props: true },
      { path: '/items/list', component: ItemList },

      { path: '/heros/create', component: HeroEdit },
      { path: '/heros/edit/:id', component: HeroEdit, props: true },
      { path: '/heros/list', component: HeroList },

      { path: '/articles/create', component: ArticleEdit },
      { path: '/articles/edit/:id', component: ArticleEdit, props: true },
      { path: '/articles/list', component: ArticleList },

      { path: '/ads/create', component: AdEdit },
      { path: '/ads/edit/:id', component: AdEdit, props: true },
      { path: '/ads/list', component: AdList },

      { path: '/admin_users/create', component: AdminUserEdit },
      { path: '/admin_users/edit/:id', component: AdminUserEdit, props: true },
      { path: '/admin_users/list', component: AdminUserList },

      { path: '/strategies/create', component: StrategyEdit },
      { path: '/strategies/edit/:id', component: StrategyEdit, props: true },
      { path: '/strategies/list', component: StrategyList },

      { path: '/races/create', component: RaceEdit },
      { path: '/races/edit/:id', component: RaceEdit, props: true },
      { path: '/races/list', component: RaceList },
    ]
  },

  // {
  //   path: '/about',
  //   name: 'about',
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if(!to.meta.isPublic && !localStorage.token){
    return next('/login')
  }
  next()
})

export default router