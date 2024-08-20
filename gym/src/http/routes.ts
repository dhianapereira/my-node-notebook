import { FastifyInstance } from 'fastify'
import { registerUser } from './controllers/register-user'
import { authenticate } from './controllers/authenticate'
import { profile } from './controllers/profile'
import { verifyJwt } from './middlewares/verify-jwt'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', registerUser)
  app.post('/sessions', authenticate)
  app.get('/me', { onRequest: [verifyJwt] }, profile)
}
