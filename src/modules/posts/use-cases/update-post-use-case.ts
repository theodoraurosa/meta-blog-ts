import { Post } from "@prisma/client";
import { IPostRepository } from "../repositories/post-repositories.interface";
import { promises } from "dns";
import { PostNotFoundError } from "./errors/post-not-found-error";
import { PostAlreadyExistsError } from "./errors/post-already-exists-error";

export interface updatePostInput {
  id: string;
  user_id?: string;
  category_id?: string;
  title?: string;
  description?: string;
  num_likes?: number;
  num_views?: number;
  Image_url?: string;
}

export type UpdatePostOutput = Post;

export class UpdatePostUseCase {
  constructor(private postRepository: IPostRepository) {}

  async execute(input: updatePostInput): Promise<UpdatePostOutput> {
    const post = await this.postRepository.findById(input.id);

    if (!post) {
      throw new PostNotFoundError();
    }

    post.updated_at = new Date();

    const updatePost = await this.postRepository.update({ ...post, ...input });

    return updatePost;
  }
}
