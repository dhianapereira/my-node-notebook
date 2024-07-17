import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { knex } from '../database'
import crypto from 'node:crypto'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/', async (request, reply) => {
    const createUserBodySchema = z.object({
      name: z.string(),
      username: z.string(),
    })
    const { name, username } = createUserBodySchema.parse(request.body)

    let sessionId = request.cookies.sessionId
    if (!sessionId) {
      sessionId = crypto.randomUUID()

      reply.setCookie('sessionId', sessionId, {
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 7 days
      })
    }

    const userExists = await knex('users').where({ username }).first()
    if (userExists) {
      return reply.status(400).send({ message: 'User already exists' })
    }

    await knex('users').insert({
      id: crypto.randomUUID(),
      name,
      username,
      session_id: sessionId,
    })

    return reply.status(201).send()
  })
}
