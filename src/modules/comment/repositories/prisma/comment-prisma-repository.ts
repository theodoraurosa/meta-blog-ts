import { Comment, Prisma } from "@prisma/client";
import { prisma } from "../../../../lib/prisma";
import {
  CommentPaginationInput,
  CommentPaginationOutput,
  ICommentRepository,
} from "../comment-repositories.interface";

export class CommentPrismaRepository implements ICommentRepository {
  

  async insert(data: Prisma.CommentUncheckedCreateInput): Promise<Comment> {
    const model = await prisma.comment.create({
      data
    })

    return model
  }

  async findById(id: string): Promise<Comment | null> {
   const model = await prisma.comment.findUnique({
     where: {
      id,
     },

   });
   return model ?? null
  }

  async findByPostId(post_id: string): Promise<Comment[]> {
    const models = await prisma.comment.findMany({
      where: {
        post_id
      }
    })

    return models
  }

  async updade(data: Comment): Promise<Comment> {
    const models = prisma.comment.update({
     where: {
      id: data.id,
     },
     data,
    })

    return models;
  }

  async delete(id: string): Promise<void> {
  await prisma.comment.delete({
    where: {
      id,
    },
  });
  }
 
}
