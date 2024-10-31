import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { DeleteUserUseCase } from '../../use-cases/delete-user.use-case'
import { UserPrismaRepository } from '../../repositories/prisma/user-prisma.repository'
import { UserNotFoundError } from '../../use-cases/errors/user-not-found-error'

export class DeleteUserController {
  constructor(private useCase: DeleteUserUseCase) {}

  async handle(
    request: FastifyRequest,
    reply: FastifyReply,
  ): Promise<FastifyReply> {
    try {
      const input = deleteUserValidated.parse(request.params)

      await this.useCase.execute(input)

      return reply.status(204).send()
    } catch (err) {
      if (err instanceof UserNotFoundError) {
        return reply.status(404).send({ message: err.message })
      }

      throw err
    }
  }
}

const deleteUserValidated = z.object({
  id: z.string(),
})

export const deleteUserFactory = new DeleteUserController(
  new DeleteUserUseCase(new UserPrismaRepository()),
)
