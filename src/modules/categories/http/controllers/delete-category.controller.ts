import { FastifyReply, FastifyRequest } from "fastify"
import { DeleteCategoryUseCase } from "../../use-cases/detele-category-use-case"
import { CategoryNotFoundError } from "../../use-cases/errors/category-not-found-error"
import { CategoryPrismaRepository } from "../../repositories/prisma/category-prisma.repository"
import { z } from "zod"


export class DeleteCategoryController {
    constructor(private categoryCase: DeleteCategoryUseCase) {}
  
    async handle(
      request: FastifyRequest,
      reply: FastifyReply,
    ): Promise<FastifyReply> {
      try {
        const input = deleteCategoryValidated.parse(request.params)
  
        await this.categoryCase.execute(input)
  
        return reply.status(204).send()
      } catch (err) {
        if (err instanceof CategoryNotFoundError) {
          return reply.status(404).send({ message: err.message })
        }
  
        throw err
      }
    }
  }
  
  const deleteCategoryValidated = z.object({
    id: z.string(),
  })
  
  export const deleteCategoryFactory = new DeleteCategoryController(
    new DeleteCategoryUseCase(new CategoryPrismaRepository()),
  )
  