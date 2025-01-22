<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-lg-6 col-md-8 col-sm-10">
        <div class="card shadow-sm border-0">
          <div class="card-header bg-primary text-white text-center">
            <h4 class="mb-0">Add New Task</h4>
          </div>
          <div class="card-body p-4">
            <form @submit.prevent="addTask">
              <div class="mb-3">
                <label for="title" class="form-label fw-semibold">Title</label>
                <input 
                  type="text" 
                  class="form-control" 
                  id="title" 
                  placeholder="Enter task title" 
                  v-model="newTask.title">
                <div v-if="errors.title" class="text-danger mt-1">{{ errors.title }}</div>
              </div>
              <div class="mb-3">
                <label for="description" class="form-label fw-semibold">Description</label>
                <textarea 
                  class="form-control" 
                  id="description" 
                  rows="4" 
                  placeholder="Enter task description" 
                  v-model="newTask.description"></textarea>
                <div v-if="errors.description" class="text-danger mt-1">{{ errors.description }}</div>
              </div>
              <div class="mb-3">
                <label for="due_date" class="form-label fw-semibold">Due Date</label>
                <input 
                  type="date" 
                  class="form-control" 
                  id="due_date" 
                  v-model="newTask.due_date">
                <div v-if="errors.due_date" class="text-danger mt-1">{{ errors.due_date }}</div>
              </div>
              <div class="d-grid">
                <button type="submit" class="btn btn-primary">Add Task</button>
              </div>
            </form>
            <div class="text-center mt-3">
              <button @click="$router.push('/')" class="btn btn-outline-secondary">Back to Task List</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      newTask: {
        title: '',
        description: '',
        due_date: ''
      },
      errors: {}
    };
  },
  methods: {
    addTask() {
      this.errors = {};
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

      if (!this.newTask.title) {
        this.errors.title = 'Title is required.';
      }
      if (!this.newTask.description) {
        this.errors.description = 'Description is required.';
      }
      if (!this.newTask.due_date) {
        this.errors.due_date = 'Due date is required.';
      } else if (!dateRegex.test(this.newTask.due_date)) {
        this.errors.due_date = 'Due date must be in the format YYYY-MM-DD.';
      }

      if (Object.keys(this.errors).length === 0) {
        axios.post('/api/tasks', this.newTask)
          .then(() => {
            this.$router.push('/');
            this.newTask = { title: '', description: '', due_date: '' };
          })
          .catch(error => console.error('Error adding task:', error));
      }
    }
  }
};
</script>
