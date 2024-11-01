import { Post } from "@prisma/client"
import { IPostRepository } from "../repositories/post-repositories.interface"
import { PostNotFoundError } from "./errors/post-not-found-error"



export interface GetPostInput{
    id: string
}
 export type GetPostOutput = Post

 export class GetPostUseCase{
    constructor(private postRepository: IPostRepository){}

    async execute(input:GetPostInput): Promise<GetPostOutput>{
    const post = await this.postRepository.findById(input.id)

    if (!post) {
        throw new PostNotFoundError()
        
    }
  return post
 }
}
