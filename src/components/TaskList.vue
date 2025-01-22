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

<script src="../js/tasklist.js" defer></script>
