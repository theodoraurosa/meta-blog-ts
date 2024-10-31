import { FastifyReply, FastifyRequest } from "fastify"
import { CategoryAlreadyExistsError } from "../../use-cases/errors/category-already-exists-error"
import { UpdateCategoryUseCase } from "../../use-cases/update-category.use-case"
import { CategoryNotFoundError } from "../../use-cases/errors/category-not-found-error"
import { z } from "zod"
import { CategoryPrismaRepository } from "../../repositories/prisma/category-prisma.repository"


export class UpdateCategoryController {

    constructor(private useCase: UpdateCategoryUseCase) { }

    async handle(
        request: FastifyRequest,
        reply: FastifyReply,
    ): Promise<FastifyReply> {
        try {
            const input = updateCategoryValidated.parse({
                ...(request.params as FastifyRequest),
                ...(request.body as FastifyRequest),
            })

            const output = await this.useCase.execute(input)

            return reply.status(200).send({
                data: output
            })

        } catch (err) {
            if (err instanceof CategoryAlreadyExistsError) {
                return reply.status(409).send({ message: err.message })
            }

            if (err instanceof CategoryNotFoundError) {
                return reply.status(404).send({ message: err.message })
            }

            throw err
        }
    }
}

const updateCategoryValidated = z.object({
    id: z.string(),
    name: z.string().optional(),
    description: z.string().optional(),
})

export const updateCategoryFactory = new UpdateCategoryController(
    new UpdateCategoryUseCase(new CategoryPrismaRepository()),
)
