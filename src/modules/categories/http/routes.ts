import { FastifyInstance } from "fastify"
import { createCategoryFactory } from "./controllers/create-category.controller"
import { deleteCategoryFactory } from "./controllers/delete-category.controller"
import { getCategoryFactory } from "./controllers/get-category.controller"
import { listCategoriesFactory } from "./controllers/list-category.controller"
import { updateCategoryFactory } from "./controllers/update-category.controller"




export async function categoriesRoutes(app: FastifyInstance) {
    app.post('/categories', (req, res) => createCategoryFactory.handle(req, res))
    app.get('/categories', (req, res) => listCategoriesFactory.handle(req, res))
    app.get('/categories/:id', (req, res) => getCategoryFactory.handle(req, res))
    app.patch('/categories/:id', (req, res) => updateCategoryFactory.handle(req, res))
    app.delete('/categories/:id', (req, res) => deleteCategoryFactory.handle(req, res))
  }

