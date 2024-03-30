import { addListenersButton, newUserAnimation, resetFields, updateUI } from './features.js'
import { setItemLocalStorage } from './localstorage.js'
import { saveUser, updateUser } from './services.js'
import { MODES_FORM } from './mode-forms.js'
import { $ , $$} from './jquery.js'


const FORM = $('#form-users')


const options={
  root: null,
  rootMargin:'0px',
  threshold:.3
}


// verificando si es la primera vez para setear users al local storage
if (!localStorage.getItem('users')) setItemLocalStorage('users', [])
updateUI()
addListenersButton()
$('#name').focus()
FORM.setAttribute('mode', MODES_FORM.save)


// añadiendo evento de enviar formulario
FORM.addEventListener('submit', event => {
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
    age: $('#age').value
  }
  updateUser(user)
  updateUI()
  addListenersButton()
  observeNewElements()
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
  saveUser({ name, lastName, age })
  updateUI()
  newUserAnimation()
  resetFields()
  addListenersButton()
  observeNewElements()
  $('#name').focus()
}


function triggerAnimation(entries) {
  entries.forEach(entry => {
    const element = entry.target;
    element.classList.toggle('unset', entry.isIntersecting)
  });
}


const observer = new IntersectionObserver(triggerAnimation,options)


$$("#wrapped-users > div").forEach(element => {
  observer.observe(element);
});


export function observeNewElements() {
  const newElements = $$("#wrapped-users > div:not(.unset)")
  newElements.forEach(element => {
    observer.observe(element)
  });
}