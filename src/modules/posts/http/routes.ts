import { FastifyInstance } from "fastify"
import { createPostFactory } from "./controllers/create-post-controller"
import { listPostFactory } from "./controllers/list-post-controller"
import { getPostFactory } from "./controllers/get-post-controller"
import { updatePostFactory } from "./controllers/update-post-controller"
import { deletePostFactory } from "./controllers/delete-post-controller"



export async function postRoutes(app: FastifyInstance) {
    app.post('/posts', (req, res) => createPostFactory.handle(req, res))
    app.get('/posts', (req, res) => listPostFactory.handle(req, res))
    app.get('/posts/:id', (req, res) => getPostFactory.handle(req, res))
    app.patch('/posts/:id', (req, res) => updatePostFactory.handle(req, res))
    app.delete('/posts/:id', (req, res) => deletePostFactory.handle(req, res))
  }