import { deleteUser, getAllUsers, getUserById } from "./services.js";
import { MODES_FORM } from "./mode-forms.js";
import { $, $$ } from "./jquery.js";

export function resetFields() {
  $("#name").value = "";
  $("#lastName").value = "";
  $("#age").value = "";
  $("#city").value = "";
  $("#color").value = "";
  $("#urlImage").value = "";
}

export function updateUI() {
  let templateHMTL = ``;
  getAllUsers().forEach((user) => {
    let url = "";
    if (user.urlImage && user.urlImage.startsWith("https://")) {
      url = `<img width=250 src='${user.urlImage}' alt='${user.name}'s Image' />`;
    }
    if (user.deletedAt === null) {
      templateHMTL += `
      <div style="border-left: 10px solid ${user.color}" id='${user.id}'>
        <span>${user.name} ${user.lastName}</span>
        <span>${user.age}</span>
        <span>${user.city}</span>
        ${url}
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
  $("#wrapped-users").innerHTML = templateHMTL;
}

export function addListenersButton() {
  $$(".button-delete").forEach((buttonDelete) => {
    $(`#${buttonDelete.id}`).addEventListener("click", () => {
      deleteUser(parseInt(buttonDelete.id.split("-")[1]));
      updateUI();
      resetFields();
      addListenersButton();
      $("#btn-save-user").style.display = "block";
      $("#form-users").setAttribute("mode", MODES_FORM.save);
      $("#btn-update-user").style.display = "none";
      $("#name").focus();
    });
  });

  $$(".button-edit").forEach((buttonEdit) => {
    $(`#${buttonEdit.id}`).addEventListener("click", () => {
      const currentUser = getUserById(parseInt(buttonEdit.id.split("-")[1]));
      // seleccionando inputs
      $("#name").value = currentUser.name;
      $("#lastName").value = currentUser.lastName;
      $("#age").value = currentUser.age;
      $("#city").value = currentUser.city;
      $("#color").value = currentUser.color;
      $("#urlImage").value = currentUser.urlImage;
      $("#btn-update-user").setAttribute("user-id", currentUser.id);
      $("#btn-save-user").style.display = "none";
      $("#btn-update-user").style.display = "block";
      $("#form-users").setAttribute("mode", MODES_FORM.update);
      $("#name").focus();
    });
  });
}
