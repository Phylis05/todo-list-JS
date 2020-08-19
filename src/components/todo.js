import {
  title, description, select, dueDate, priority,
} from '../dom';
import TodoItem from '../classes/todo-item';
// eslint-disable-next-line import/no-cycle
import { projects, displayProject } from './project';

const todos = JSON.parse(localStorage.getItem('todos')) || [];

const createToDo = (event) => {
  event.preventDefault();
  const newTodo = new TodoItem(title.value, description.value,
    dueDate.value, priority.value, select.value);
  todos.push(newTodo);
  localStorage.setItem('todos', JSON.stringify(todos));
  displayProject(projects);
  event.target.reset();
};

const colorPriority = (todo) => {
  if (todo.priority === 'High') {
    return 'red';
  } if (todo.priority === 'Medium') {
    return 'yellow';
  }
  return 'green';
};

const displayTodos = (todos, projectIndex) => {
  let todoList = '';
  for (let i = 0; i < todos.length; i += 1) {
    // eslint-disable-next-line radix
    if (parseInt(todos[i].projectId) === projectIndex) {
      // eslint-disable-next-line no-use-before-define
      todoList += `<div style='background: ${colorPriority(todos[i])}; margin: 2em; padding: 1em; color: #fff;'>
        <span>${todos[i].title}</span>
        <span>${todos[i].dueDate}</span>
        <p><button class = 'delete-btn float-right'  data-index = '${i}'>Delete</button>
        <button class = 'view-btn float-right' data-toggle="modal" data-index = '${i}' data-target="#projectModal">View/Edit</button>
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

};

const saveTodo = (event, todos) => {
  const { index } = event.target.dataset;
  const titleValue = document.querySelector('#title-name').value;
  const descriptionValue = document.querySelector('#description-text').value;
  const dateDueValue = document.querySelector('#date-due').value;
  const priorityLevelValue = document.querySelector('#priority-level').value;
  todos[index].title = titleValue;
  todos[index].description = descriptionValue;
  todos[index].dateDue = dateDueValue;
  todos[index].priority = priorityLevelValue;

  console.log(todos);
  localStorage.setItem('todos', JSON.stringify(todos));
};

const deleteTodo = (event, todos) => {
  const { index } = event.target.dataset;
  todos.splice(index, 1);
  // eslint-disable-next-line no-use-before-define
  displayProject(projects);
};

export {
  displayTodos, deleteTodo, todos, createToDo, viewTodo, saveTodo,
};
