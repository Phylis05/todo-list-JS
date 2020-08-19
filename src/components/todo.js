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
        <button class = 'delete-btn float-right' data-index = '${i}'>Delete</button>
      </div>`;
    }
  }
  return todoList;
};

const deleteTodo = (event, todos) => {
  const { index } = event.target.dataset;
  todos.splice(index, 1);
  // eslint-disable-next-line no-use-before-define
  displayProject(projects);
};

export {
  displayTodos, deleteTodo, todos, createToDo,
};
