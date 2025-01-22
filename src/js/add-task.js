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