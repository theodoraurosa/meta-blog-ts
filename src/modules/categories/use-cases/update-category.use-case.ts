import { Category } from "@prisma/client"
import { CategoryNotFoundError } from "./errors/category-not-found-error"
import { CategoryAlreadyExistsError } from "./errors/category-already-exists-error"
import { ICategoryRepository } from "../repositories/category-repository.interface"


export interface updateCategoryInput {
  id: string
  name?: string
  description?: string
}

export type UpdateCategoryOutput = Category

export class UpdateCategoryUseCase {
  constructor(private categoryRepository: ICategoryRepository) { }

  async execute(input: updateCategoryInput): Promise<UpdateCategoryOutput> {
    const category = await this.categoryRepository.findById(input.id)

    if (!category) {
      throw new CategoryNotFoundError()
    }

    if (input.name && category.name !== input.name) {
      const categoryWithSameName = await this.categoryRepository.findByName(
        input.name,
      )

      if (categoryWithSameName) {
        throw new CategoryAlreadyExistsError()
      }
    }

    category.updated_at = new Date()

    const updateCategory = await this.categoryRepository.update({ ...category, ...input })

    return updateCategory
  }
}