import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import './style.css';
import Project from './classes/project';
import { projectForm, toDoForm, saveBtn } from './dom';
import {
  projects, updateProjectList, createProject, displayProject,
} from './components/project';
import { createToDo, saveTodo } from './components/todo';


if (projects.includes('Default') !== true) {
  const defaultProject = new Project('Default');
  projects.push(defaultProject.name);
  localStorage.setItem('projects', JSON.stringify(projects));
}

updateProjectList(projects);

displayProject(projects);

projectForm.addEventListener('submit', createProject);
toDoForm.addEventListener('submit', createToDo);
saveBtn.addEventListener('click', (event) => saveTodo(event, todos));
