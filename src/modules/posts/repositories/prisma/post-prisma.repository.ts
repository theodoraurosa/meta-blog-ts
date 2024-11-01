import { Post, Prisma } from "@prisma/client";
import { prisma } from "../../../../lib/prisma";
import {
  IPostRepository,
  PostPaginationInput,
  PostPaginationOutput,
} from "../post-repositories.interface";

export class PostPrismaRepository implements IPostRepository {
  async insert(data: Prisma.PostUncheckedCreateInput): Promise<Post> {
    const model = await prisma.post.create({
      data,
    });

    return model;
  }

  async findById(id: string): Promise<Post | null> {
    const model = await prisma.post.findUnique({
      where: {
        id,
      },
    });

    return model ?? null;
  }

  async findByTitle(title: string): Promise<Post | null> {
    const model = await prisma.post.findFirst({
      where: {
        title,
      },
    });

    return model ?? null;
  }

  async findAll({
    filter,
    page = 1,
    limit = 20,
  }: PostPaginationInput): Promise<PostPaginationOutput> {
    const query: Prisma.PostWhereInput = filter
      ? { title: { contains: filter } }
      : {};

    const total = await prisma.post.count({
      where: query,
    });


    const lastPage = Math.ceil(total / limit)
    const models = await prisma.post.findMany({
      where: query,
      take: limit,
      skip: (page - 1) * limit,
    });

    return {
      items: models,
      total,
      currentPage: page,
      lastPage, 
      perPage: limit,
    }
  }

  async update(data: Post): Promise<Post> {
    const models = await prisma.post.update({
      where: {
        id: data.id,
      },
      data,
    })

    return models;
  }

  async delete(id: string): Promise<void> {
    await prisma.post.delete({
      where: {
        id,
      },
    });
  }
}
