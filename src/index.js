import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import Project from './classes/project';

const projects = [];
const defaultProject = new Project('Default');
projects.push(defaultProject);
console.log(projects);

const projectName = document.querySelector('#name');
const projectBtn = document.querySelector('#project-btn');
const projectsDiv = document.querySelector('.projects');

const createProject = (event) => {
  // console.log(event);
  // console.log(projectName.value);
  event.preventDefault();
  const newProject = new Project(projectName.value);
  projects.push(newProject);
  console.log(projects);
  displayProject(newProject.name);
};



const displayProject = (name) => {
  const div = `<div class="card" style="width: 18rem;">
            <div class="card-body">
              <h5 class="card-title">${name}</h5>
              <a href="#" class="btn btn-primary">Add to do</a>
            </div>
          </div>`;
  projectsDiv.innerHTML += div;
};

projectBtn.addEventListener('click', createProject);
