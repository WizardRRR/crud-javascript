import { addListenersButton, resetFields, updateUI } from './features.js'
import { saveUser, updateUser } from './services.js'
import { setItemLocalStorage } from './localstorage.js'
import { $ } from './jquery.js'

// verificando si es la primera vez para setear users al local storage
if (!localStorage.getItem('users')) setItemLocalStorage('users', [])

updateUI()
addListenersButton()
$('#name').focus()

// añadiendo evento de enviar formulario
$('#form-users').addEventListener('submit', handleSubmitStoreUser)
$('#btn-update-user').addEventListener('click', handleSubmitUpdateUser)

function handleSubmitUpdateUser(e) {
  const user = {
    id: parseInt($('#btn-update-user').getAttribute('user-id')),
    name: $('#name').value,
    lastName: $('#lastName').value,
    age: $('#age').value
  }
  updateUser(user)
  updateUI()
  addListenersButton()
  $('#btn-save-user').style.display = 'block'
  $('#btn-update-user').style.display = 'none'
  resetFields()
}

function handleSubmitStoreUser(e) {
  e.preventDefault()
  const { value: name } = $('#name')
  const { value: lastName } = $('#lastName')
  const { value: age } = $('#age')
  saveUser({ name, lastName, age })
  updateUI()
  addListenersButton()
  resetFields()
  $('#name').focus()
}