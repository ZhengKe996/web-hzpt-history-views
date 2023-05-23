import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'main',
    component: () => import('@/views/layout'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('@/views/main'),
      },
      {
        path: '/pins/:id',
        name: 'pins',
        component: () => import('@/views/pins'),
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
  },
]
export default routes
