
// switch theme
const body = document.body;
const themeToggle = document.querySelector('#theme-toggle');
const currentTheme = localStorage.getItem('theme') || 'light';

body.classList.add(`${currentTheme}-theme`);

document.addEventListener('DOMContentLoaded',() => {
  if (currentTheme === "dark") {
    themeToggle.src = './images/icon-sun.svg';
  } else if (currentTheme === "light") {
    themeToggle.src = './images/icon-moon.svg';
  }
});

themeToggle.addEventListener('click', () => {
    if (document.body.classList.contains('light-theme')) {
        document.body.classList.replace('light-theme', 'dark-theme');
        themeToggle.src = './images/icon-sun.svg'
        localStorage.setItem('theme', 'dark');
    } else {
        document.body.classList.replace('dark-theme', 'light-theme');
        themeToggle.src = './images/icon-moon.svg'
        localStorage.setItem('theme', 'light');
    }
});


// count left items

const listItems = document.querySelectorAll('#list-item');
// const leftItems = document.querySelectorAll('#item-left');
// let countLeft = 0;

// listItems.forEach(() => {
//   countLeft++;
// })

// console.log(countLeft);
// leftItems.textContent = countLeft;

// console.log(leftItems.textContent);

// add task

const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.querySelector('#list-items');
const itemLeft = document.getElementById('item-left');

taskForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const newTaskText = taskInput.value.trim();
  if (newTaskText === '') return;
  
  addTask(newTaskText, false)
  taskInput.value = '';

  saveTasks();
  countItems();
})

function addTask(text, completed){
  taskList.innerHTML += `
  <div class="list-item" id="list-item">
    <div class="input-container">
      <input type="checkbox" ${completed ? 'checked' : ''} id="checkbox">
      <p>${text}</p>
    </div>
    <div class="delete-btn-container">
      <img class="delete-btn" id="delete-btn" src="./images/icon-cross.svg" alt="">
    </div>
  </div>
  `
}

function countItems() {
  itemLeft.textContent = taskList.querySelectorAll('#list-item').length;
}

function saveTasks() {
  const tasks = [];
  taskList.querySelectorAll('#list-item').forEach(item => {
    const taskText = item.querySelector('p').textContent;
    const taskCompleted = item.querySelector('input[type="checkbox"]').checked;
    tasks.push({ text: taskText, completed: taskCompleted });
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach(task => {
    addTask(task.text, task.completed);
  });
  countItems();
}

loadTasks();

// delete task

const deleteBtns = document.querySelectorAll('#delete-btn');

deleteBtns.forEach( btn => {
  btn.addEventListener('click', () => {
    btn.closest('#list-item').remove();
    saveTasks();
    countItems();
  })
})

// check task
const toggleChecks = document.querySelectorAll('#checkbox');

toggleChecks.forEach ( toggle => {
  toggle.addEventListener('click', () => {
  toggle.toggleAttribute('checked');
  saveTasks();
  countItems();
  })
})


// clear completed


// filter category

const allFilter = document.getElementById('filter-all');
const activeFilter = document.getElementById('filter-active');
const completedFilter = document.getElementById('filter-completed');

allFilter.addEventListener('click', function() {
  setFilter('all');
});

activeFilter.addEventListener('click', function() {
  setFilter('active');
});

completedFilter.addEventListener('click', function() {
  setFilter('completed');
});

function setFilter(filter) {
  listItems.forEach(item => {
    if (filter === 'all') {
      item.style.display = 'flex';
    } else if (filter === 'active') {
      if (item.querySelector('input[type="checkbox"]').checked) {
        item.style.display = 'none';
      } else {
        item.style.display = 'flex';
      }
    } else if (filter === 'completed') {
      if (item.querySelector('input[type="checkbox"]').checked) {
        item.style.display = 'flex';
      } else {
        item.style.display = 'none';
      }
    }
  });

  document.querySelectorAll('.filter ul li').forEach(li => {
    li.classList.remove('selected');
  });

  if (filter === 'all') {
    allFilter.classList.add('selected');
  } else if (filter === 'active') {
    activeFilter.classList.add('selected');
  } else if (filter === 'completed') {
    completedFilter.classList.add('selected');
  }
}

setFilter('all');   // Initialize with all filter

// switch desktop / mobile filter

// drag n drop