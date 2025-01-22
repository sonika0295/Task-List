// src/store.js
import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
  state: {
    tasks: [],
    newTask: {
      title: '',
      description: '',
      due_date: ''
    },
    errors: {},
    filter: 'all'
  },
  mutations: {
    setTasks(state, tasks) {
      state.tasks = tasks;
    },
    addTask(state, task) {
      state.tasks.push(task);
    },
    updateTaskStatus(state, { id, completed }) {
      const task = state.tasks.find(task => task.id === id);
      if (task) {
        task.completed = completed;
      }
    },
    deleteTask(state, id) {
      state.tasks = state.tasks.filter(task => task.id !== id);
    },
    setNewTask(state, newTask) {
      state.newTask = newTask;
    },
    setErrors(state, errors) {
      state.errors = errors;
    },
    setFilter(state, filter) {
      state.filter = filter;
    }
  },
  actions: {
    fetchTasks({ commit, state }) {
      let endpoint = '/api/tasks';
      if (state.filter === 'completed') {
        endpoint = '/api/tasks?status=completed';
      } else if (state.filter === 'incomplete') {
        endpoint = '/api/tasks?status=incomplete';
      }

      axios.get(endpoint)
        .then(response => {
          commit('setTasks', response.data);
        })
        .catch(error => console.error('Error fetching tasks:', error));
    },
    addTask({ commit, state }) {
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
      let errors = {};

      if (!state.newTask.title) {
        errors.title = 'Title is required.';
      }
      if (!state.newTask.description) {
        errors.description = 'Description is required.';
      }
      if (!state.newTask.due_date) {
        errors.due_date = 'Due date is required.';
      } else if (!dateRegex.test(state.newTask.due_date)) {
        errors.due_date = 'Due date must be in the format YYYY-MM-DD.';
      }

      if (Object.keys(errors).length === 0) {
        axios.post('/api/tasks', state.newTask)
          .then(() => {
            commit('addTask', state.newTask);
            commit('setNewTask', { title: '', description: '', due_date: '' });
          })
          .catch(error => console.error('Error adding task:', error));
      } else {
        commit('setErrors', errors);
      }
    },
    markTaskAsCompleted({ commit, dispatch }, id) {
      axios.patch(`/api/tasks/${id}`, { completed: true })
        .then(() => {
          dispatch('fetchTasks');
        })
        .catch(error => console.error('Error marking task as completed:', error));
    },
    deleteTask({ dispatch }, id) {
      axios.delete(`/api/tasks/${id}`)
        .then(() => {
          dispatch('fetchTasks');
        })
        .catch(error => console.error('Error deleting task:', error));
    },
    filterTasks({ commit, dispatch }, type) {
      commit('setFilter', type);
      dispatch('fetchTasks');
    }
  },
  getters: {
    completedTasks: state => state.tasks.filter(task => task.completed),
    incompleteTasks: state => state.tasks.filter(task => !task.completed),
    tasks: state => state.tasks,
    newTask: state => state.newTask,
    errors: state => state.errors
  }
});
