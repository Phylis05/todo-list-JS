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

const updateProjectList = (projects) => {
  dropdown.innerHTML = projects.map((project, index) => `<option
  value="${index}">${project}</option>
  `).join('');
};

updateProjectList(projects);


const displayProject = (projects) => {
  projectsDiv.innerHTML = projects.map((name, index) => `<div class="card mb-2">
            <div class="card-body" data-index="${index}">
               <h5 class="card-title">${name}</h5>
               ${displayTodos(todos, index)}
              <a href="#" class="btn btn-success float-right">Add to do</a>
            </div>
          </div>`).join('');
};

const displayTodos = (todos, projectIndex) => {
  // for (let i = 0; i < todos.length; i += 1) {
  //   if (todos[i].projectId === projectIndex) {
  //     return `<p>${todos[i].title}</p>
  //     <p>${todos[i].dueDate}</p>`;
  //   }
  // }
  return 'hello';
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
};

projectForm.addEventListener('submit', createProject);
toDoForm.addEventListener('submit', createToDo);
