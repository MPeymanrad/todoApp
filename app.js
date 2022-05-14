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
function loadTodos() {
  for (let i = 0; i < localStorage.length; i++) {
    let todo =JSON.parse(localStorage.getItem(String(i + 1))) 
    createTodoElem(todo.title,i + 1)
  }
}

function editTodo(e) {
  //get data from local storage...
  let todoId = e.target.parentElement.parentElement.getAttribute('data-id')
  let todoToEdit =JSON.parse(localStorage.getItem(todoId)) 
  let todoName = todoToEdit.title
  let todoDes = todoToEdit.des
  todoTitleInput.value = todoName
  todoDescriptionInput.value = todoDes
  showModal();
}
function createTodoElem(title,id) {
  const todo = $.createElement("div");
  todo.classList.add("todo");
  todo.setAttribute('data-id',id)
  const todoInners = `<h3 class="todo_title">${title}</h3><div class="todo_actions"><span class="do_todo material-symbols-outlined" title="Complete Todo">done</span><span class="edit_todo material-symbols-outlined" title="Edit Todo">edit</span><span class=" delete_todo material-symbols-outlined" title="Delete Todo">delete</span></div>`;
  todo.innerHTML = todoInners;
  todosContainer.append(todo);
  return todo;
}
function completeTodo(e) {
  let todoId = e.target.parentElement.parentElement.getAttribute('data-id')
  e.target.parentElement.parentElement.style.textDecorationLine =
    "line-through";

}

function deleteTodo(e) {
  let todoId = e.target.parentElement.parentElement.getAttribute('data-id')
  e.target.parentElement.parentElement.remove();
  localStorage.removeItem(todoId)
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
  const newNoteObj = {
    title:todoTitleInput.value,
    des:todoDescriptionInput.value,
    isDone:false,
  }
  createTodoElem(todoTitleInput.value,localStorage.length + 1);
  localStorage.setItem(localStorage.length + 1,JSON.stringify(newNoteObj))
  setEventsForTodoActions();
  hideModal();
}
window.addEventListener('load',loadTodos)
window.addEventListener('load',setEventsForTodoActions)
addBtn.addEventListener("click", showModal);
todoSubmitBtn.addEventListener("click", function (e) {
  e.preventDefault();
  addTodo();
});
modalCloseBtn.addEventListener("click", hideModal);
