import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
import Home from '../views/Home.vue'
import ArticleContent from '../views/ArticleContent.vue'
import Hero from '../views/Hero.vue'
import StrategyCenter from '../views/StrategyCenter.vue'
import StrategyContent from '../views/StrategyContent.vue'
import NewsList from '../views/NewsList.vue'
import HeroList from '../views/HeroList.vue'
import RacesCenter from '../views/RacesCenter.vue'
Vue.use(VueRouter)

const routes = [
{
  path: '/',
  name: 'Main',
  component: Main,
  children: [
    { path: '/', name: 'home', component: Home },
    { path: '/article/:id', name: 'article', component: ArticleContent, props: true },
    { path: '/strategycenter', name: 'strategycenter', component: StrategyCenter },
    { path: '/strategies/:id', name: 'strategycontent', component: StrategyContent, props: true },
    { path: '/newsList', name: 'newslist', component: NewsList, },
    { path: '/heroesList', name: 'heroeslist', component: HeroList },
    { path: '/racescenter', name: 'racescenter', component: RacesCenter }
  ]
},
{
  path: '/hero/:id',
  name: 'hero',
  component: Hero,
  props: true
}]

import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
Vue.use(VueAwesomeSwiper, /* { default options with global component } */ )



const router = new VueRouter({
  routes
})

export default router