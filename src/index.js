import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import Project from './classes/project';
import TodoItem from './classes/todo-item';

const projects = JSON.parse(localStorage.getItem('projects')) || [];
const todos = JSON.parse(localStorage.getItem('todos')) || [];

if (projects.includes('Default') !== true) {
  const defaultProject = new Project('Default');
  // console.log(`default: ${defaultProject.name}`);
  projects.push(defaultProject.name);
  localStorage.setItem('projects', JSON.stringify(projects));
}

// console.log(projects);

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

// const deleteBtns = document.querySelectorAll('.delete-btn');

const updateProjectList = (projects) => {
  dropdown.innerHTML = projects.map((project, index) => `<option
  value="${index}">${project}</option>
  `).join('');
};

updateProjectList(projects);

const deleteTodo = (event, todos) => {
  const { index } = event.target.dataset;
  console.log(index);
  todos.splice(index, 1);
  // localStorage.removeItem(todos[index]);
  // eslint-disable-next-line no-use-before-define
  displayProject(projects);
};

const displayProject = (projects) => {
  projectsDiv.innerHTML = projects.map((name, index) => `<div class="card mb-2">
            <div class="card-body" data-index="${index}">
               <h5 class="card-title">${name}</h5>
               ${displayTodos(todos, index)}
               
            </div>
          </div>`).join('');
  const deleteBtns = document.querySelectorAll('.delete-btn');
  console.log(deleteBtns);
  deleteBtns.forEach((button) => {
    // eslint-disable-next-line no-use-before-define
    button.removeEventListener('click', (event) => deleteTodo(event, todos));
    button.addEventListener('click', (event) => deleteTodo(event, todos));
  });
};

const colorPriority = (todo) => {
  if (todo.priority === 'High') {
    return 'red';
  } if (todo.priority === 'Medium') {
    return 'yellow';
  }
  return 'green';
};

const displayTodos = (todos, projectIndex) => {
  let todoList = '';
  for (let i = 0; i < todos.length; i += 1) {
    // eslint-disable-next-line radix
    if (parseInt(todos[i].projectId) === projectIndex) {
      todoList += `<div style='background: ${colorPriority(todos[i])}; margin: 2em; padding: 1em; color: #fff;'>
        <span>${todos[i].title}</span>
        <span>${todos[i].dueDate}</span>
        <button class = 'delete-btn' data-index = '${i}'>Delete</button>
      </div>`;
    }
  }
  return todoList;
  
};

displayProject(projects);

const createProject = (event) => {
  event.preventDefault();

  const newProject = new Project(projectName.value);
  // console.log(`name: ${newProject.name}`);
  if (projects.includes(newProject.name) !== true) {
    projects.push(newProject.name);
    localStorage.setItem('projects', JSON.stringify(projects));
  }
  // console.log(projects);
  displayProject(projects);
  updateProjectList(projects);
  // this.reset();
};

const createToDo = (event) => {
  event.preventDefault();
  // console.log(select.value);
  // this.reset();
  const newTodo = new TodoItem(title.value, description.value, dueDate.value, priority.value, select.value);
  // console.log(newTodo);
  todos.push(newTodo);
  localStorage.setItem('todos', JSON.stringify(todos));
  displayProject(projects);
};

projectForm.addEventListener('submit', createProject);
toDoForm.addEventListener('submit', createToDo);
// deleteBtn.addEventListener('click', (event) => deleteTodo(event, todoItem));
