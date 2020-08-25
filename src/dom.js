// eslint-disable-next-line import/no-cycle
import { deleteTodo, viewTodo, todos } from './components/todo';

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


const closeOneModal = (modalId) => {
  const modal = document.getElementById(modalId);
  modal.classList.remove('show');
  modal.setAttribute('aria-hidden', 'true');
  modal.setAttribute('style', 'display: none');
  const modalBackdrops = document.getElementsByClassName('modal-backdrop');
  document.body.removeChild(modalBackdrops[0]);
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
    // eslint-disable-next-line no-use-before-define
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

// const viewBtn = document.querySelectorAll('.view-btn');

// viewBtn.forEach((btn) => {
//   btn.removeEventListener('click', (event) => viewTodo(event, todos));
//   btn.addEventListener('click', (event) => viewTodo(event, todos));
// }

export {
  projectName,
  projectForm,
  projectsDiv,
  dropdown,
  toDoForm,
  title,
  description,
  select,
  dueDate,
  priority,
  saveBtns,
  stat,
  closeOneModal,
  preventDefault,
  dataReset,
  priorityLevel,
  modalStatus,
  dateDue,
  descriptionText,
  titleName,
  deleteEventListener,
  viewEventListener,
};
