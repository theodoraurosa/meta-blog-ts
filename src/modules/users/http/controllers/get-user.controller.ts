import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { GetUserUseCase } from '../../use-cases/get-user.use-case'
import { UserPrismaRepository } from '../../repositories/prisma/user-prisma.repository'
import { UserNotFoundError } from '../../use-cases/errors/user-not-found-error'

export class GetUserController {
  constructor(private useCase: GetUserUseCase) {}

  async handle(
    request: FastifyRequest,
    reply: FastifyReply,
  ): Promise<FastifyReply> {
    try {
      const input = getUserValidated.parse(request.params)

      const output = await this.useCase.execute(input)

      return reply.status(200).send({
        data: {
          ...output,
          password: undefined,
        },
      })
    } catch (err) {
      if (err instanceof UserNotFoundError) {
        return reply.status(404).send({ message: err.message })
      }

      throw err
    }
  }
}

const getUserValidated = z.object({
  id: z.string(),
})

export const getUserFactory = new GetUserController(
  new GetUserUseCase(new UserPrismaRepository()),
)
