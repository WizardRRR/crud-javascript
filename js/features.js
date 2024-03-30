import { getAllUsers, saveUser, updateUser, deleteUser, getUserById } from './services.js';
import { $, $$ } from './jquery.js';
import { createToast } from './toast.js';

let toastedUsers = [];

export function resetFields() {
  $('#name').value = '';
  $('#lastName').value = '';
  $('#age').value = '';
}

export function updateUI() {
  let templateHTML = ``;
  getAllUsers().forEach((user) => {
    if (user.deletedAt === null) {
      const createdAtFormatted = formatDateTime(user.createdAt);
      const updatedAtFormatted = user.updatedAt ? formatDateTime(user.updatedAt) : 'N/A';
      templateHTML += `
      <div id='${user.id}' class='user-card' data-timestamp="${user.updatedAt || user.createdAt}">
        <span>${user.name} ${user.lastName}</span>
        <span>${user.age}</span>
        <div class="timestamp" style="display: none;">${createdAtFormatted}</div>
        <div class="timestamp" style="display: none;">${updatedAtFormatted}</div>
        <button id='edit-${user.id}' class='button-edit'>
          <img width=25 height=25 src='./assets/icon-edit.svg'/>
        </button>
        <button id='delete-${user.id}' class='button-delete'>
          <img width=25 height=25 src='./assets/icon-delete.svg'/>
        </button>
      </div>
      `;
    }
  });
  $('#wrapped-users').innerHTML = templateHTML;
  addListenersButton(); // Llamar a la función para agregar los listeners después de actualizar el UI
}

export function addListenersButton() {
  $$('.button-delete').forEach(buttonDelete => {
    buttonDelete.removeEventListener('click', deleteButtonClickHandler);
    buttonDelete.addEventListener('click', deleteButtonClickHandler);
  });

  $$('.button-edit').forEach(buttonEdit => {
    buttonEdit.removeEventListener('click', editButtonClickHandler);
    buttonEdit.addEventListener('click', editButtonClickHandler);
  });
}

function deleteButtonClickHandler(event) {
  const buttonDelete = event.target.closest('.button-delete');
  const userId = parseInt(buttonDelete.id.split('-')[1]);
  const name = $(`#delete-${userId}`).parentNode.childNodes[0].textContent.trim();
  deleteUser(userId);
  const index = toastedUsers.indexOf(userId);
  if (index !== -1) {
    toastedUsers.splice(index, 1);
  }
  updateUI();
  resetFields();
  createToast("danger", `Se eliminó el usuario ${name}`, 8000);
  $('#btn-save-user').style.display = 'block';
  $('#form-users').setAttribute('mode', MODES_FORM.save);
  $('#btn-update-user').style.display = 'none';
  $('#name').focus();
}

function editButtonClickHandler(event) {
  const buttonEdit = event.target.closest('.button-edit');
  const userId = parseInt(buttonEdit.id.split('-')[1]);
  const name = $(`#edit-${userId}`).parentNode.childNodes[0].textContent.trim();

  updateUserTimestamp(userId);

  createToast("info", `Se está editando el usuario ${name}`, 2000);
  const currentUser = getUserById(userId);
  $('#name').value = currentUser.name;
  $('#lastName').value = currentUser.lastName;
  $('#age').value = currentUser.age;
  $('#btn-update-user').setAttribute('user-id', currentUser.id);
  $('#btn-save-user').style.display = 'none';
  $('#btn-update-user').style.display = 'block';
  $('#form-users').setAttribute('mode', MODES_FORM.update);
  $('#name').focus();

  updateUI();
}

function updateUserTimestamp(userId) {
  const user = getUserById(userId);
  user.updatedAt = new Date().toISOString();
  updateUser(user);
}

function formatDateTime(dateTimeString) {
  const date = new Date(dateTimeString);
  if (isNaN(date.getTime())) return 'Fecha inválida';
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
  return date.toLocaleDateString('es-ES', options);
}

document.addEventListener('mouseover', (event) => {
  const card = event.target.closest('.user-card');
  if (card && !toastedUsers.includes(card.id)) {
    const userId = card.id;
    const user = getUserById(parseInt(userId));

    let formattedDate = '';
    if (user.updatedAt) {
      formattedDate = formatDateTime(user.updatedAt);
      createToast("info", `Fecha de edición: ${formattedDate}`, 5000);
    } else {
      formattedDate = formatDateTime(user.createdAt);
      createToast("info", `Fecha de creación: ${formattedDate}`, 5000);
    }

    const nameElement = card.querySelector('span:nth-child(1)');
    const ageElement = card.querySelector('span:nth-child(2)');

    nameElement.textContent = `${user.name} ${user.lastName}`;
    ageElement.textContent = user.age;

    toastedUsers.push(card.id);
  }
});
