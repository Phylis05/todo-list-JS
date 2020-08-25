/* eslint-disable import/no-cycle */
import {
  title,
  description,
  select,
  dueDate,
  priority,
  stat,
  closeOneModal,
  preventDefault,
  dataReset,
  priorityLevel,
  modalStatus,
  dateDue,
  descriptionText,
  titleName,
} from '../dom';
import TodoItem from '../classes/todo-item';
import { projects, displayProject } from './project';
import '../style.css';

const todos = JSON.parse(localStorage.getItem('todos')) || [];

const createToDo = (event) => {
  preventDefault(event);
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
  dataReset(event);
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
  titleName.value = `${todos[index].title}`;
  descriptionText.innerHTML = `${todos[index].description}`;
  dateDue.innerHTML = `${todos[index].dueDate}`;
  priorityLevel.value = `${todos[index].priority}`;
  const saveBtn = document.querySelectorAll('a')[0];
  saveBtn.dataset.todoIndex = index;
};

const saveTodo = (event, todos) => {
  const { todoIndex } = event.target.dataset;
  const titleValue = titleName.value;
  const descriptionValue = descriptionText.value;
  const dateDueValue = dateDue.value;
  const priorityLevelValue = priorityLevel.value;
  const modalStatusValue = modalStatus.value;
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
