const itemList = document.querySelector(".todo__items");
const input = document.querySelector(".inputItem");
const todo = new ToDo();
const removeItems = () => {
  const items = document.querySelectorAll(".todo__item");
  items.forEach((item) => {
    item.remove();
  });
};
const key = "todo";
const getLocalStorageItems = (key) => {
  return JSON.parse(window.localStorage.getItem(key));
};
const setLocalStorageItems = (key, value) => {
  window.localStorage.setItem(key, JSON.stringify(value));
};
function emptyInput() {
  input.value = "";
}
function addItem() {
  const inputValue = input.value;
  if (inputValue == "") {
    alert("add item value");
    return;
  }
  todo.addTodo(inputValue);
  setLocalStorageItems(key, todo.getToDos());
  renderList();
  emptyInput();
}
const renderList = () => {
  removeItems();
  todo.getToDos().forEach((item) => {
    const list = document.createElement("li");
    list.classList.add("todo__item");
    const input = document.createElement("input");
    input.setAttribute("disabled", "");
    input.type = "text";
    input.setAttribute("id", `input_` + item.id);
    input.setAttribute("onkeyUp", "onInputEvent(event)");
    const span = document.createElement("span");
    span.innerHTML = "X";
    span.classList.add("CrossIcon");
    span.setAttribute("id", item.id);
    input.value = item.value;
    list.appendChild(input);
    list.appendChild(span);
    itemList.appendChild(list);
  });
};
function onInputEvent(e) {
  if (e.key !== "Enter") return;
  todo.updateToDo(parseInt(e.target.id.slice(6)), e.target.value);
  setLocalStorageItems(key, todo.getToDos());
  renderList();
}
const removeItem = (e) => {
  todo.deleteToDo(parseInt(e.target.id));
  setLocalStorageItems(key, todo.getToDos());
  renderList();
};

const updateTodoItem = (e) => {
  const id = e.target.id;
  if (!id) return;
  const inputItem = document.querySelector("#" + id);
  inputItem.removeAttribute("disabled");
  inputItem.focus();
};
(() => {
  if (getLocalStorageItems(key)) {
    todo.setToDo(getLocalStorageItems(key));
    renderList();
  }
})();
