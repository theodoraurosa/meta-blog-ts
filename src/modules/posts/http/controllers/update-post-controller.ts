import { string, z } from "zod"
import { PostPrismaRepository } from "../../repositories/prisma/post-prisma.repository"
import { UpdatePostUseCase } from "../../use-cases/update-post-use-case"
import { PostAlreadyExistsError } from "../../use-cases/errors/post-already-exists-error"
import { PostNotFoundError } from "../../use-cases/errors/post-not-found-error"
import { FastifyReply, FastifyRequest } from "fastify"


export class UpdatePostController {

    constructor(private postCase: UpdatePostUseCase) { }

    async handle(
        request: FastifyRequest,
        reply: FastifyReply,
    ): Promise<FastifyReply> {
        try {
            const input = updatePostValidated.parse({
                ...(request.params as FastifyRequest),
                ...(request.body as FastifyRequest),
            })

            
            const output = await this.postCase.execute(input)

            return reply.status(200).send({
                data: output
            })

        } catch (err) {
            if (err instanceof PostAlreadyExistsError) {
                return reply.status(409).send({ message: err.message })
            }

            if (err instanceof PostNotFoundError) {
                return reply.status(404).send({ message: err.message })
            }

            throw err
        }
    }
}

const updatePostValidated = z.object({
    id: z.string(),
    title: z.string().optional(),
    description: z.string().optional(),
    user_id: z.string().optional(),
    category_id: z.string().optional(),
    num_likes: z.number().optional(),
    num_views: z.number().optional(),
})

export const updatePostFactory = new UpdatePostController(
    new UpdatePostUseCase(new PostPrismaRepository()),
)
