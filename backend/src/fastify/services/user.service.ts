import { QueryOptions, Document, Model } from 'mongoose'
import { User } from '../../db/models/user'

export const userService = {
  findOne(where: QueryOptions<typeof User>) {
    return User.findOne(where)
  },
  create(user: { email: string; password: string }) {
    return User.create(user)
  },
  comparePasswords(user: { comparePassword: Function }, password: string) {
    // @TODO user type (comparePassword method)
    return user.comparePassword(password)
  },
}
