import { FastifyReply, FastifyRequest } from "fastify"
import { ListCategoriesUsecase } from "../../use-cases/list-category-use-case"
import { CollectionPresenter } from "../../../../utils/collection-presenter"
import { z } from "zod"
import { CategoryPrismaRepository } from "../../repositories/prisma/category-prisma.repository"




export class ListCategoriesController {
    constructor(private categoryCase: ListCategoriesUsecase) {}
  
    async handle(
      request: FastifyRequest,
      reply: FastifyReply,
    ): Promise<FastifyReply> {
      const input = listCategoriesValidated.parse(request.query)
  
      const output = await this.categoryCase.execute(input)
  
      return reply.status(200).send(CollectionPresenter.serialize(output))
    }
  }
  
  const listCategoriesValidated = z.object({
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
  
  export const listCategoriesFactory = new ListCategoriesController(
    new ListCategoriesUsecase(new CategoryPrismaRepository()),
  )
  
  