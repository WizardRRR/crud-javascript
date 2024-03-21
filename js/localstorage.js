export function getItemLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key))
}

export function setItemLocalStorage(key, value) {
  return localStorage.setItem(key, JSON.stringify(value))
}