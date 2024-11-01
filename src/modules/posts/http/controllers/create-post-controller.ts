import { FastifyReply, FastifyRequest } from "fastify";
import { CreatePostUseCase } from "../../use-cases/create-post-use-case";
import { z } from "zod";
import { PostPrismaRepository } from "../../repositories/prisma/post-prisma.repository";
import { UserPrismaRepository } from "../../../users/repositories/prisma/user-prisma.repository";
import { CategoryPrismaRepository } from "../../../categories/repositories/prisma/category-prisma.repository";
import { UserNotFoundError } from "../../../users/use-cases/errors/user-not-found-error";
import { CategoryNotFoundError } from "../../../categories/use-cases/errors/category-not-found-error";

export class CreatePostController {
  constructor(private useCase: CreatePostUseCase) {}

  async handle(
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<FastifyReply> {
    const input = createPostValidated.parse(request.body);

    try {
      await this.useCase.execute(input);
    } catch (err) {
      if (err instanceof UserNotFoundError) {
        return reply.status(404).send({ message: err.message });
      }

      if (err instanceof CategoryNotFoundError) {
        return reply.status(404).send({ message: err.message });
      }

      throw err;
    }

    return reply.status(201).send();
  }
}

const createPostValidated = z.object({
  user_id: z.string(),
  category_id: z.string(),
  title: z.string(),
  description: z.string(),
});

export const createPostFactory = new CreatePostController(
  new CreatePostUseCase(
    new PostPrismaRepository(),
    new UserPrismaRepository(),
    new CategoryPrismaRepository()
  )
);
