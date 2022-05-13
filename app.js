const $ = document;
const addBtn = $.querySelector('.add_btn')
const addModal = $.querySelector('.add_modal')
const addModalOverlay = $.querySelector('.overlay')
//modal elements
const todoTitleInput = $.getElementById('todo_title_input')
const todoDescriptionInput = $.getElementById('todo_description_input')
const modalCloseBtn = $.querySelector('.close_btn')
const todoSubmitBtn = $.querySelector('.add_todo_btn')

function showModal() {
    addModal.style.top = '20%'
    addModalOverlay.style.display = 'block'
}
function hideModal() {
    addModal.style.top = '-100%'
    addModalOverlay.style.display = 'none'
}

addBtn.addEventListener('click',showModal)
modalCloseBtn.addEventListener('click',hideModal)