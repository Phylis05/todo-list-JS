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
        <button class = 'view-btn float-right' data-toggle="modal" data-index = '${i}' data-target="#projectModal">View</button>
        <button class = 'edit-btn float-right' data-toggle="modal" data-index = '${i}'>Edit</button></p>
      </div>
      `;
    }
  }
  return todoList;
};

const viewTodo = (event, todos) => {
  console.log('hello');
  console.log(event.target.dataset);
  const { index } = event.target.dataset;
  const title = document.querySelector('#title-name');
  const description = document.querySelector('#description-text');
  const dateDue = document.querySelector('#date-due');
  const priorityLevel = document.querySelector('#priority-level');
  title.value = `${todos[index].title}`;
  description.innerHTML = `${todos[index].description}`;
  dateDue.innerHTML = `${todos[index].dueDate}`;
  priorityLevel.value = `${todos[index].priority}`;

  // const { index } = event.target.dataset;
  // console.log(index);
  // return `
  // <div class="modal fade" id="projectModal" tabindex="-1" role="dialog" aria-labelledby="projectModalLabel" aria-hidden="true">
  //         <div class="modal-dialog" role="document">
  //           <div class="modal-content">
  //             <div class="modal-header">
  //               <h5 class="modal-title" id="projectModalLabel">New message</h5>
  //               <button type="button" class="close" data-dismiss="modal" aria-label="Close">
  //                 <span aria-hidden="true">&times;</span>
  //               </button>
  //             </div>
  //             <div class="modal-body">
  //               <form>
  //                 <div class="form-group">
  //                   <label for="title-name" class="col-form-label">Title:</label>
  //                   <span>${todos[index].title}</span>
  //                 </div>
  //                 <div class="form-group">
  //                   <label for="description-text" class="col-form-label">Description:</label>
  //                   <span>${todos[index].description}</span>
  //                 </div> <div class="form-group">
  //                   <label for="date-due" class="col-form-label">Due Date:</label>
  //                   <span>${todos[index].dueDate}</span>
  //                 </div>
  //                 <div class="form-group">
  //                   <label for="priority-level" class="col-form-label">Priority:</label>
  //                   <select class="form-control" id="priority-level">
  //                     <option>Low</option>
  //                     <option>Medium</option>
  //                     <option>High</option>
  //                   </select>
  //                 </div>
  //               </form>
  //             </div>
  //             <div class="modal-footer">
  //               <button type="button" class="btn btn-secondary" id="close-btn" data-dismiss="modal">Close</button>
  //               <button type="button" class="btn btn-primary" id="save-btn">Save</button>
  //             </div>
  //           </div>
  //         </div>
  //       </div>`;
};

const deleteTodo = (event, todos) => {
  const { index } = event.target.dataset;
  todos.splice(index, 1);
  // eslint-disable-next-line no-use-before-define
  displayProject(projects);
};

export {
  displayTodos, deleteTodo, todos, createToDo, viewTodo
};
