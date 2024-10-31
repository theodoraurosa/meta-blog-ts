import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { UpdateUserUseCase } from '../../use-cases/update-user.use-case'
import { UserAlreadyExistsError } from '../../use-cases/errors/user-already-exists-error'
import { UserPrismaRepository } from '../../repositories/prisma/user-prisma.repository'
import { UserNotFoundError } from '../../use-cases/errors/user-not-found-error'

export class UpdateUserController {
  constructor(private useCase: UpdateUserUseCase) {}

  async handle(
    request: FastifyRequest,
    reply: FastifyReply,
  ): Promise<FastifyReply> {
    try {
      const input = updateUserValidated.parse({
        ...(request.params as FastifyRequest),
        ...(request.body as FastifyRequest),
      })

      const output = await this.useCase.execute(input)

      return reply.status(200).send({
        data: {
          ...output,
          password: undefined,
        },
      })
    } catch (err) {
      if (err instanceof UserAlreadyExistsError) {
        return reply.status(409).send({ message: err.message })
      }

      if (err instanceof UserNotFoundError) {
        return reply.status(404).send({ message: err.message })
      }

      throw err
    }
  }
}

const updateUserValidated = z.object({
  id: z.string(),
  name: z.string().optional(),
  email: z.string().email().optional(),
  password: z.string().min(6).optional(),
  role: z.enum(['admin', 'user']).optional(),
})

export const updateUserFactory = new UpdateUserController(
  new UpdateUserUseCase(new UserPrismaRepository()),
)
