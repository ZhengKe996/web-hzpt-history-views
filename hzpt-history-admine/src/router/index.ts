import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/list',
    },
    {
      path: '/list',
      name: 'list',
      component: () => import('@/views/list'),
    },
    {
      path: '/category',
      name: 'category',
      component: () => import('@/views/category'),
    },
    {
      path: '/404',
      name: '404',
      component: () => import('@/views/404'),
    },
    // 404 页面处理
    {
      path: '/:catchAll(.*)',
      name: 'error',
      redirect: '/404',
    },
  ],
  history: createWebHistory(),
})

export default router
