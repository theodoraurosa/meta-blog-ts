import { Category } from "@prisma/client"
import { ICategoryRepository } from "../repositories/category-repository.interface"
import { CategoryNotFoundError } from "./errors/category-not-found-error"


export interface GetCategoryInput {
    id: string
  }
  
  export type GetCategoryOutput = Category
  
  export class GetCategoryUseCase {
    constructor(private categoryRepository: ICategoryRepository) {}
  
    async execute(input: GetCategoryInput): Promise<GetCategoryOutput> {
      const category = await this.categoryRepository.findById(input.id)
  
      if (!category) {
        throw new CategoryNotFoundError()
      }
  
      return category
    }
  }