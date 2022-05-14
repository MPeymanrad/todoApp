const $ = document;
const addBtn = $.querySelector(".add_btn");
const addModal = $.querySelector(".add_modal");
const addModalOverlay = $.querySelector(".overlay");
const todosContainer = $.querySelector(".todos_container");
//modal elements
const todoTitleInput = $.getElementById("todo_title_input");
const todoDescriptionInput = $.getElementById("todo_description_input");
const modalCloseBtn = $.querySelector(".close_btn");
const todoSubmitBtn = $.querySelector(".add_todo_btn");

function showModal() {
  addModal.style.top = "20%";
  addModalOverlay.style.display = "block";
}
function hideModal() {
  addModal.style.top = "-100%";
  addModalOverlay.style.display = "none";
}

function createTodoElem(title) {
  const todo = $.createElement("div");
  todo.classList.add("todo");
  const todoInners = `<h3 class="todo_title">${title}</h3><div class="todo_actions"><span class="do_todo material-symbols-outlined" title="Complete Todo">done</span><span class="edit_todo material-symbols-outlined" title="Edit Todo">edit</span><span class=" delete_todo material-symbols-outlined" title="Delete Todo">delete</span></div>`;
  todo.innerHTML = todoInners;
  todosContainer.append(todo);
}
function completeTodo(e) {
  e.target.parentElement.parentElement.style.textDecorationLine =
    "line-through";
}
function editTodo() {
  //get data from local storage...

  showModal();
}
function deleteTodo(e) {
  e.target.parentElement.parentElement.remove();
}
function setEventsForTodoActions() {
  const doTodoElems = $.querySelectorAll(".do_todo");
  const editTodoElems = $.querySelectorAll(".edit_todo");
  const delTodoElems = $.querySelectorAll(".delete_todo");
  doTodoElems.forEach(function (item) {
    item.addEventListener("click", completeTodo);
  });
  editTodoElems.forEach(function (item) {
    item.addEventListener("click", editTodo);
  });
  delTodoElems.forEach(function (item) {
    item.addEventListener("click", deleteTodo);
  });
}
function addTodo() {
  createTodoElem(todoTitleInput.value);
  setEventsForTodoActions();
  hideModal();
}

addBtn.addEventListener("click", showModal);
todoSubmitBtn.addEventListener("click", function (e) {
  e.preventDefault();
  addTodo();
});
modalCloseBtn.addEventListener("click", hideModal);
