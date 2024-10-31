import { IUserRepository } from '../repositories/user-repository.interface'
import { UserNotFoundError } from './errors/user-not-found-error'

export interface DeleteUserInput {
  id: string
}

export type DeleteUserOutput = void

export class DeleteUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(input: DeleteUserInput): Promise<DeleteUserOutput> {
    const user = await this.userRepository.findById(input.id)

    if (!user) {
      throw new UserNotFoundError()
    }

    await this.userRepository.delete(user.id)
  }
}
