import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', component: () => import('../views/Home.vue')},
  { path: '/search',component: () => import('../views/Search.vue')},
  { path: '/movie/:name', component: () => import('../views/MovieGeneric.vue') },
  { path: '/series/:name', component: () => import('../views/TvGeneric.vue') },
]
const router = createRouter({
  history: createWebHistory(),
  routes
})
export default router