import { UserPaginationOutput } from "../../users/repositories/user-repository.interface"
import { CategoryPaginationOutput, ICategoryRepository } from "../repositories/category-repository.interface"


export interface ListCategoriesInput {
    filter?: string
    page?: number
    limit?: number
}

export type ListCategoriesOutput = CategoryPaginationOutput

export class ListCategoriesUsecase {
    constructor(private categoryRepository: ICategoryRepository) { }

    async execute(input: ListCategoriesInput): Promise<ListCategoriesOutput> {
        const categories = await this.categoryRepository.findAll(input)

        return categories
    }

}

