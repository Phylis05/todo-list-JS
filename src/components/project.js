/* eslint-disable no-use-before-define */
/* eslint-disable import/no-cycle */
import {
  projectName,
  projectsDiv,
  dropdown,
  preventDefault,
  dataReset,
  deleteEventListener,
  viewEventListener,
} from '../dom';
import Project from '../classes/project';
import { displayTodos, todos } from './todo';

const projects = JSON.parse(localStorage.getItem('projects')) || [];

const createProject = (event) => {
  preventDefault(event);

  const newProject = new Project(projectName.value);
  if (projects.includes(newProject.name) !== true) {
    projects.push(newProject.name);
    localStorage.setItem('projects', JSON.stringify(projects));
  }
  displayProject(projects);
  updateProjectList(projects);
  dataReset(event);
};

const updateProjectList = (projects) => {
  for (let index = 0; index < projects.length; index += 1) {
    const project = projects[index];
    const option = document.createElement('option');
    option.setAttribute('value', index);
    option.innerHTML = project;
    dropdown.appendChild(option);
  }
};

const displayProject = (projects) => {
  projectsDiv.innerHTML = projects.map((name, index) => `<div class="card mb-2">
            <div class="card-body" data-index="${index}">
               <h5 class="card-title">${name}</h5>
               ${displayTodos(todos, index)}

            </div>
          </div>`).join('');
  deleteEventListener();
  viewEventListener();
};

export {
  projects, updateProjectList, createProject, displayProject,
};
