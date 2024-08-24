import { FastifyInstance } from 'fastify'
import { registerUser } from './register-user'
import { authenticate } from './authenticate'
import { profile } from './profile'
import { verifyJwt } from '../../middlewares/verify-jwt'

export async function userRoutes(app: FastifyInstance) {
  app.post('/users', registerUser)
  app.post('/sessions', authenticate)
  app.get('/me', { onRequest: [verifyJwt] }, profile)
}
