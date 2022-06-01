const $ = document;
const root = $.documentElement;
const toggleThemeBtn = $.querySelector(".toggle_theme");
const addBtn = $.querySelector(".add_btn");
const addModal = $.querySelector(".add_modal");
const modalOverlay = $.querySelector(".overlay");
const todosContainer = $.querySelector(".todos_container");
const aboutBtn = $.querySelector(".about_modal_btn");
const aboutModal = $.querySelector(".about_modal");
const aboutModalCloseBtn = $.querySelector(".about_close_btn");
const goToTopBtn = $.querySelector(".go_to_top");
//add modal elements
const todoTitleInput = $.getElementById("todo_title_input");
const todoDescriptionInput = $.getElementById("todo_description_input");
const modalCloseBtn = $.querySelector(".close_btn");
const todoSubmitBtn = $.querySelector(".add_todo_btn");

let todos = [];
let isDark = false;
let isEditing = false;
let todoEditIndex;
let todoToEdit;
let isDone;
function showAddModal() {
  todoTitleInput.focus();
  addModal.style.top = "20%";
  modalOverlay.style.display = "block";
}
function hideAddModal() {
  addModal.style.top = "-100%";
  modalOverlay.style.display = "none";
}
function showAboutModal() {
  aboutModal.style.top = "20%";
  modalOverlay.style.display = "block";
}

