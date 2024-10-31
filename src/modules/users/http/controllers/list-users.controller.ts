import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { ListUsersUseCase } from '../../use-cases/list-users.use-case'
import { UserPrismaRepository } from '../../repositories/prisma/user-prisma.repository'
import { CollectionPresenter } from '../../../../utils/collection-presenter'


export class ListUsersController {
  constructor(private useCase: ListUsersUseCase) {}

  async handle(
    request: FastifyRequest,
    reply: FastifyReply,
  ): Promise<FastifyReply> {
    const input = listUsersValidated.parse(request.query)

    const output = await this.useCase.execute(input)

    return reply.status(200).send(CollectionPresenter.serialize(output))
  }
}

const listUsersValidated = z.object({
  filter: z.string().optional(),
  page: z
    .string()
    .transform((val) => parseInt(val, 10))
    .optional()
    .or(z.number()),
  limit: z
    .string()
    .transform((val) => parseInt(val, 10))
    .optional()
    .or(z.number()),
})

export const listUsersFactory = new ListUsersController(
  new ListUsersUseCase(new UserPrismaRepository()),
)
