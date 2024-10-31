import { Category, Prisma } from "@prisma/client"
import { prisma } from "../../../../lib/prisma"
import { CategoryPaginationInput, CategoryPaginationOutput, ICategoryRepository } from "../category-repository.interface"



export class CategoryPrismaRepository implements ICategoryRepository {
    async insert(data: Prisma.CategoryCreateInput): Promise<Category> {
        const model = await prisma.category.create({
            data,
        })

        return model
    }

    async findById(id: string): Promise<Category | null> {
        const model = await prisma.category.findUnique({
            where: {
                id,
            },
        })

        return model ?? null
    }

    async findByName(name: string): Promise<Category | null> {
        const model = await prisma.category.findFirst({
            where: {
                name
            }
        })

        return model ?? null
    }

    async findAll({
        filter,
        page = 1,
        limit = 20,
    }: CategoryPaginationInput): Promise<CategoryPaginationOutput> {
        const query: Prisma.CategoryWhereInput = filter
            ? { name: { contains: filter } }
            : {}

        const total = await prisma.category.count({
            where: query,
        })


        const lastPage = Math.ceil(total / limit)

        const models = await prisma.category.findMany({
            where: query,
            take: limit,
            skip: (page - 1) * limit,
        })

        return {
            items: models,
            total,
            currentPage: page,
            lastPage,
            perPage: limit,
        }
    }


    async update(data: Category): Promise<Category> {
        const model = await prisma.category.update({
            where: {
                id: data.id,
            },
            data,
        })

        return model
    }



    async delete(id: string): Promise<void> {
        await prisma.category.delete({
            where: {
                id,
            },
        })
    }
}
