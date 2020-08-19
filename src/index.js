import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import Project from './classes/project';
import { projectForm, toDoForm } from './dom';
import {
  projects, updateProjectList, createProject, displayProject,
} from './components/project';
import { createToDo } from './components/todo';


if (projects.includes('Default') !== true) {
  const defaultProject = new Project('Default');
  projects.push(defaultProject.name);
  localStorage.setItem('projects', JSON.stringify(projects));
}

updateProjectList(projects);

displayProject(projects);

projectForm.addEventListener('submit', createProject);
toDoForm.addEventListener('submit', createToDo);
