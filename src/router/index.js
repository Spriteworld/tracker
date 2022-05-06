import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/stores';

Vue.use(VueRouter);

/** @type {import('vue-router').RouterOptions['routes']} */
export const routes = [
  {
    path: '/',
    name: 'index',
    component: () => import('@/views/Pages/Index.vue')
  },
  {
    path: '/:path(.*)',
    name: 'not_found',
    component: () => import('@/views/Pages/NotFound.vue')
  },
];

const router = new VueRouter({

  base: '/pokemon/tracker/',
  mode: 'history',
  routes,
});

export default router;
