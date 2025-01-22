import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'TaskList',
      component: import('../components/TaskList.vue')
    },
    {
      path: '/add-task',
      name: 'AddTask',
      component: import('../components/AddTask.vue')
    }
  ],
})

export default router
