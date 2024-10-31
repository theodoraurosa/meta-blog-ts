import { User, Prisma } from '@prisma/client'
import {
  PaginationInput,
  PaginationOutput,
} from '../../../utils/pagination.dto'

export type UserPaginationInput = PaginationInput
export type UserPaginationOutput = PaginationOutput<User>

export interface IUserRepository {
  insert(data: Prisma.UserCreateInput): Promise<User>
  findById(id: string): Promise<User | null>
  findByEmail(email: string): Promise<User | null>
  findAll(params: UserPaginationInput): Promise<UserPaginationOutput>
  update(data: User): Promise<User>
  delete(id: string): Promise<void>
}
