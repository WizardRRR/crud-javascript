export interface User {
  readonly id?: number
  name: string,
  lastName: string,
  color: string,
  photoUri: string,
  age: number,
  createdAt?: Date,
  updatedAt?: Date,
  deletedAt?: Date,
}