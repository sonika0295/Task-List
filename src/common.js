import axios from 'axios';

export function addTask(newTask, router, errors) {
  errors.value = {};
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

  if (!newTask.title) {
    errors.value.title = 'Title is required.';
  }
  if (!newTask.description) {
    errors.value.description = 'Description is required.';
  }
  if (!newTask.due_date) {
    errors.value.due_date = 'Due date is required.';
  } else if (!dateRegex.test(newTask.due_date)) {
    errors.value.due_date = 'Due date must be in the format YYYY-MM-DD.';
  }

  if (Object.keys(errors.value).length === 0) {
    return axios.post('/api/tasks', newTask)
      .then(() => {
        router.push('/');
        newTask.title = '';
        newTask.description = '';
        newTask.due_date = '';
      })
      .catch(error => console.error('Error adding task:', error));
  }
}

export function fetchTasks(filter, tasks, displayedTasks, chunkSize) {
  let endpoint = '/api/tasks';
  if (filter === 'completed') {
    endpoint = '/api/tasks?status=completed';
  } else if (filter === 'incomplete') {
    endpoint = '/api/tasks?status=incomplete';
  }

  return axios.get(endpoint)
    .then(response => {
      tasks.value = response.data;
      displayedTasks.value = tasks.value.slice(0, chunkSize);
    })
    .catch(error => console.error('Error fetching tasks:', error));
}

export function markTaskAsCompleted(id, fetchTasksCallback) {
  return axios.patch(`/api/tasks/${id}`, { completed: true })
    .then(() => fetchTasksCallback())
    .catch(error => console.error('Error marking task as completed:', error));
}

export function deleteTask(id, fetchTasksCallback) {
  return axios.delete(`/api/tasks/${id}`)
    .then(() => fetchTasksCallback())
    .catch(error => console.error('Error deleting task:', error));
}

export function loadMoreTasks(tasks, displayedTasks, chunkSize) {
  const nextChunk = tasks.value.slice(displayedTasks.value.length, displayedTasks.value.length + chunkSize);
  displayedTasks.value = displayedTasks.value.concat(nextChunk);
}

export function filterTasks(type, fetchTasksCallback) {
  return fetchTasksCallback(type);
}
