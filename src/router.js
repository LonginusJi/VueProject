import { createRouter, createWebHistory } from 'vue-router'

export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('./views/Home.vue')
    },
    {
      path: '/Chart',
      name: 'Chart',
      component: () => import('./views/Chart.vue')
    },
    {
      path: '/ForceChart',
      name: 'ForceChart',
      component: () => import('./components/ForceChart.vue')
    },
    {
      path: '/ForceBar',
      name: 'ForceBar',
      component: () => import('./components/ForceBar.vue')
    },
    {
      path: '/HighChart',
      name: 'HighChart',
      component: () => import('./components/HighChart.vue')
    },
    {
      path: '/CircleChart',
      name: 'CircleChart',
      component: () => import('./components/CircleChart.vue')
    },
    {
      path: '/Playground',
      name: 'Playground',
      component: () => import('./components/Playground.vue')
    },
  ]
})
