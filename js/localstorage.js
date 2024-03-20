export function getItemLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key))
}

export function setItemLocalStorage(key, value) {
  return localStorage.setItem(key, JSON.stringify(value))
}

export function editUser(userObject) {
  let index

  const users = getItemLocalStorage('users')
  
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
  setItemLocalStorage('users', users)
}
