import { FastifyReply, FastifyRequest } from "fastify"
import { GetPostUseCase } from "../../use-cases/get-post-use-case"
import { PostNotFoundError } from "../../use-cases/errors/post-not-found-error"
import { PostPrismaRepository } from "../../repositories/prisma/post-prisma.repository"
import { z } from "zod"




export class GetPostController {
    constructor(private postCase: GetPostUseCase) {}
  
    async handle(
      request: FastifyRequest,
      reply: FastifyReply,
    ): Promise<FastifyReply> {
      try {
        const input = getPostValidated.parse(request.params)
  
        const output = await this.postCase.execute(input)
  
        return reply.status(200).send({
          data: {
            ...output,
            password: undefined,
          },
        })
      } catch (err) {
        if (err instanceof PostNotFoundError) {
          return reply.status(404).send({ message: err.message })
        }
  
        throw err
      }
    }
  }
  
  const getPostValidated = z.object({
    id: z.string(),
  })
  
  export const getPostFactory = new GetPostController(
    new GetPostUseCase(new PostPrismaRepository()),
  )
  