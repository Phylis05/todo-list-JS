/* eslint-disable no-use-before-define */
/* eslint-disable import/no-cycle */
import {
  projectName,
  preventDefault,
  dataReset,
  createProjectDropdown,
  displayProject,
} from '../dom';
import project from '../classes/project';

const projects = JSON.parse(localStorage.getItem('projects')) || [];

const createProject = (event) => {
  preventDefault(event);

  const newProject = project(projectName.value);
  if (!projects.includes(newProject.name)) {
    projects.push(newProject.name);
    localStorage.setItem('projects', JSON.stringify(projects));
  }
  displayProject(projects);
  updateProjectList(projects);
  dataReset(event);
};

const updateProjectList = (projects) => {
  createProjectDropdown(projects);
};

export {
  projects, updateProjectList, createProject, displayProject,
};
