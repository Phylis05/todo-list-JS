const todoItem = (title, description, dueDate, priority, projectId, status = 0) => ({
  title,
  description,
  dueDate,
  priority,
  projectId,
  status,
});
export default todoItem;
