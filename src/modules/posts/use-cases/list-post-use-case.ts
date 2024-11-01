import { IPostRepository, PostPaginationOutput } from "../repositories/post-repositories.interface"



export interface ListPostInput{
    filter?: string
    page?: number
    limit?: number
}


export type ListpostOutput = PostPaginationOutput

export class ListPostUsecase {
    constructor(private postRepository: IPostRepository) { }

    async execute(input: ListPostInput): Promise<ListpostOutput> {
        const post = await this.postRepository.findAll(input)

        return post
    }

}

