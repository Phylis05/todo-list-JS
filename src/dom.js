const projectName = document.querySelector('#name');
const projectForm = document.querySelector('#project-form');
const projectsDiv = document.querySelector('.projects');
const dropdown = document.querySelector('#select');
const toDoForm = document.querySelector('#todo-form');

const title = document.querySelector('#title');
const description = document.querySelector('#description');
const select = document.querySelector('#select');
const dueDate = document.querySelector('#due-date');
const priority = document.querySelector('#priority');

const viewBtn = document.querySelectorAll('.view-btn');
const editBtn = document.querySelectorAll('.edit-btn');

export {
  projectName, projectForm, projectsDiv, dropdown, toDoForm, title,
  description, select, dueDate, priority, viewBtn, editBtn,
};