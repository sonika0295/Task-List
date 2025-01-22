
import TaskList from '../components/TaskList.vue';
import TaskForm from '../components/TaskForm.vue';

import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'TaskList',
      component: TaskList
    },
    {
      path: '/add-task',
      name: 'TaskForm',
      component: TaskForm
    }
  ],
})

export default router
