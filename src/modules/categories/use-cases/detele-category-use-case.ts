import { ICategoryRepository } from "../repositories/category-repository.interface"
import { CategoryNotFoundError } from "./errors/category-not-found-error"

export interface DeleteCategoryInput {
    id: string
  }
  
  export type DeleteCategoryOutput = void
  
  export class DeleteCategoryUseCase {
    constructor(private categoryRepository: ICategoryRepository) {}
  
    async execute(input: DeleteCategoryInput): Promise<DeleteCategoryOutput> {
      const category = await this.categoryRepository.findById(input.id)
  
      if (!category) {
        throw new CategoryNotFoundError()
      }
  
      await this.categoryRepository.delete(category.id)
    }
  }