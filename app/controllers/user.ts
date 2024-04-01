import { Request, Response } from 'express'
import userService from '../services/user'
import { handleHttp } from '../utils/error.handler'
import { User } from '../interfaces/user.interface'

type TController = (req: Request, res: Response) => void

export const getAllUsers: TController = async (_req, res) => {
  try {
    const users = await userService.getAllUsers()
    res.send(users)
  } catch (e) {
    handleHttp(res, 'ERROR_GET_USERS')
  }
}

export const getUserById: TController = async (req, res) => {
  try {
    const user = await userService.getUserById(Number(req.params.userId))
    console.log(user)
    if (user) res.status(200).send(user)
    else res.status(404).send({ message: 'El usuario no existe' })
  } catch (error) {
    handleHttp(res, 'ERROR_GET_USER')
  }
}

export const createUser: TController = async (req, res) => {
  try {
    const { body } = req
    if (
      !body.name ||
      !body.lastName ||
      !body.age ||
      !body.photoUri ||
      !body.color) {
      res.status(422).send({ message: 'Los datos no son validos' })
    }

    const newUser: User = {
      name: body.name,
      lastName: body.lastName,
      age: body.age,
      photoUri: body.photoUri,
      color: body.color,
    }

    const createdUsed = await userService.createUser(newUser)
    res.status(201).send(createdUsed)
  } catch (e) {
    handleHttp(res, 'ERROR_CREATE_USER')
  }
}

export const updateUserPut: TController = async (req, res) => {
  try {
    const { body } = req
    if (
      !body.name ||
      !body.lastName ||
      !body.age ||
      !body.photoUri ||
      !body.color) {
      res.status(422).send({ message: 'El recurso a actualizar no esta completo!' })
      return
    }
    const user = await userService.getUserById(Number(req.params.userId))
    if (!user) {
      res.status(404).send({
        error: 'Usuario no encontrado',
        message: 'El usuario con el ID especificado no existe en el servidor.'
      })
    } else {
      const newUserUpdated: User = { ...body }
      const updatedUser: User = await userService.updateUser(Number(req.params.userId), newUserUpdated)
      res.send(updatedUser)
    }
  } catch (e) {
    console.log(e)
    handleHttp(res, 'ERROR_UPDATED_USER')
  }
}

export const updateUserPatch: TController = async (req, res) => {
  try {
    const { body } = req
    const user = await userService.getUserById(Number(req.params.userId))
    if (!user) {
      res.status(404).send({
        error: 'Usuario no encontrado',
        message: 'El usuario con el ID especificado no existe en el servidor.'
      })
    } else {
      const newUserUpdated: User = { ...user, ...body }
      const updatedUser = await userService.updateUser(Number(req.params.userId), newUserUpdated)
      res.send(updatedUser)
    }
  } catch (e) {

  }
}

export const deleteUserById: TController = async (req, res) => {
  try {
    await userService.deleteUserById(Number(req.params.userId))
    res.status(200).send({
      message: 'Usuario eliminado con exito!'
    })
  } catch (e) {
    handleHttp(res, 'ERROR_DELETED_USER')
  }

}