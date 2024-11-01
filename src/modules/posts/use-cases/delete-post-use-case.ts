
import { IPostRepository } from "../repositories/post-repositories.interface";
import { PostNotFoundError } from "./errors/post-not-found-error";



export interface DeletePostInput{
    id: string
}

export type DeletePostOutput = void

export class DeletePostUseCase{
    constructor(private postRepository: IPostRepository){}

    async execute(input: DeletePostInput): Promise<DeletePostOutput>{
        const post = await this.postRepository.findById(input.id)

        if(!post) {
            throw new PostNotFoundError()
        }

        await this.postRepository.delete(post.id)
    }
}