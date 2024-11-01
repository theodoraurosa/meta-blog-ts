import { FastifyReply, FastifyRequest } from "fastify"
import { DeletePostUseCase } from "../../use-cases/delete-post-use-case"
import { PostNotFoundError } from "../../use-cases/errors/post-not-found-error"
import { z } from "zod"
import { PostPrismaRepository } from "../../repositories/prisma/post-prisma.repository"


export class DeletePostController {
    constructor(private postCase: DeletePostUseCase) {}
  
    async handle(
      request: FastifyRequest,
      reply: FastifyReply,
    ): Promise<FastifyReply> {
      try {
        const input = deletePostValidated.parse(request.params)
  
        await this.postCase.execute(input)
  
        return reply.status(204).send()
      } catch (err) {
        if (err instanceof PostNotFoundError) {
          return reply.status(404).send({ message: err.message })
        }
  
        throw err
      }
    }
  }
  
  const deletePostValidated = z.object({
    id: z.string(),
  })
  
  export const deletePostFactory = new DeletePostController(
    new DeletePostUseCase(new PostPrismaRepository()),
  )
  