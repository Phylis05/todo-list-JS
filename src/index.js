import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import Project from './classes/project';

const projects = JSON.parse(localStorage.getItem('projects')) || [];

if (projects.includes('Default') !== true) {
  const defaultProject = new Project('Default');
  console.log(`default: ${defaultProject.name}`);
  projects.push(defaultProject.name);
  localStorage.setItem('projects', JSON.stringify(projects));
}

console.log(projects);

const projectName = document.querySelector('#name');
const projectForm = document.querySelector('#project-form');
const projectsDiv = document.querySelector('.projects');
const dropdown = document.querySelector('#select');

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
              <a href="#" class="btn btn-success float-right">Add to do</a>
            </div>
          </div>`).join('');
};

displayProject(projects);

const createProject = (event) => {
  event.preventDefault();

  const newProject = new Project(projectName.value);
  console.log(`name: ${newProject.name}`);
  if (projects.includes(newProject.name) !== true) {
    projects.push(newProject.name);
    localStorage.setItem('projects', JSON.stringify(projects));
  }
  // console.log(projects);
  displayProject(projects);
  updateProjectList(projects);
  // this.reset();
};

projectForm.addEventListener('submit', createProject);
