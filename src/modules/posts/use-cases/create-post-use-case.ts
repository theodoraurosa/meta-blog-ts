import { Post } from "@prisma/client";
import { IPostRepository } from "../repositories/post-repositories.interface";
import { IUserRepository } from "../../users/repositories/user-repository.interface";
import { ICategoryRepository } from "../../categories/repositories/category-repository.interface";
import { UserNotFoundError } from "../../users/use-cases/errors/user-not-found-error";

export interface CreatePostInput {
  user_id: string;
  category_id: string;
  title: string;
  description: string;
  image_url?: string;
}

export type CreatePostOutput = Post;

export class CreatePostUseCase {
  constructor(
    private postRepository: IPostRepository,
    private userRepository: IUserRepository,
    private categoryRepository: ICategoryRepository
  ) {}

  async execute(input: CreatePostInput): Promise<CreatePostOutput> {
    const user = await this.userRepository.findById(input.user_id)

    if(!user){
      throw new UserNotFoundError()
    }
    
    const post = await this.postRepository.insert(input);

    return post;
  }
}
