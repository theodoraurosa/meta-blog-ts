import { Category, Prisma } from "@prisma/client"
import { PaginationInput, PaginationOutput } from "../../../utils/pagination.dto"



export type CategoryPaginationInput = PaginationInput
export type CategoryPaginationOutput = PaginationOutput<Category>


export interface ICategoryRepository{
    insert( data: Prisma.CategoryCreateInput) : Promise<Category>
    findById(id: string): Promise<Category | null>
    findByName(name: string): Promise<Category | null>
    findAll(params: CategoryPaginationInput): Promise<CategoryPaginationOutput>
    update(data: Category): Promise<Category>
    delete(id: string): Promise<void>
}