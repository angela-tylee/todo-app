
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

const listItems = document.querySelectorAll('.list-item');
const leftItems = document.querySelectorAll('#item-left');
let countLeft = 0;

listItems.forEach(() => {
  countLeft++;
})

console.log(countLeft);
leftItems.textContent = countLeft;

console.log(leftItems.textContent);



// drag n drop


// clear completed

// filter category

// switch desktop / mobile filter