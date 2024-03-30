import { addListenersButton, resetFields, updateUI } from './features.js'
import { setItemLocalStorage } from './localstorage.js'
import { saveUser, updateUser } from './services.js'
import { MODES_FORM } from './mode-forms.js'
import { $ } from './jquery.js'
import { createToast } from './toast.js'

const FORM = $('#form-users')

// verificando si es la primera vez para setear users al local storage
if (!localStorage.getItem('users')) setItemLocalStorage('users', [])
updateUI()
addListenersButton()
$('#name').focus()
FORM.setAttribute('mode', MODES_FORM.save)

// añadiendo evento de enviar formulario
FORM.addEventListener('submit', (event) => {
  event.preventDefault()
  const currentMode = FORM.getAttribute('mode')
  if (currentMode === MODES_FORM.update) handleSubmitUpdateUser()
  if (currentMode === MODES_FORM.save) handleSubmitStoreUser()
})

$('#btn-update-user').addEventListener('click', handleSubmitUpdateUser)

function handleSubmitUpdateUser() {
  const user = {
    id: parseInt($('#btn-update-user').getAttribute('user-id')),
    name: $('#name').value,
    lastName: $('#lastName').value,
    age: $('#age').value,
    city: $('#city').value,
    color: $('#color').value,
    urlImage: $('#urlImage').value,
  }
  updateUser(user)
  updateUI()
  addListenersButton()
  createToast('warning', `Se actualizo datos de un usuario`)
  $('#btn-save-user').style.display = 'block'
  $('#btn-update-user').style.display = 'none'
  resetFields()
  $('#name').focus()
  FORM.setAttribute('mode', MODES_FORM.save)
}

function handleSubmitStoreUser() {
  const { value: name } = $('#name')
  const { value: lastName } = $('#lastName')
  const { value: age } = $('#age')
  const { value: city } = $('#city')
  const { value: color } = $('#color')
  const { value: urlImage } = $('#urlImage')
  saveUser({ name, lastName, age, city, color, urlImage })
  createToast("success", `Se creó el usuario ${name}`, 2000);

  updateUI()
  addListenersButton()
  resetFields()
  $('#name').focus()
}

/** barra de busqueda */
$('#search')
$('.search-counter')

const totalUserCount = getAllUsers().filter(user => user.deletedAt === null).length
displayCounter(totalUserCount)

$('#search').addEventListener('input', event => {
  const searchTerm = event.target.value.toLowerCase()
  const users = getAllUsers()
  let counter = 0
  
  users.forEach(user => {
    if (user.deletedAt === null) {
      const search = user.name.toLowerCase().includes(searchTerm) || user.lastName.toLowerCase().includes(searchTerm)
      if (search) {
        counter++
      }
    }
  })
  updateUI(searchTerm)
  displayCounter(counter)
})

