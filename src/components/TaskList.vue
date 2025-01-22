<template>
  <div class="container my-4">
    <div class="card shadow-lg">
      <div class="card-header bg-primary text-white d-flex justify-content-between align-items-center">
        <h1 class="mb-0" id="task-manager-heading">Task Manager</h1>
        <button 
          @click="$router.push('/add-task')" 
          class="btn btn-light btn-sm shadow-sm" 
          aria-label="Add Task" 
          aria-labelledby="task-manager-heading"
        >
          Add Task
        </button>
      </div>
      <div class="card-body">
        <!-- Filter Buttons -->
        <div class="d-flex flex-wrap justify-content-center gap-2 mb-3">
          <button 
            @click="filterTasks('all')" 
            class="btn btn-outline-primary btn-sm px-4" 
            :class="{'active': filter === 'all'}" 
            aria-label="Show All Tasks" 
            :aria-pressed="filter === 'all'"
          >
            All Tasks
          </button>
          <button 
            @click="filterTasks('completed')" 
            class="btn btn-outline-success btn-sm px-4" 
            :class="{'active': filter === 'completed'}" 
            aria-label="Show Completed Tasks" 
            :aria-pressed="filter === 'completed'"
          >
            Completed
          </button>
          <button 
            @click="filterTasks('incomplete')" 
            class="btn btn-outline-warning btn-sm px-4" 
            :class="{'active': filter === 'incomplete'}" 
            aria-label="Show Incomplete Tasks" 
            :aria-pressed="filter === 'incomplete'"
          >
            Incomplete
          </button>
        </div>

        <!-- Task Table -->
        <div class="table-responsive">
          <table class="table table-hover align-middle text-center" role="table" aria-labelledby="task-manager-heading">
            <thead class="bg-dark text-white">
              <tr>
                <th scope="col">Title</th>
                <th scope="col">Description</th>
                <th scope="col">Due Date</th>
                <th scope="col">Status</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="task in displayedTasks" :key="task.id" class="table-row-hover">
                <td>{{ task.title }}</td>
                <td>{{ task.description }}</td>
                <td>{{ task.due_date }}</td>
                <td>
                  <span :class="task.completed ? 'badge bg-success' : 'badge bg-warning'" role="status">
                    {{ task.completed ? 'Completed' : 'Incomplete' }}
                  </span>
                </td>
                <td>
                  <!-- Action Buttons -->
                  <div class="d-flex flex-wrap justify-content-center gap-2">
                    <button
                      @click="markTaskAsCompleted(task.id)"
                      class="btn btn-success btn-sm px-3 shadow-sm"
                      :disabled="task.completed"
                      aria-label="Mark task as completed"
                    >
                      Complete
                    </button>
                    <button
                      @click="deleteTask(task.id)"
                      class="btn btn-danger btn-sm px-3 shadow-sm"
                      aria-label="Delete task"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Load More Button -->
        <div class="text-center mt-3">
          <button
            @click="loadMoreTasks"
            class="btn btn-primary btn-sm px-4 shadow-sm"
            v-if="displayedTasks.length < tasks.length"
            aria-label="Load more tasks"
          >
            Load More
          </button>
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
</script>

<style scoped>
.card {
  border-radius: 10px;
  overflow: hidden;
}
.card-header {
  border-bottom: 2px solid rgba(255, 255, 255, 0.2);
}
.table {
  margin-bottom: 0;
}
.table-row-hover:hover {
  background-color: rgba(0, 123, 255, 0.1);
  cursor: pointer;
}
.badge {
  font-size: 0.9rem;
  padding: 0.5em 0.7em;
  border-radius: 5px;
}
button:disabled {
  cursor: not-allowed;
  opacity: 0.7;
}
button.active {
  font-weight: bold;
  border-width: 2px;
}
.d-flex.gap-2 {
  gap: 0.5rem;
}
@media (max-width: 768px) {
  .btn {
    font-size: 0.8rem;
    padding: 0.4rem 0.7rem;
  }
  .btn-sm {
    padding: 0.3rem 0.5rem;
  }
  .table th, .table td {
    font-size: 0.85rem;
  }
  .table-responsive {
    overflow-x: auto;
  }
}
</style>
