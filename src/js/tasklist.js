import axios from 'axios';

export default {
  data() {
    return {
      tasks: [],
      displayedTasks: [],
      chunkSize: 2,
      filter: 'all',
    };
  },
  methods: {
    fetchTasks() {
      let endpoint = '/api/tasks';
      if (this.filter === 'completed') {
        endpoint = '/api/tasks?status=completed';
      } else if (this.filter === 'incomplete') {
        endpoint = '/api/tasks?status=incomplete';
      }

      axios.get(endpoint)
        .then(response => {
          this.tasks = response.data;
          this.displayedTasks = this.tasks.slice(0, this.chunkSize);
        })
        .catch(error => console.error('Error fetching tasks:', error));
    },
    markTaskAsCompleted(id) {
      axios.patch(`/api/tasks/${id}`, { completed: true })
        .then(() => this.fetchTasks())
        .catch(error => console.error('Error marking task as completed:', error));
    },
    deleteTask(id) {
      axios.delete(`/api/tasks/${id}`)
        .then(() => this.fetchTasks())
        .catch(error => console.error('Error deleting task:', error));
    },
    loadMoreTasks() {
      const nextChunk = this.tasks.slice(this.displayedTasks.length, this.displayedTasks.length + this.chunkSize);
      this.displayedTasks = this.displayedTasks.concat(nextChunk);
    },
    filterTasks(type) {
      this.filter = type;
      this.fetchTasks();
    }
  },
  mounted() {
    this.fetchTasks();
  }
};
  