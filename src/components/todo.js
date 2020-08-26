/* eslint-disable import/no-cycle */
import {
  title,
  description,
  select,
  dueDate,
  priority,
  stat,
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
  todos[todoIndex].dueDate = dateDueValue;
  todos[todoIndex].status = modalStatusValue;
  todos[todoIndex].priority = priorityLevelValue;
  localStorage.setItem('todos', JSON.stringify(todos));
  displayProject(projects);
};

const deleteTodo = (event, todos) => {
  const { index } = event.target.dataset;
  todos.splice(index, 1);
  localStorage.setItem('todos', JSON.stringify(todos));
  displayProject(projects);
};

export {
  deleteTodo, todos, createToDo, viewTodo, saveTodo,
};
