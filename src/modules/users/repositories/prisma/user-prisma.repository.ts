import { Prisma, User } from '@prisma/client'
import {
  IUserRepository,
  UserPaginationInput,
  UserPaginationOutput,
} from '../user-repository.interface'
import { prisma } from '../../../../lib/prisma'

export class UserPrismaRepository implements IUserRepository {
  async insert(data: Prisma.UserCreateInput): Promise<User> {
    const model = await prisma.user.create({
      data,
    })

    return model
  }

  async findById(id: string): Promise<User | null> {
    const model = await prisma.user.findUnique({
      where: {
        id,
      },
    })

    return model ?? null
  }

  async findByEmail(email: string): Promise<User | null> {
    const model = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    return model ?? null
  }

  async findAll({
    filter,
    page = 1,
    limit = 20,
  }: UserPaginationInput): Promise<UserPaginationOutput> {
    const query: Prisma.UserWhereInput = filter
      ? { name: { contains: filter } }
      : {}

    const total = await prisma.user.count({
      where: query,
    })

    const lastPage = Math.ceil(total / limit)

    const models = await prisma.user.findMany({
      where: query,
      take: limit,
      skip: (page - 1) * limit,
    })

    return {
      items: models,
      total,
      currentPage: page,
      lastPage,
      perPage: limit,
    }
  }

  async update(data: User): Promise<User> {
    const model = await prisma.user.update({
      where: {
        id: data.id,
      },
      data,
    })

    return model
  }

  async delete(id: string): Promise<void> {
    await prisma.user.delete({
      where: {
        id,
      },
    })
  }
}
