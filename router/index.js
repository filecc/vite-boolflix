import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue';
import Search from '../views/Search.vue';
import MovieGeneric from '../views/MovieGeneric.vue';
import TvGeneric from '../views/TvGeneric.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/search', component: Search },
  { path: '/movie/:name', component: MovieGeneric },
  { path: '/series/:name', component: TvGeneric },
]
const router = createRouter({
  history: createWebHistory(),
  routes
})
export default router