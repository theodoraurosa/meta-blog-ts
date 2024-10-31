import { User } from '@prisma/client'
import { hash } from 'bcryptjs'
import { IUserRepository } from '../repositories/user-repository.interface'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

export interface CreateUserInput {
  name: string
  email: string
  password: string
  role: 'admin' | 'user'
}

export type CreateUserOutput = User

export class CreateUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(input: CreateUserInput): Promise<CreateUserOutput> {
    const password_hash = await hash(input.password, 6)

    const userWithSameEmail = await this.userRepository.findByEmail(input.email)

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }

    const user = await this.userRepository.insert({
      ...input,
      password: password_hash,
    })

    return user
  }
}
