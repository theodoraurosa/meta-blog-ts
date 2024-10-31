import { User } from '@prisma/client'
import { hash } from 'bcryptjs'
import { IUserRepository } from '../repositories/user-repository.interface'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'
import { UserNotFoundError } from './errors/user-not-found-error'

export interface UpdateUserInput {
  id: string
  name?: string
  email?: string
  password?: string
  role?: 'admin' | 'user'
}

export type UpdateUserOutput = User

export class UpdateUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(input: UpdateUserInput): Promise<UpdateUserOutput> {
    const user = await this.userRepository.findById(input.id)

    if (!user) {
      throw new UserNotFoundError()
    }

    if (input.email && user.email !== input.email) {
      const userWithSameEmail = await this.userRepository.findByEmail(
        input.email,
      )

      if (userWithSameEmail) {
        throw new UserAlreadyExistsError()
      }
    }

    if (input.password) {
      const password_hash = await hash(input.password, 6)
      input.password = password_hash
    }

    const updatedUser = await this.userRepository.update({ ...user, ...input })

    return updatedUser
  }
}
