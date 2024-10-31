import { User } from '@prisma/client'
import { IUserRepository } from '../repositories/user-repository.interface'
import { UserNotFoundError } from './errors/user-not-found-error'

export interface GetUserInput {
  id: string
}

export type GetUserOutput = User

export class GetUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(input: GetUserInput): Promise<GetUserOutput> {
    const user = await this.userRepository.findById(input.id)

    if (!user) {
      throw new UserNotFoundError()
    }

    return user
  }
}
