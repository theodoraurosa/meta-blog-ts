import { FastifyInstance } from "fastify"
import { createUserFactory } from "./controllers/create-user.controller"
import { listUsersFactory } from "./controllers/list-users.controller"
import { getUserFactory } from "./controllers/get-user.controller"
import { updateUserFactory } from "./controllers/update-user.controller"
import { deleteUserFactory } from "./controllers/delete-user.controller"




export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', (req, res) => createUserFactory.handle(req, res))
  app.get('/users', (req, res) => listUsersFactory.handle(req, res))
  app.get('/users/:id', (req, res) => getUserFactory.handle(req, res))
  app.patch('/users/:id', (req, res) => updateUserFactory.handle(req, res))
  app.delete('/users/:id', (req, res) => deleteUserFactory.handle(req, res))
}
