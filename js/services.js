import { getItemLocalStorage, setItemLocalStorage } from "./localstorage.js";

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

/** @returns {Array<User>}*/
export const getAllUsers = () => getItemLocalStorage("users") ?? [];

/**
 * @param {number} userId
 * @returns {User|null}
 */
export const getUserById = (userId) => {
  const users = getItemLocalStorage("users");
  return users.find((user) => user.id === userId);
};

/**
 * @param {newUser} newUser
 */
export const saveUser = (newUser) => {
  const users = getAllUsers();
  const newId = users.length > 0 ? users[users.length - 1].id + 1 : 1; // Calcula el nuevo ID
  const user = {
    id: newId,
    ...newUser,
    createdAt: new Date(),
    updatedAt: null,
    deletedAt: null,
  };
  users.push(user);
  setItemLocalStorage("users", users);
  return user; // Retornar el usuario creado
};

/**
 * @param {User} updateUser
 */
export const updateUser = (updateUser) => {
  const users = getAllUsers();
  const updatedUsers = users.map((user) => {
    if (user.id === updateUser.id) {
      return { ...user, ...updateUser, updatedAt: new Date() };
    }
    return user;
  });
  setItemLocalStorage("users", updatedUsers);
};

/**
 * @param {number} userId
 */
export const deleteUser = (userId) => {
  const users = getAllUsers();
  const updatedUsers = users.map((user) => {
    if (user.id === userId) {
      return { ...user, deletedAt: new Date() };
    }
    return user;
  });
  setItemLocalStorage("users", updatedUsers);
};
