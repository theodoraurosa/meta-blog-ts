import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { CreateUserUseCase } from '../../use-cases/create-user.use-case'
import { UserAlreadyExistsError } from '../../use-cases/errors/user-already-exists-error'
import { UserPrismaRepository } from '../../repositories/prisma/user-prisma.repository'

export class CreateUserController {
  constructor(private useCase: CreateUserUseCase) {}

  async handle(
    request: FastifyRequest,
    reply: FastifyReply,
  ): Promise<FastifyReply> {
    const input = createUserValidated.parse(request.body)

    try {
      await this.useCase.execute(input)
    } catch (err) {
      if (err instanceof UserAlreadyExistsError) {
        return reply.status(409).send({ message: err.message })
      }

      throw err
    }

    return reply.status(201).send()
  }
}

const createUserValidated = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(['admin', 'user']).default('user'),
})

export const createUserFactory = new CreateUserController(
  new CreateUserUseCase(new UserPrismaRepository()),
)
