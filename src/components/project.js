import { projectName, projectsDiv, dropdown } from '../dom';
import Project from '../classes/project';
// eslint-disable-next-line import/no-cycle
import { displayTodos, deleteTodo, todos } from './todo';

const projects = JSON.parse(localStorage.getItem('projects')) || [];

const createProject = (event) => {
  event.preventDefault();

  const newProject = new Project(projectName.value);
  if (projects.includes(newProject.name) !== true) {
    projects.push(newProject.name);
    localStorage.setItem('projects', JSON.stringify(projects));
  }
  // eslint-disable-next-line no-use-before-define
  displayProject(projects);
  // eslint-disable-next-line no-use-before-define
  updateProjectList(projects);
  event.target.reset();
};

const updateProjectList = (projects) => {
  dropdown.innerHTML = projects.map((project, index) => `<option
  value="${index}">${project}</option>
  `).join('');
};

const displayProject = (projects) => {
  projectsDiv.innerHTML = projects.map((name, index) => `<div class="card mb-2">
            <div class="card-body" data-index="${index}">
               <h5 class="card-title">${name}</h5>
               ${displayTodos(todos, index)}
               
            </div>
          </div>`).join('');
  const deleteBtns = document.querySelectorAll('.delete-btn');
  deleteBtns.forEach((button) => {
    // eslint-disable-next-line no-use-before-define
    button.removeEventListener('click', (event) => deleteTodo(event, todos));
    button.addEventListener('click', (event) => deleteTodo(event, todos));
  });
};

export {
  projects, updateProjectList, createProject, displayProject,
};