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
const todoTitleInput = $.getElementById("todo_title_input");
const todoDescriptionInput = $.getElementById("todo_description_input");
const modalCloseBtn = $.querySelector(".close_btn");
const todoSubmitBtn = $.querySelector(".add_todo_btn");
const todoModal = $.querySelector(".todo_modal");
const todoModalCloseBtn = $.querySelector(".todo_close_btn");
const todoDetailTitleSpan = $.querySelector("#title_span");
const todoDetailDesSpan = $.querySelector("#des_span");
const todoDetailIsDoneSpan = $.querySelector("#done_span");
const todoDetailDateSpan = $.querySelector("#date_span");

let todos = [];
let isDark = false;
let isEditing = false;
let todoEditIndex;
let todoToEdit;
let isDone;
function showModal(modal) {
  modal.style.top = "20%";
  modalOverlay.style.display = "block";
}
function hideModal(modal) {
  modal.style.top = "-100%";
  modalOverlay.style.display = "none";
}
function clearInputs() {
  todoTitleInput.value = "";
  todoDescriptionInput.value = "";
}
function loadTodos() {
  const localStorageTodos = JSON.parse(localStorage.getItem("todos"));
  if (localStorageTodos) {
    todos = localStorageTodos;
    generateTodoElems(todos);
  }
}
function goToTodoEditMode(id) {
  //get data from local storage...
  todoEditIndex = todos.findIndex(function (todo) {
    return todo.id === id;
  });

  let todoName = todos[todoEditIndex].title;
  let todoDes = todos[todoEditIndex].des;
  todoTitleInput.value = todoName;
  todoDescriptionInput.value = todoDes;
  isEditing = true;
  showAddModal();
}
function editTodo() {
  todos[todoEditIndex].title = todoTitleInput.value;
  todos[todoEditIndex].des = todoDescriptionInput.value;
  setIntoLocalStorage(todos);
  generateTodoElems(todos);
  hideAddModal();
  isEditing = false;
}
function generateTodoElems(todos) {
  let todoElem, todoHeading, todoActionContainer, doBtn, editBtn, delBtn;
  todosContainer.innerHTML = "";
  todos.forEach(function (todo) {
    todoElem = $.createElement("div");
    todoElem.classList.add("todo");
    todoHeading = $.createElement("h3");
    todoHeading.className = todo.isDone ? "todo_title complete" : "todo_title ";
    todoHeading.textContent = todo.title;
    todoHeading.classList.add("todo_title");
    todoActionContainer = $.createElement("div");
    todoActionContainer.classList.add("todo_actions");
    doBtn = $.createElement("i");
    doBtn.className = todo.isDone
      ? "do_todo fa-solid fa-xmark"
      : "do_todo fa-solid fa-check";
    doBtn.addEventListener("click", function () {
      completeTodo(todo.id);
    });

    editBtn = $.createElement("i");
    editBtn.className = "edit_todo fa-solid fa-pen-to-square";
    editBtn.addEventListener("click", function () {
      goToTodoEditMode(todo.id);
    });
    delBtn = $.createElement("i");
    delBtn.className = "delete_todo fa-solid fa-eraser";
    delBtn.addEventListener("click", function () {
      deleteTodo(todo.id);
    });
    todoActionContainer.append(doBtn, editBtn, delBtn);
    todoElem.append(todoHeading, todoActionContainer);
    todosContainer.append(todoElem);
  });
}
function completeTodo(id) {
  let todoIndex = todos.findIndex(function (todo) {
    return todo.id === id;
  });
  todos[todoIndex].isDone = !todos[todoIndex].isDone;
  setIntoLocalStorage(todos);
  generateTodoElems(todos);
}
function deleteTodo(id) {
  let todoIndex = todos.findIndex(function (todo) {
    return todo.id === id;
  });
  todos.splice(todoIndex, 1);
  setIntoLocalStorage(todos);
  generateTodoElems(todos);
}
function addTodoHandler() {
  if (todoTitleInput.value.trim()) {
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
  let titleValue = todoTitleInput.value.trim();
  let desValue = todoDescriptionInput.value.trim();
  let date = new Date();
  let todoDate = {
    year: date.getFullYear(),
    month: date.getMonth(),
    day: date.getDate(),
    hour: date.getHours(),
    min: date.getMinutes(),
  };
  const newNoteObj = {
    id: todos.length + 1,
    title: titleValue,
    des: desValue,
    dateCreated: todoDate,
    isDone: false,
  };
  todos.push(newNoteObj);
  setIntoLocalStorage(todos);
  generateTodoElems(todos);
  hideModal(addModal);
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
  localStorage.setItem("todos", JSON.stringify(todosArr));
}
window.addEventListener("load", loadTodos);
window.addEventListener("load", setTheme);
addBtn.addEventListener("click", function () {
  showModal(addModal);
});
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
modalCloseBtn.addEventListener("click", function () {
  hideModal(addModal);
});
modalOverlay.addEventListener("click", function () {
  hideModal(addModal);
  hideModal(aboutModal);
});
$.body.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    hideModal(addModal);
    hideModal(aboutModal);
  }
});
aboutBtn.addEventListener("click", function () {
  showModal(aboutModal);
});
aboutModalCloseBtn.addEventListener("click", function () {
  hideModal(aboutModal);
});
goToTopBtn.addEventListener("click", scrollToTop);
toggleThemeBtn.addEventListener("click", changeTheme);
