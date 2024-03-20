const d = document

// seleccionando elementos del DOM
const WRAPPED_USERS = d.getElementById('wrapped-users')
const FORM_USERS = d.getElementById('form-users')

// lista de usuarios
const users = []

paintUI(users)

// evento de enviar formulario
FORM_USERS.addEventListener('submit', function (event) {
  event.preventDefault()

  // seleccionando inputs
  const name = d.getElementById('name')
  const lastName = d.getElementById('lastName')
  const age = d.getElementById('age')

  // añadiendo usuario a la lista de usuarios
  users.push({
    id: users.length + 1,
    name: name.value,
    lastName: lastName.value,
    age: age.value
  })

  // pintando la UI
  paintUI(users)

  // reseteando los inputs
  name.value = ''
  lastName.value = ''
  age.value = ''
})

function paintUI(users) {
  let templateHMTL = ``

  users.forEach(function (user, i) {
    templateHMTL += `
    <div>
        <span>${user.name} ${user.lastName}</span>
        <span>${user.age}</span>
        <button id="edit-${user.id}" class='button-edit'>
          <img width=25 height=25 src='./assets/icon-edit.svg'/>
        </button>
        <button id="delete-${user.id}" class='button-delete'>
          <img width=25 height=25 src='./assets/icon-delete.svg'/>
        </button>
      </div>
  `
  })

  WRAPPED_USERS.innerHTML = templateHMTL
  const buttonsEdit = d.querySelectorAll('.button-edit')
  const buttonsDelete = d.querySelectorAll('.button-delete')

  buttonsDelete.forEach(function (buttonDelete) {
    d.getElementById(buttonDelete.id).addEventListener('click', function (e) {
      deleteUser(buttonDelete.id.split('-')[1])
      paintUI(users)
    })
  })

  buttonsEdit.forEach(function (buttonEdit) {
    d.getElementById(buttonEdit.id).addEventListener('click', function (e) {
      const currentUser = users.find(function (user) {
        return user.id == buttonEdit.id.split('-')[1]
      })
      // seleccionando inputs
      d.getElementById('name').value = currentUser.name
      d.getElementById('lastName').value = currentUser.lastName
      d.getElementById('age').value = currentUser.age
      d.getElementById('btn-update-user').setAttribute('user-id', currentUser.id)

      d.getElementById('btn-save-user').style.display = 'none'
      d.getElementById('btn-update-user').style.display = 'block'
    })
  })
}

const BTN_UPDATE_USER = d.getElementById('btn-update-user')

BTN_UPDATE_USER.addEventListener('click', function () {

  // seleccionando inputs
  const user = {
    id: parseInt(BTN_UPDATE_USER.getAttribute('user-id')),
    name: d.getElementById('name').value,
    lastName: d.getElementById('lastName').value,
    age: d.getElementById('age').value
  }
  editUser(user)
  paintUI(users)
  d.getElementById('btn-save-user').style.display = 'block'
  BTN_UPDATE_USER.style.display = 'none'
  // reseteando los inputs
  d.getElementById('name').value = ''
  d.getElementById('lastName').value = ''
  d.getElementById('age').value = ''
})

function deleteUser(idUser) {
  const index = users.findIndex(function (user) {
    return user.id == idUser
  })
  users.splice(index, 1)
}

function editUser(userObject) {
  let index
  const currentUser = users.find(function (user, i) {
    if (user.id === userObject.id) {
      index = i
      return true
    }
  })

  currentUser.name = userObject.name
  currentUser.lastName = userObject.lastName
  currentUser.age = userObject.age

  users.splice(index, 1, currentUser)
}
