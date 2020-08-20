import {
  title,
  description,
  select,
  dueDate,
  priority,
  stat,
  closeOneModal,
} from '../dom';
import TodoItem from '../classes/todo-item';
// eslint-disable-next-line import/no-cycle
import { projects, displayProject } from './project';
import '../style.css';

const todos = JSON.parse(localStorage.getItem('todos')) || [];

const createToDo = (event) => {
  event.preventDefault();
  const newTodo = new TodoItem(
    title.value,
    description.value,
    dueDate.value,
    priority.value,
    select.value,
    stat.value,
  );
  todos.push(newTodo);
  localStorage.setItem('todos', JSON.stringify(todos));
  displayProject(projects);
  event.target.reset();
};

const colorPriority = (todo) => {
  if (todo.priority === 'High') {
    return '#bf0000';
  } if (todo.priority === 'Medium') {
    return '#e0cb0f';
  }
  return '#8adb00';
};

const displayTodos = (todos, projectIndex) => {
  let todoList = '';
  for (let i = 0; i < todos.length; i += 1) {
    // eslint-disable-next-line radix
    if (parseInt(todos[i].projectId) === projectIndex) {
      // eslint-disable-next-line no-use-before-define
      todoList += `<div style='background: ${colorPriority(todos[i])};' class='todo-div'>
        <span class='${todos[i].status === '1' ? 'complete' : ''}'>${todos[i].title}</span>
        <p><span class='float-right'>${todos[i].dueDate}</span></p>
        <p>
          <button class='delete-btn float-right m-2'  data-index='${i}'>Delete</button>
          <button class='view-btn float-right m-2' data-toggle="modal" data-index='${i}' data-target="#projectModal">View/Edit</button>
        </p>
      </div>
      `;
    }
  }
  return todoList;
};

const viewTodo = (event, todos) => {
  const { index } = event.target.dataset;
  const title = document.querySelector('#title-name');
  const description = document.querySelector('#description-text');
  const dateDue = document.querySelector('#date-due');
  const priorityLevel = document.querySelector('#priority-level');
  title.value = `${todos[index].title}`;
  description.innerHTML = `${todos[index].description}`;
  dateDue.innerHTML = `${todos[index].dueDate}`;
  priorityLevel.value = `${todos[index].priority}`;
  const saveBtn = document.querySelectorAll('a')[0];
  saveBtn.dataset.todoIndex = index;
};

const saveTodo = (event, todos) => {
  const { todoIndex } = event.target.dataset;
  const titleValue = document.querySelector('#title-name').value;
  const descriptionValue = document.querySelector('#description-text').value;
  const dateDueValue = document.querySelector('#date-due').value;
  const priorityLevelValue = document.querySelector('#priority-level').value;
  const modalStatusValue = document.querySelector('#modal-status').value;
  todos[todoIndex].title = titleValue;
  todos[todoIndex].description = descriptionValue;
  todos[todoIndex].dateDue = dateDueValue;
  todos[todoIndex].status = modalStatusValue;
  todos[todoIndex].priority = priorityLevelValue;
  localStorage.setItem('todos', JSON.stringify(todos));
  displayProject(projects);
  closeOneModal('projectModal');
};

const deleteTodo = (event, todos) => {
  const { index } = event.target.dataset;
  todos.splice(index, 1);
  localStorage.setItem('todos', JSON.stringify(todos));
  displayProject(projects);
};

export {
  displayTodos, deleteTodo, todos, createToDo, viewTodo, saveTodo,
};
