import { FastifyReply, FastifyRequest } from "fastify"
import { ListPostUsecase } from "../../use-cases/list-post-use-case"
import { CollectionPresenter } from "../../../../utils/collection-presenter"
import { z } from "zod"
import { PostPrismaRepository } from "../../repositories/prisma/post-prisma.repository"





export class ListPostController {
    constructor(private postCase: ListPostUsecase) {}
  
    async handle(
      request: FastifyRequest,
      reply: FastifyReply,
    ): Promise<FastifyReply> {
      const input = listPostValidated.parse(request.query)
  
      const output = await this.postCase.execute(input)
  
      return reply.status(200).send(CollectionPresenter.serialize(output))
    }
  }
  
  const listPostValidated = z.object({
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
  
  export const listPostFactory = new ListPostController(
    new ListPostUsecase(new PostPrismaRepository()),
  )
  
  