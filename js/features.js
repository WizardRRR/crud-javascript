import { deleteUser, getAllUsers, getUserById } from './services.js'
import { MODES_FORM } from './mode-forms.js'
import { $, $$ } from './jquery.js'
import { createToast } from './toast.js';

export function resetFields() {
  $('#name').value = ''
  $('#lastName').value = ''
  $('#age').value = ''
}

export function updateUI() {
  let templateHMTL = ``
  getAllUsers().forEach((user) => {
    if (user.deletedAt === null) {
      templateHMTL += `
      <div id='${user.id}'>
        <span>${user.name} ${user.lastName}</span>
        <span>${user.age}</span>
        <button id='edit-${user.id}' class='button-edit'>
          <img width=25 height=25 src='./assets/icon-edit.svg'/>
        </button>
        <button id='delete-${user.id}' class='button-delete'>
          <img width=25 height=25 src='./assets/icon-delete.svg'/>
        </button>
      </div>
      `
    }
  })
  $('#wrapped-users').innerHTML = templateHMTL
}

export function addListenersButton() {

  $$('.button-delete').forEach(buttonDelete => {
    $(`#${buttonDelete.id}`).addEventListener('click', () => {
      const name = getUserById(parseInt(buttonDelete.id.split('-')[1])).name;//Obtener nombre del usuario eliminado 
      deleteUser(parseInt(buttonDelete.id.split('-')[1]))
      updateUI()
      resetFields()
      addListenersButton()
      createToast("danger", `Se eliminó el usuario ${name}`, 8000);
      $('#btn-save-user').style.display = 'block'
      $('#form-users').setAttribute('mode', MODES_FORM.save)
      $('#btn-update-user').style.display = 'none'
      $('#name').focus()
    })
  })

  $$('.button-edit').forEach((buttonEdit) => {
    $(`#${buttonEdit.id}`).addEventListener('click', () => {
      const currentUser = getUserById(parseInt(buttonEdit.id.split('-')[1]))
      const name = getUserById(parseInt(buttonEdit.id.split('-')[1])).name;//Obtener nombre del usuario
      createToast("info", `Se está editando el usuario ${name}`, 2000);
      // seleccionando inputs
      $('#name').value = currentUser.name
      $('#lastName').value = currentUser.lastName
      $('#age').value = currentUser.age
      $('#btn-update-user').setAttribute('user-id', currentUser.id)
      $('#btn-save-user').style.display = 'none'
      $('#btn-update-user').style.display = 'block'
      $('#form-users').setAttribute('mode', MODES_FORM.update)
      $('#name').focus()
    })
  })
}

export function orderByRecent() {
  const users = getAllUsers().filter(user => user.deletedAt === null)
  users.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  displayUsers(users)
}

export function orderByAncient() {
  const users = getAllUsers().filter(user => user.deletedAt === null)
  users.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
  displayUsers(users)
}

export function orderByAge() {
  const users = getAllUsers().filter(user => user.deletedAt === null)
  users.sort((a, b) => a.age - b.age)
  displayUsers(users)
}

export function orderByAlphabet() {
  const users = getAllUsers().filter(user => user.deletedAt === null)
  users.sort((a, b) => a.name.localeCompare(b.name))
  displayUsers(users)
}

function displayUsers(users) {
  let templateHMTL = ``
  users.forEach((user) => {
    templateHMTL += `
      <div id='${user.id}'>
        <span>${user.name} ${user.lastName}</span>
        <span>${user.age}</span>
        <button id='edit-${user.id}' class='button-edit'>
          <img width=25 height=25 src='./assets/icon-edit.svg'/>
        </button>
        <button id='delete-${user.id}' class='button-delete'>
          <img width=25 height=25 src='./assets/icon-delete.svg'/>
        </button>
      </div>
    `;
  });
  $('#wrapped-users').innerHTML = templateHMTL
  addListenersButton();
}