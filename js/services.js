import { getItemLocalStorage, setItemLocalStorage } from './localstorage.js'

/**
 * Obtiene un usuario por su ID.
 * @param {number} userId - El ID del usuario que se desea obtener.
 * @returns {Object|null} - El objeto de usuario correspondiente al ID proporcionado, o null si no se encuentra.
 */
export const getUserById = userId => {
  const users = getItemLocalStorage('users')
  return users.find(user => user.id === userId)
}

/**
 * Obtiene todos los usuarios.
 * @returns {Array} - Un array de objetos que representan a todos los usuarios almacenados.
 */
export const getAllUsers = () => getItemLocalStorage('users')

/**
 * Guarda un nuevo usuario.
 * @param {Object} newUser - El nuevo usuario que se va a guardar.
 */
export const saveUser = newUser => {
  const users = getItemLocalStorage('users') ?? []
  users.push({
    id: users.length + 1,
    ...newUser,
    createdAt: new Date,
    updatedAt: null,
    deletedAt: null
  })
  setItemLocalStorage('users', users)
}

/**
 * Actualiza la información de un usuario existente.
 * @param {number} userId - El ID del usuario que se desea actualizar.
 * @param {Object} user - Un objeto que contiene las nuevas propiedades del usuario.
 */
export const updateUser = (user) => {
  const { id, name, lastName, age } = user
  const users = getItemLocalStorage('users')
  const updatedUsers = users.map(user => {
    if (user.id === id)
      return { ...user, name, lastName, age, updatedUser: new Date }
    return user
  })
  setItemLocalStorage('users', updatedUsers)
}

/**
 * Elimina un usuario por su ID.
 * @param {number} userId - El ID del usuario que se desea eliminar.
 */
export const deleteUser = userId => {
  const users = getItemLocalStorage('users')
  const updatedUsers = users.map(user => {
    if (user.id === userId) return { ...user, deletedAt: new Date }
    return user
  })
  console.log(updatedUsers)
  setItemLocalStorage('users', updatedUsers)
}
