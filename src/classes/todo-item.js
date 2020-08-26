export default class TodoItem {
  constructor(title, description, dueDate, priority, projectId, status = 0) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.projectId = projectId;
    this.status = status;
  }
}
