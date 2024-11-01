import { Category } from "@prisma/client"
import { ICategoryRepository } from "../repositories/category-repository.interface"
import { CategoryAlreadyExistsError } from "./errors/category-already-exists-error"


export interface CreateCategoryInput {
  name: string
  description: string
}


export type CreateCategoryOutput = Category

export class CreateCategoryUseCase {
  constructor(private categoryRepository: ICategoryRepository) { }

  async execute(input: CreateCategoryInput): Promise<CreateCategoryOutput> {

    const categoryWithSameName = await this.categoryRepository.findByName(input.name)

    if (categoryWithSameName) {
      throw new CategoryAlreadyExistsError()
    }

    const category = await this.categoryRepository.insert(input)

    return category

  }

}