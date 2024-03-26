import { getItemLocalStorage, setItemLocalStorage } from './localstorage.js'

/**
 * @typedef {Object} User
 * @property {number} id
 * @property {string} name 
 * @property {string} lastName
 * @property {number} age
 * @property {Date} createdAt
 * @property {Date} updatedAt
 * @property {Date} deletedAt
 */

/**
 * @typedef {Object} newUser
 * @property {string} name 
 * @property {string} lastName
 * @property {number} age 
 */

/**
 * @param {number} userId 
 * @returns {User|null}
 */
export const getUserById = userId => {
  const users = getItemLocalStorage('users')
  return users.find(user => user.id === userId)
}

/** @returns {Array<User>}*/
export const getAllUsers = () => getItemLocalStorage('users') ?? []

/** @param {newUser} newUser */
export const saveUser = newUser => {
  const users = getAllUsers()
  users.push({
    id: users.length + 1,
    ...newUser,
    createdAt: new Date,
    updatedAt: null,
    deletedAt: null
  })
  setItemLocalStorage('users', users)
}

/** @param {User} updateUser */
export const updateUser = updateUser => {
  const users = getAllUsers()
  const updatedUsers = users.map(user => {
    if (user.id === updateUser.id)
      return { ...user, ...updateUser, updatedUser: new Date }
    return user
  })
  setItemLocalStorage('users', updatedUsers)
}

/** @param {number} userId -*/
export const deleteUser = userId => {
  const users = getAllUsers()
  const updatedUsers = users.map(user => {
    if (user.id === userId) return { ...user, deletedAt: new Date }
    return user
  })
  setItemLocalStorage('users', updatedUsers)
}
