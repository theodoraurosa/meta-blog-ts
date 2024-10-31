import { z } from "zod"

import { FastifyReply, FastifyRequest } from "fastify"
import { CategoryAlreadyExistsError } from "../../use-cases/errors/category-already-exists-error"
import { CreateCategoryUseCase } from "../../use-cases/create-category-use-case"
import { CategoryPrismaRepository } from "../../repositories/prisma/category-prisma.repository"



export class CreateCategoryController {
    constructor(private useCase: CreateCategoryUseCase) {}
  
    async handle(
      request: FastifyRequest,
      reply: FastifyReply,
    ): Promise<FastifyReply> {
      const input = createCategoryValidated.parse(request.body)
  
      try {
        await this.useCase.execute(input)
      } catch (err) {
        if (err instanceof CategoryAlreadyExistsError) {
          return reply.status(409).send({ message: err.message })
        }
  
        throw err
      }
  
      return reply.status(201).send()
    }
  }
  
  const createCategoryValidated = z.object({
    name: z.string(),
    description: z.string(),
   
  })
  
  export const createCategoryFactory = new CreateCategoryController(
    new CreateCategoryUseCase(new CategoryPrismaRepository()),
  )
  