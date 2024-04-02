import {
  addListenersButton,
  resetFields,
  updateUI,
  orderByRecent,
  orderByAncient,
  orderByAge,
  orderByAlphabet,
  newUserAnimation,
  updateUIFiltered
} from './features.js'
import { setItemLocalStorage } from './localstorage.js'
import { saveUser, updateUser } from './services/user.js'
import { MODES_FORM } from './mode-forms.js'
import { $ } from './jquery.js'
import { createToast } from './toast.js'

const FORM = $('#form-users')

// verificando si es la primera vez para setear users al local storage
if (!localStorage.getItem('users')) setItemLocalStorage('users', [])
if (!localStorage.getItem('user-activity-history')) setItemLocalStorage('user-activity-history', [])
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

$("#deleted-users").addEventListener("click", updateUIFiltered);

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
  newUserAnimation()
  resetFields()
  addListenersButton()
  $('#name').focus()
}

// eventos botones para ordenar
$('#recent').addEventListener('click', orderByRecent)
$('#ancient').addEventListener('click', orderByAncient)
$('#ageOrder').addEventListener('click', orderByAge)
$('#alphabet').addEventListener('click', orderByAlphabet)

// modal
const closeModal = () => {
  $('#modal').classList.add('out-visible')
  setTimeout(() => {
    $('#modal').classList.remove('modal-visible')
    $('#modal').classList.remove('out-visible')
  }, 500)
}

$('#close-modal').addEventListener('click', closeModal)
$('#btn-cancel').addEventListener('click', closeModal)

