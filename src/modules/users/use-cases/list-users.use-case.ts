import {
  IUserRepository,
  UserPaginationOutput,
} from '../repositories/user-repository.interface'

export interface ListUsersInput {
  filter?: string
  page?: number
  limit?: number
}

export type ListUsersOutput = UserPaginationOutput

export class ListUsersUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(input: ListUsersInput): Promise<ListUsersOutput> {
    const users = await this.userRepository.findAll(input)
    return users
  }
}
