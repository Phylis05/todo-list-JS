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

const saveBtns = document.querySelectorAll('a');

const closeOneModal = (modalId) => {
  const modal = document.getElementById(modalId);
  modal.classList.remove('show');
  modal.setAttribute('aria-hidden', 'true');
  modal.setAttribute('style', 'display: none');
  const modalBackdrops = document.getElementsByClassName('modal-backdrop');
  document.body.removeChild(modalBackdrops[0]);
};

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
  closeOneModal,
};
