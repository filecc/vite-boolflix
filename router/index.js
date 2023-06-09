import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', component: () => import('../views/Home.vue')},
  { path: '/404', component: () => import('../views/NotFound.vue') },  
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: () => import('../views/NotFound.vue') },
  { path: '/search',component: () => import('../views/Search.vue')},
  { path: '/movie/:name', component: () => import('../views/SingleItemDisplayDetail.vue') },
  { path: '/series/:name', component: () => import('../views/SingleItemDisplayDetail.vue') },
  { path: '/tv/:name', component: () => import('../views/SingleItemDisplayDetail.vue') },
  { path: '/actors/:name', component: () => import('../views/SingleActor.vue') },
];


const router = createRouter({
  history: createWebHistory(),
  routes
})

router.resolve({
    name: 'NotFound',
    params: { pathMatch: ['not', 'found'] },
  }).href // '/not/found';

export default router