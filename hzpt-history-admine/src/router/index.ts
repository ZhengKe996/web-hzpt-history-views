import { createRouter, createWebHashHistory } from 'vue-router'

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
      path: '/add-category',
      name: 'add-category',
      component: () => import('@/views/add-category'),
    },
    {
      path: '/change-category',
      name: 'change-category',
      component: () => import('@/views/change-category'),
    },
    {
      path: '/add-info',
      name: 'add-info',
      component: () => import('@/views/add-info'),
    },
    {
      path: '/change-info',
      name: 'change-info',
      component: () => import('@/views/change-info'),
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
  history: createWebHashHistory(),
})

export default router
