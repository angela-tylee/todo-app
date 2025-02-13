# Frontend Mentor - Todo app solution

This is a solution to the [Todo app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/todo-app-Su1_KokOW). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [Frontend Mentor - Todo app solution](#frontend-mentor---todo-app-solution)
  - [Table of contents](#table-of-contents)
  - [Overview](#overview)
    - [The challenge](#the-challenge)
    - [Screenshot](#screenshot)
    - [Links](#links)
  - [My process](#my-process)
    - [Built with](#built-with)
    - [What I learned](#what-i-learned)
    - [Continued development](#continued-development)
    - [Useful resources](#useful-resources)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- Add new todos to the list
- Mark todos as complete
- Delete todos from the list
- Filter by all/active/complete todos
- Clear all completed todos
- Toggle light and dark mode
- **Bonus**: Drag and drop to reorder items on the list

### Screenshot

<img width="1411" alt="image" src="https://github.com/angela-tylee/todo-app/assets/145020731/90412e27-5472-4702-859d-0c6794db872d">
<img width="1402" alt="image" src="https://github.com/angela-tylee/todo-app/assets/145020731/367f50b4-b178-4587-967f-55e95d48678b">

<img width="366" alt="image" src="https://github.com/angela-tylee/todo-app/assets/145020731/0edc4c43-c2f5-4603-8849-f242107095f8">
<img width="364" alt="image" src="https://github.com/angela-tylee/todo-app/assets/145020731/a7f345a3-8ebe-4ecc-bd71-aaf1becf9242">


### Links

- Solution URL: https://github.com/angela-tylee/todo-app
- Live Site URL: https://angela-tylee.github.io/todo-app/

## My process

### Built with

- HTML / CSS / JavaScript

### What I learned


- Light / Dark Theme Switcher
	```js
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
	```
- Customize `<input type="checkbox">`
	```css
	input[type='checkbox'] {
		appearance: none;
		width: 1.4rem;
		height: 1.4rem;
		border-radius: 50%;
	}
	
	input[type='checkbox']:checked {
		content: url('./images/icon-check.svg');
		padding: 7px;
		background: var(--check-background);
	}
	
	input[type='checkbox']:checked + p {
		text-decoration: line-through;
	}
	```
- Add task
- Store tasks to localStorage / Load tasks from localStorage
	- `JSON.stryingify()` / `JSON.parse()`
	- `localStorage.setItem()` / `localStorage.getItem()`
	```js
	function saveTasks() {
	  const tasks = [];
	  taskList.querySelectorAll('#list-item').forEach(item => {
	  const taskText = item.querySelector('p').textContent;
	  const taskCompleted = item.querySelector('input[type="checkbox"]').checked;
		
	  tasks.push({ text: taskText, completed: taskCompleted });
	  });
		
	  localStorage.setItem('tasks', JSON.stringify(tasks));
	  }
	}
	```
	
	```js
	function loadTasks() {
	  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
	  tasks.forEach(task => {
	  addTask(task.text, task.completed);
	});
	```
- Delete task
- Toggle task
- Count left items
- Filter by Category
	```js
	function setFilter(filter) {
	  resetStyle();
	  taskList.querySelectorAll('#list-item').forEach(item => {
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
	
	setFilter('all');   // Initialize with all filter
	```
- Clear Completed Tasks
- Drag n Drop
	```js
	function allowDrop(e) {
	  e.preventDefault();
	}
	
	function dragStart(e) {
	  draggedItem = this;
	  setTimeout(() => {
	  	this.classList.add('dragging');
		this.style.display = 'none'; // Hide the dragged item
		}, 0);
	}
	  
	function dragEnd(e) {
	  this.classList.remove('dragging');
	  this.style.display = 'flex'; // Show the dragged item
	  placeholder.remove();
	  draggedItem = null;
	}
	  
	function dragOver(e) {
	  e.preventDefault();
	}
	
	function dragEnter(e) {
	  e.preventDefault();
	  if (this !== draggedItem) {
		const rect = this.getBoundingClientRect();
		const next = (e.clientY - rect.top) / (rect.bottom - rect.top) > 0.5;
		taskList.insertBefore(placeholder, this.nextSibling);
		taskList.insertBefore(placeholder, next && this.nextSibling || this);
	  }
	}
	
	function dragLeave(e) {
	  e.preventDefault();
	}
	
	function drop(e) {
	  e.preventDefault();
	  if (draggedItem) {
		taskList.insertBefore(draggedItem, placeholder);
		placeholder.remove();
	  }
	}
	```


### Continued development

- extend input field width
- add `.list-item p` text wrap
- identify duplicated tasks
- undo delete task
- implement SASS for CSS nesting (native CSS nesting is not fully supported by browsers)

### Useful resources

[W3School - Drag and Drop API](https://www.w3schools.com/html/html5_draganddrop.asp)
