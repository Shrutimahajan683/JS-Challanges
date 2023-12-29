class ToDo {
  constructor() {
    this.todo = [];
  }
  addTodo(value) {
    this.todo.push({ id: parseInt(Math.random() * 1000), value });
  }
  updateToDo(id, value) {
    this.todo = this.todo.map((item) => {
      if (item.id === id) {
        return { id, value };
      }
      return item;
    });
  }
  deleteToDo(id) {
    this.todo = this.todo.filter((item) => item.id !== id);
  }
  isEmpty() {
    return this.todo.length === 0;
  }
  getToDos() {
    return this.todo;
  }
  setToDo(todo) {
    this.todo = todo;
  }
}