function hideAboutModal() {
  aboutModal.style.top = "-100%";
  modalOverlay.style.display = "none";
}
function clearInputs() {
  todoTitleInput.value = "";
  todoDescriptionInput.value = "";
}
function loadTodos() {
const localStorageTodos =JSON.parse(localStorage.getItem('todos'))
if (localStorageTodos) {
  todos = localStorageTodos;
  generateTodoElems(todos)
} 
}
function goToTodoEditMode(id) {
  //get data from local storage...
  todoEditIndex =todos.findIndex(function (todo) {
    return todo.id === id;
  });
  todoToEdit = todoList[todoEditId];
  let todoName = todoToEdit.title;
  let todoDes = todoToEdit.des;
  todoTitleInput.value = todoName;
  todoDescriptionInput.value = todoDes;
  isEditing = true;
  showAddModal();
}
function editTodo() {
  let todoList = JSON.parse(localStorage.getItem("todoList"));
  todoToEdit.title = todoTitleInput.value;
  todoToEdit.des = todoDescriptionInput.value;
  todoList[todoEditId] = todoToEdit;
  localStorage.setItem("todoList", JSON.stringify(todoList));
  let editingTodoTitle = $.querySelector(`.todo[data-id="${todoEditId}"] h3`);
  editingTodoTitle.innerHTML = todoTitleInput.value;
  hideAddModal();
  isEditing = false;
}
function createTodoElem(title, id) {
  const todo = $.createElement("div");
  todo.classList.add("todo");
  todo.setAttribute("data-id", id);
  const todoInners = `<h3 class="todo_title">${title}</h3><div class="todo_actions"><i class="do_todo fa-solid fa-check" title="Complete Todo"></i><i class="edit_todo fa-solid fa-pen-to-square" title="Edit Todo"></i><i class=" delete_todo fa-solid fa-eraser" title="Delete Todo"></i></div>`;
  todo.innerHTML = todoInners;
  todosContainer.append(todo);
  return todo;
}
function completeTodo(e) {
  let todoId = e.target.parentElement.parentElement.getAttribute("data-id");
  e.target.parentElement.parentElement.classList.add("complete");
  let todoList = JSON.parse(localStorage.getItem("todoList"));
  todoList[todoId].isDone = true;
  localStorage.setItem("todoList", JSON.stringify(todoList));
  e.target.className = "do_todo fa-solid fa-xmark";
  isDone = true;
}
function uncompleteTodo(e) {
  let todoId = e.target.parentElement.parentElement.getAttribute("data-id");
  e.target.parentElement.parentElement.classList.remove("complete");
  let todoList = JSON.parse(localStorage.getItem("todoList"));
  todoList[todoId].isDone = false;
  localStorage.setItem("todoList", JSON.stringify(todoList));
  e.target.className = "do_todo fa-solid fa-check";
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
function addTodoHandler() {
  if (todoTitleInput.value) {
    if (isEditing) {
      editTodo();
    } else {
      addTodo();
    }
  } else {
    alert("Please Enter A Title For Your Todo.");
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
  hideAddModal();
  clearInputs();
}
function scrollToTop() {
  todosContainer.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}
function changeTheme() {
  if (isDark) {
    isDark = false;
    localStorage.setItem("theme", "light");
    toggleThemeBtn.firstElementChild.src = "res/icons/moon.svg";
    root.style.setProperty(
      "--primary-color",
      "linear-gradient(to bottom right, #72147e, #f21170)"
    );
    root.style.setProperty("--secondary-color", "#fff");
    root.style.setProperty("--todo-color", "#fa9905");
    root.style.setProperty("--primary-text-color", "#000");
    root.style.setProperty("--secondary-text-color", "#fff");
  } else {
    isDark = true;
    localStorage.setItem("theme", "dark");
    toggleThemeBtn.firstElementChild.src = "res/icons/sun.svg";
    root.style.setProperty(
      "--primary-color",
      "linear-gradient(to bottom right, #DA0037,#EDEDED )"
    );
    root.style.setProperty("--secondary-color", "#525252");
    root.style.setProperty("--todo-color", "#C4B6B6");
    root.style.setProperty("--primary-text-color", "#fff");
    root.style.setProperty("--secondary-text-color", "#000");
  }
}
function setTheme() {
  const theme = localStorage.getItem("theme");
  if (theme === "dark") {
    isDark = true;
    toggleThemeBtn.firstElementChild.src = "res/icons/sun.svg";
    root.style.setProperty(
      "--primary-color",
      "linear-gradient(to bottom right, #DA0037,#EDEDED )"
    );
    root.style.setProperty("--secondary-color", "#525252");
    root.style.setProperty("--todo-color", "#C4B6B6");
    root.style.setProperty("--primary-text-color", "#fff");
    root.style.setProperty("--secondary-text-color", "#000");
  } else {
    isDark = false;
    toggleThemeBtn.firstElementChild.src = "res/icons/moon.svg";
    toggleThemeBtn.firstElementChild.src = "res/icons/moon.svg";
    root.style.setProperty(
      "--primary-color",
      "linear-gradient(to bottom right, #72147e, #f21170)"
    );
    root.style.setProperty("--secondary-color", "#fff");
    root.style.setProperty("--todo-color", "#fa9905");
    root.style.setProperty("--primary-text-color", "#000");
    root.style.setProperty("--secondary-text-color", "#fff");
  }
}
function setIntoLocalStorage(todosArr) {
  localStorage.setItem('todos',JSON.stringify(todosArr))
}
window.addEventListener("load", loadTodos);
window.addEventListener("load", setEventsForTodoActions);
window.addEventListener("load", setTheme);
addBtn.addEventListener("click", showAddModal);
todoSubmitBtn.addEventListener("click", function (e) {
  e.preventDefault();
  addTodoHandler();
});
todoTitleInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    e.preventDefault();
    addTodoHandler();
  }
});
todoDescriptionInput.addEventListener("keydown", function (e) {
  if (e.ctrlKey && e.key === "Enter") {
    addTodoHandler();
  }
});
modalCloseBtn.addEventListener("click", hideAddModal);
modalOverlay.addEventListener("click", function () {
  hideAddModal();
  hideAboutModal();
});
$.body.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    hideAddModal();
    hideAboutModal();
  }
});
aboutBtn.addEventListener("click", showAboutModal);
aboutModalCloseBtn.addEventListener("click", hideAboutModal);
goToTopBtn.addEventListener("click", scrollToTop);
toggleThemeBtn.addEventListener("click", changeTheme);
