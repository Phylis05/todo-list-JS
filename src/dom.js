/* eslint-disable no-use-before-define */
/* eslint-disable import/no-cycle */
import {
  deleteTodo, viewTodo, todos, saveTodo,
} from './components/todo';
import { projects } from './components/project';

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
const stat = document.querySelector('#status');

const saveBtns = document.querySelectorAll('a');

const titleName = document.querySelector('#title-name');
const descriptionText = document.querySelector('#description-text');
const dateDue = document.querySelector('#date-due');
const modalStatus = document.querySelector('#modal-status');
const priorityLevel = document.querySelector('#priority-level');

const colorPriority = (todo) => {
  if (todo.priority === 'High') {
    return '#bf0000';
  }
  if (todo.priority === 'Medium') {
    return '#e0cb0f';
  }
  return '#8adb00';
};

const preventDefault = (event) => {
  event.preventDefault();
};

const dataReset = (event) => {
  event.target.reset();
};

const deleteEventListener = () => {
  const deleteBtns = document.querySelectorAll('.delete-btn');
  deleteBtns.forEach((button) => {
    button.removeEventListener('click', (event) => deleteTodo(event, todos));
    button.addEventListener('click', (event) => deleteTodo(event, todos));
  });
};

const viewEventListener = () => {
  const viewBtn = document.querySelectorAll('.view-btn');
  viewBtn.forEach((btn) => {
    btn.removeEventListener('click', (event) => viewTodo(event, todos));
    btn.addEventListener('click', (event) => viewTodo(event, todos));
  });
};

const createProjectDropdown = () => {
  for (let index = 0; index < projects.length; index += 1) {
    const project = projects[index];
    const option = document.createElement('option');
    option.setAttribute('value', index);
    option.innerHTML = project;
    dropdown.appendChild(option);
  }
};

const displayProject = (projects) => {
  projectsDiv.innerHTML = '';

  for (let index = 0; index < projects.length; index += 1) {
    const projectDiv = createProjectDiv(projects, index);
    projectsDiv.appendChild(projectDiv);
  }

  deleteEventListener();
  viewEventListener();
};

const createProjectDiv = (projects, index) => {
  const project = projects[index];
  const projectDiv = document.createElement('div');
  projectDiv.setAttribute('class', 'card mb-2');

  const subDiv = document.createElement('div');
  subDiv.setAttribute('data-index', index);
  subDiv.setAttribute('class', 'card-body');

  const cardTitle = document.createElement('h5');
  cardTitle.setAttribute('class', 'card-title');
  cardTitle.innerHTML = project;

  subDiv.appendChild(cardTitle);
  subDiv.appendChild(displayTodos(todos, index));
  projectDiv.appendChild(subDiv);
  return projectDiv;
};

const displayTodos = (todos, projectIndex) => {
  const todoList = document.createElement('div');

  for (let i = 0; i < todos.length; i += 1) {
    // eslint-disable-next-line radix
    if (parseInt(todos[i].projectId) === projectIndex) {
      const todoDiv = document.createElement('div');
      todoDiv.setAttribute('class', 'todo-div');
      todoDiv.setAttribute('style', `background: ${colorPriority(todos[i])}`);

      const titleSpan = document.createElement('span');
      titleSpan.setAttribute(
        'class',
        `${todos[i].status === '1' ? 'complete' : ''}`,
      );
      titleSpan.innerHTML = todos[i].title;

      const dueDateSpan = document.createElement('span');
      dueDateSpan.setAttribute('class', 'float-right');
      dueDateSpan.innerHTML = todos[i].dueDate;

      const spanParagraph = document.createElement('p');
      const buttonParagraph = document.createElement('p');

      const deleteButton = document.createElement('button');
      deleteButton.setAttribute('class', 'delete-btn float-right m-2');
      deleteButton.setAttribute('data-index', i);
      deleteButton.innerHTML = 'Delete';

      const viewButton = document.createElement('button');
      viewButton.setAttribute('class', 'view-btn float-right m-2');
      viewButton.setAttribute('data-index', i);
      viewButton.setAttribute('data-toggle', 'modal');
      viewButton.setAttribute('data-target', '#projectModal');
      viewButton.innerHTML = 'View/Edit';

      buttonParagraph.appendChild(deleteButton);
      buttonParagraph.appendChild(viewButton);

      spanParagraph.appendChild(dueDateSpan);

      todoDiv.appendChild(titleSpan);
      todoDiv.appendChild(spanParagraph);
      todoDiv.appendChild(buttonParagraph);

      todoList.appendChild(todoDiv);
    }
  }

  return todoList;
};

const projectFormListener = (createProject) => {
  projectForm.addEventListener('submit', createProject);
};

const todoFormListener = (createToDo) => {
  toDoForm.addEventListener('submit', createToDo);
};

const saveBtnsListener = (todos) => {
  saveBtns.forEach((button) => {
    button.addEventListener('click', (event) => saveTodo(event, todos));
  });
};

export {
  projectName,
  projectFormListener,
  projectsDiv,
  todoFormListener,
  title,
  description,
  select,
  dueDate,
  priority,
  saveBtnsListener,
  stat,
  preventDefault,
  dataReset,
  priorityLevel,
  modalStatus,
  dateDue,
  descriptionText,
  titleName,
  deleteEventListener,
  viewEventListener,
  createProjectDropdown,
  displayProject,
  createProjectDiv,
};
