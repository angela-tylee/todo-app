// submit task

taskForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const newTaskText = taskInput.value.trim();
  if (newTaskText === '') return;

  const newTask = { text: newTaskText, completed: false };
  addTask(newTask);
  taskInput.value = '';

  updateItemCount();
  saveTasksToLocalStorage();
});


// delete or check task
taskList.addEventListener('click', function (e) {
  if (e.target.classList.contains('delete-btn')) {
    e.target.closest('.list-item').remove();
    updateItemCount();
    saveTasksToLocalStorage();
  } else if (e.target.type === 'checkbox') {
    const taskItem = e.target.closest('.list-item');
    const taskIndex = Array.from(taskList.children).indexOf(taskItem);
    toggleTaskStatus(taskIndex);
    saveTasksToLocalStorage();
  }
});

// add task
function addTask(task) {
  const newTask = document.createElement('div');
  newTask.classList.add('list-item');

  newTask.innerHTML = `
    <div class="input-container">
      <input type="checkbox" ${task.completed ? 'checked' : ''}>
      <p>${task.text}</p>
    </div>
    <div class="delete-btn-container"><img class="delete-btn" src="./images/icon-cross.svg" alt=""></div>
  `;

  taskList.insertBefore(newTask, taskList.querySelector('.list-total'));
}

// count task
function updateItemCount() {
  const totalItems = taskList.querySelectorAll('.list-item').length;
  itemLeft.textContent = totalItems;
}

function saveTasksToLocalStorage() {
  const tasks = [];
  taskList.querySelectorAll('.list-item').forEach(item => {
    const taskText = item.querySelector('p').textContent;
    const taskCompleted = item.querySelector('input[type="checkbox"]').checked;
    tasks.push({ text: taskText, completed: taskCompleted });
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasksFromLocalStorage() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach(task => {
    addTask(task);
  });
  updateItemCount();
}

// check task
function toggleTaskStatus(index) {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks[index].completed = !tasks[index].completed;
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Initial load of tasks from localStorage
loadTasksFromLocalStorage();