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

let isEditing = false;
let todoEditId;
let todoToEdit;
let isDone;
function showModal() {
  addModal.style.top = "20%";
  addModalOverlay.style.display = "block";
}
function hideModal() {
  addModal.style.top = "-100%";
  addModalOverlay.style.display = "none";
}
function clearInputs() {
  todoTitleInput.value = ''
  todoDescriptionInput.value = ''
}
function setTodoIds() {
  let todoList = JSON.parse(localStorage.getItem("todoList"));
  for (let i = 0; i < todoList.length; i++) {
    todoList[i].id = i;
    // createTodoElem(todoList[i].title, todoList[i].id);
  }
  localStorage.setItem("todoList", JSON.stringify(todoList));
}
function loadTodos() {
  if (!localStorage.getItem("todoList")) {
    localStorage.setItem("todoList", JSON.stringify([]));
  }
  let todoList = JSON.parse(localStorage.getItem("todoList"));
  for (let i = 0; i < todoList.length; i++) {
    todoList[i].id = i;
    let currentTodoElem = createTodoElem(todoList[i].title, todoList[i].id);
    if (todoList[i].isDone) {
      currentTodoElem.style.textDecorationLine = "line-through";
      currentTodoElem.firstChild.nextSibling.firstChild.innerHTML = "close";
    }
  }
  localStorage.setItem("todoList", JSON.stringify(todoList));
}
function goToTodoEditMode(e) {
  //get data from local storage...
  todoEditId = e.target.parentElement.parentElement.getAttribute("data-id");
  let todoList = JSON.parse(localStorage.getItem("todoList"));
  todoToEdit = todoList[todoEditId];
  let todoName = todoToEdit.title;
  let todoDes = todoToEdit.des;
  todoTitleInput.value = todoName;
  todoDescriptionInput.value = todoDes;
  isEditing = true;
  showModal();
}
function editTodo() {
  let todoList = JSON.parse(localStorage.getItem("todoList"));
  todoToEdit.title = todoTitleInput.value;
  todoToEdit.des = todoDescriptionInput.value;
  todoList[todoEditId] = todoToEdit;
  localStorage.setItem("todoList", JSON.stringify(todoList));
  let editingTodoTitle = $.querySelector(`.todo[data-id="${todoEditId}"] h3`);
  editingTodoTitle.innerHTML = todoTitleInput.value;
  hideModal();
  isEditing = false;
}
function createTodoElem(title, id) {
  const todo = $.createElement("div");
  todo.classList.add("todo");
  todo.setAttribute("data-id", id);
  const todoInners = `<h3 class="todo_title">${title}</h3><div class="todo_actions"><span class="do_todo material-symbols-outlined" title="Complete Todo">done</span><span class="edit_todo material-symbols-outlined" title="Edit Todo">edit</span><span class=" delete_todo material-symbols-outlined" title="Delete Todo">delete</span></div>`;
  todo.innerHTML = todoInners;
  todosContainer.append(todo);
  return todo;
}
function completeTodo(e) {
  let todoId = e.target.parentElement.parentElement.getAttribute("data-id");
  e.target.parentElement.parentElement.style.textDecorationLine =
    "line-through";
  let todoList = JSON.parse(localStorage.getItem("todoList"));
  todoList[todoId].isDone = true;
  localStorage.setItem("todoList", JSON.stringify(todoList));
  e.target.innerHTML = "close";
  isDone = true;
}
function uncompleteTodo(e) {
  let todoId = e.target.parentElement.parentElement.getAttribute("data-id");
  e.target.parentElement.parentElement.style.textDecorationLine = "";
  let todoList = JSON.parse(localStorage.getItem("todoList"));
  todoList[todoId].isDone = false;
  localStorage.setItem("todoList", JSON.stringify(todoList));
  e.target.innerHTML = "done";
  isDone = false;
}
function deleteTodo(e) {
  let todoId = e.target.parentElement.parentElement.getAttribute("data-id");
  e.target.parentElement.parentElement.remove();
  let todoList = JSON.parse(localStorage.getItem("todoList"));
  todoList.splice(todoId, 1);
  let todoElems = $.getElementsByClassName("todo");
  for (let i = 0; i < todoList.length; i++) {
    todoList[i].id = i;
    todoElems[i].setAttribute("data-id", i);
  }
  localStorage.setItem("todoList", JSON.stringify(todoList));
}
function setEventsForTodoActions() {
  const doTodoElems = $.querySelectorAll(".do_todo");
  const editTodoElems = $.querySelectorAll(".edit_todo");
  const delTodoElems = $.querySelectorAll(".delete_todo");
  doTodoElems.forEach(function (item) {
    item.addEventListener("click", function (e) {
      if (!isDone) {
        completeTodo(e);
      } else {
        uncompleteTodo(e);
      }
    });
  });
  editTodoElems.forEach(function (item) {
    item.addEventListener("click", goToTodoEditMode);
  });
  delTodoElems.forEach(function (item) {
    item.addEventListener("click", deleteTodo);
  });
}
function addTodoHandler () {
  if (todoTitleInput.value) {
    if (isEditing) {
      editTodo();
    } else {
      addTodo();
    }    
  } else {
    alert('Please Enter A Title For Your Todo.')
  }

}
function addTodo() {
  const todoList = JSON.parse(localStorage.getItem("todoList"));
  const newNoteObj = {
    id: todoList.length,
    title: todoTitleInput.value,
    des: todoDescriptionInput.value,
    isDone: false,
  };
  createTodoElem(todoTitleInput.value, todoList.length);
  todoList.push(newNoteObj);
  localStorage.setItem("todoList", JSON.stringify(todoList));
  setEventsForTodoActions();
  hideModal();
  clearInputs()
}
window.addEventListener("load", loadTodos);
window.addEventListener("load", setEventsForTodoActions);
addBtn.addEventListener("click", showModal);
todoSubmitBtn.addEventListener("click", function (e) {
  e.preventDefault();
  addTodoHandler()
});
todoTitleInput.addEventListener('keydown',function(e) {
  if (e.key === 'Enter') {
    e.preventDefault()
    addTodoHandler()
  }
})
todoDescriptionInput.addEventListener('keydown',function(e) {
  if (e.ctrlKey && e.key === 'Enter') {
    addTodoHandler()
  }
})
modalCloseBtn.addEventListener("click", hideModal);
addModalOverlay.addEventListener('click',hideModal)
$.body.addEventListener('keydown',function(e) {
  if (e.key === 'Escape') {
    hideModal()
  }
})