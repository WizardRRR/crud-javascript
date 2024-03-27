import { addListenersButton, resetFields, updateUI } from "./features.js";
import { setItemLocalStorage } from "./localstorage.js";
import { saveUser, updateUser } from "./services.js";
import { MODES_FORM } from "./mode-forms.js";
import { $ } from "./jquery.js";

const FORM = $("#form-users");

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
  if (currentMode === MODES_FORM.update) handleSubmitUpdateUser();
  if (currentMode === MODES_FORM.save) handleSubmitStoreUser();
});

$("#btn-update-user").addEventListener("click", handleSubmitUpdateUser);

function handleSubmitUpdateUser() {
  const user = {
    id: parseInt($("#btn-update-user").getAttribute("user-id")),
    name: $("#name").value,
    lastName: $("#lastName").value,
    age: $("#age").value,
    city: $("#city").value,
    color: $("#color").value,
    urlImage: $("#urlImage").value,
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
  const { value: city } = $("#city");
  const { value: color } = $("#color");
  const { value: urlImage } = $("#urlImage");
  saveUser({ name, lastName, age, city, color, urlImage });
  updateUI();
  addListenersButton();
  resetFields();
  $("#name").focus();
}
