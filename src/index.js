import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import './style.css';
import Project from './classes/project';
import { projectFormListener, todoFormListener, saveBtnsListener } from './dom';
import {
  projects, updateProjectList, createProject, displayProject,
} from './components/project';
import { createToDo, todos } from './components/todo';


if (projects.includes('Default') !== true) {
  const defaultProject = new Project('Default');
  projects.push(defaultProject.name);
  localStorage.setItem('projects', JSON.stringify(projects));
}

updateProjectList(projects);

displayProject(projects);

projectFormListener(createProject);
todoFormListener(createToDo);
saveBtnsListener(todos);
