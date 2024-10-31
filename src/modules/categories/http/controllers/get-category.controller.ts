import { FastifyReply, FastifyRequest } from "fastify"
import { GetCategoryUseCase } from "../../use-cases/get-category.use-case"
import { CategoryNotFoundError } from "../../use-cases/errors/category-not-found-error"
import { z } from "zod"
import { CategoryPrismaRepository } from "../../repositories/prisma/category-prisma.repository"



export class GetCategoryController {
    constructor(private categoryCase: GetCategoryUseCase) {}
  
    async handle(
      request: FastifyRequest,
      reply: FastifyReply,
    ): Promise<FastifyReply> {
      try {
        const input = getCategoryValidated.parse(request.params)
  
        const output = await this.categoryCase.execute(input)
  
        return reply.status(200).send({
          data: {
            ...output,
            password: undefined,
          },
        })
      } catch (err) {
        if (err instanceof CategoryNotFoundError) {
          return reply.status(404).send({ message: err.message })
        }
  
        throw err
      }
    }
  }
  
  const getCategoryValidated = z.object({
    id: z.string(),
  })
  
  export const getCategoryFactory = new GetCategoryController(
    new GetCategoryUseCase(new CategoryPrismaRepository()),
  )
  