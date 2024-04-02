import express from 'express'
import {
  createUser,
  deleteUserById,
  getAllUsers,
  getUserById,
  updateUserPut,
  updateUserPatch,
} from '../controllers/user'

const userRoutes = express.Router()

userRoutes
  .get('/', getAllUsers)
  .get('/:userId', getUserById)
  .post('/', createUser)
  .patch('/:userId', updateUserPatch)
  .put('/:userId', updateUserPut)
  .delete('/:userId', deleteUserById)

export default userRoutes