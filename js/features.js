import { deleteUser, getAllUsers, getUserById, getAllFilteredUsers } from './services/user.js'
import { MODES_FORM } from './mode-forms.js'
import { $, $$ } from './jquery.js'
import { createToast } from './toast.js'
import formatDateString from './utils/format-date-string.js'

export function resetFields() {
  $('#name').value = ''
  $('#lastName').value = ''
  $('#age').value = ''
  $('#city').value = ''
  $('#color').value = ''
  $('#urlImage').value = ''
}

export function updateUI() {
  let templateHMTL = ``

  getAllUsers().forEach((user) => {

    const dateCreate = formatDateString(user.createdAt)
    let updateDateHTML = ''

    if (user.updatedAt) {
      updateDateHTML = `<span>${formatDateString(user.updatedAt)}</span>`
    }

    let url = ''
    if (user.urlImage && user.urlImage.startsWith('https://')) {
      url = `<img width=250 src='${user.urlImage}' alt='${user.name}'s Image' />`
    }

    if (user.deletedAt === null) {
      templateHMTL += `
      <div style='border-left: 10px solid ${user.color}' id='${user.id}'>
        <span>${user.name} ${user.lastName}</span>
        <span>${user.age}</span>
        <span>${user.city}</span>
        <span>${dateCreate}</span>
        ${updateDateHTML}
        ${url}
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

export function updateUIFiltered() {
  let templateHMTL = `
    <span class="back">
      <img width=20 height=20 src='./assets/icon-back.svg'/>
      Regresar
    </span>`;
  getAllFilteredUsers().forEach((user) => {
    templateHMTL += `
      <div id='${user.id}'>
        <span>${user.name} ${user.lastName}</span>
        <span>${user.age}</span>
        <button id='restore-${user.id}' class='btn-restore-user'>
          <img width=25 height=25 src='./assets/icon-restore.svg'/>
        </button>
      </div>
      `;
  });
  $("#wrapped-users").innerHTML = templateHMTL;
  $(".back").addEventListener("click", () => updateUI());
}


export function addListenersButton() {
  $$('.button-delete').forEach((buttonDelete) => {
    $(`#${buttonDelete.id}`).addEventListener('click', () => {
      $(`#${buttonDelete.id}`).parentNode.classList.add('deleted')
      $(`#${buttonDelete.id}`).parentNode.addEventListener('animationend', () => {
        deleteUser(parseInt(buttonDelete.id.split('-')[1]))
        const user = getUserById(parseInt(buttonDelete.id.split('-')[1]))
        createToast('danger', `Se eliminó el usuario ${user.name}`, 8000)
        updateUI()
        resetFields()
        addListenersButton()
        $('#btn-save-user').style.display = 'block'
        $('#form-users').setAttribute('mode', MODES_FORM.save)
        $('#btn-update-user').style.display = 'none'
        $('#name').focus()
      })
    })
  })

  let idUser = {}
  $$('.button-edit').forEach((buttonEdit) => {
    $(`#${buttonEdit.id}`).addEventListener('click', () => {
      const currentUser = getUserById(parseInt(buttonEdit.id.split('-')[1]))
      const name = currentUser.name
      const id = currentUser.id
      if (idUser[currentUser] !== id) {
        createToast('info', `Se está editando el usuario ${name}`, 2000)
        idUser[currentUser] = id
      }

      // seleccionando inputs
      $('#name').value = currentUser.name
      $('#lastName').value = currentUser.lastName
      $('#age').value = currentUser.age
      $('#city').value = currentUser.city
      $('#color').value = currentUser.color
      $('#urlImage').value = currentUser.urlImage
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
    `
  })
  $('#wrapped-users').innerHTML = templateHMTL
  addListenersButton()
}

export function newUserAnimation() {
  const newUser = $('#wrapped-users').lastElementChild
  newUser.scrollIntoView({ behavior: 'smooth', block: 'end' })
  newUser.addEventListener('animationend', () => {
    newUser.classList.remove('animation')
  })
  newUser.classList.add('animation')
}
