import { addListenersButton, resetFields, updateUI } from "./features.js";
import { setItemLocalStorage } from "./localstorage.js";
import { saveUser, updateUser, getAllUsers, deleteUser } from "./services.js";
import { MODES_FORM } from "./mode-forms.js";
import { $ } from "./jquery.js";
import { confirmAction } from "./confirmation.js";

const FORM = $("#form-users");

function handleSubmitUpdateUser() {
  const user = {
    id: parseInt($("#btn-update-user").getAttribute("user-id")),
    name: $("#name").value,
    lastName: $("#lastName").value,
    age: $("#age").value,
  };
  updateUser(user);
  updateUI();
  addListenersButton();
  $("#btn-save-user").style.display = "block";
  $("#btn-update-user").style.display = "none";
  resetFields();
  $("#name").focus();
  FORM.setAttribute("mode", MODES_FORM.save);
}

function handleSubmitStoreUser() {
  const { value: name } = $("#name");
  const { value: lastName } = $("#lastName");
  const { value: age } = $("#age");
  const newUser = { name, lastName, age };
  saveUser(newUser);
  updateUI();
  addListenersButton();
  resetFields();
  $("#name").focus();
}
// verificando si es la primera vez para setear users al local storage
if (!localStorage.getItem("users")) setItemLocalStorage("users", []);
updateUI();
addListenersButton();
$("#name").focus();
FORM.setAttribute("mode", MODES_FORM.save);

// añadiendo evento de enviar formulario
FORM.addEventListener("submit", (event) => {
  event.preventDefault();
  const currentMode = FORM.getAttribute("mode");

  if (currentMode === MODES_FORM.update) {
    if (confirmAction("¿Estás seguro de actualizar este usuario?")) {
      handleSubmitUpdateUser();
    }
  }

  if (currentMode === MODES_FORM.save) {
    if (confirmAction("¿Estás seguro de guardar este usuario?")) {
      handleSubmitStoreUser();
    }
  }
});

$("#btn-update-user").addEventListener("click", () => {
  if (confirmAction("¿Estás seguro de actualizar este usuario?")) {
    handleSubmitUpdateUser();
  }
});

$$(".button-delete").forEach((buttonDelete) => {
  $(`#${buttonDelete.id}`).addEventListener("click", () => {
    if (confirmAction("¿Estás seguro de eliminar este usuario?")) {
      deleteUser(parseInt(buttonDelete.id.split("-")[1]));
      updateUI();
      resetFields();
      addListenersButton();
      $("#btn-save-user").style.display = "block";
      $("#form-users").setAttribute("mode", MODES_FORM.save);
      $("#btn-update-user").style.display = "none";
      $("#name").focus();
    }
  });
});
