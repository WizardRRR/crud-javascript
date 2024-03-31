import { ResultSetHeader, RowDataPacket } from 'mysql2'
import { User } from '../interfaces/user.interface'
import { connection } from '../database/connecion'

type TGetAllUser = () => Promise<User[]>
type tGetUserById = (userId: number) => Promise<User | null>
type TCreateUser = (user: User) => Promise<User>
type TUpdateUser = (userId: number, user: User) => Promise<User>
type TDeleteUserById = (userId: number) => Promise<void>

interface IUserDB extends User, RowDataPacket { }

const getAllUsers: TGetAllUser = async () => {
  try {
    const query = `SELECT * FROM users WHERE deletedAt IS NULL`
    const [usersRows] = await connection.execute<IUserDB[]>(query)
    return usersRows
  } catch (e) {
    throw e
  }
}

const getUserById: tGetUserById = async (userId) => {
  try {
    const query = `SELECT * FROM users WHERE id = ? AND deletedAt IS NULL`
    const [rows] = await connection.execute<IUserDB[]>(query, [userId])
    return rows[0]
  } catch (e) {
    throw e
  }
}

const createUser: TCreateUser = async (user) => {
  try {
    const { name, lastName, age, color, photoUri } = user
    const values = [name, lastName, age, color, photoUri]
    const query = `
        INSERT INTO users (name, lastName, age, color, photoUri)
        VALUES (?, ?, ?, ?, ?)
      `
    const [result] = await connection.execute<ResultSetHeader>(query, values)
    const userCreated = await getUserById(result.insertId)
    return userCreated!
  } catch (e) {
    throw e
  }
}

const updateUser: TUpdateUser = async (userId, user) => {
  try {
    const { name, lastName, age, color, photoUri } = user
    const query = `
        UPDATE users
        SET name = ?, lastName = ?, age = ?, color = ?, photoUri = ?
        WHERE id = ?
      `
    const [result] = await connection.execute<ResultSetHeader>(query, [name, lastName, age, color, photoUri, userId])
    if (result.affectedRows === 0) throw new Error('El recurso no existe')
    else {
      const userCreated = await getUserById(userId)
      return userCreated!
    }
  } catch (e) {
    throw e
  }
}

const deleteUserById: TDeleteUserById = async (userId) => {
  try {
    const user = await getUserById(userId)
    if (user) {
      user!.deletedAt = new Date()
      const query = `UPDATE users set deletedAt = ? WHERE id = ?`
      await connection.execute<ResultSetHeader>(query, [user?.deletedAt, userId])
    }
  } catch (e) {
    throw e
  }
}

export default {
  getAllUsers,
  getUserById,
  createUser,
  deleteUserById,
  updateUser
}
