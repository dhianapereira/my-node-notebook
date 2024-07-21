import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { knex } from '../database'
import crypto from 'node:crypto'
import { checkSessionIdExists } from '../middlewares/check-session-id-exists'

export async function mealsRoutes(app: FastifyInstance) {
  app.post(
    '/',
    { preHandler: [checkSessionIdExists] },
    async (request, reply) => {
      const { sessionId } = request.cookies

      const user = await knex
        .select('users')
        .where({ session_id: sessionId })
        .first()
      if (!user) {
        return reply.status(401).send({ message: 'Unauthorized' })
      }

      const createMealBodySchema = z.object({
        name: z.string(),
        description: z.string(),
        date: z.coerce.date(),
        isOnDiet: z.boolean(),
      })
      const { name, description, isOnDiet, date } = createMealBodySchema.parse(
        request.body,
      )

      await knex('meals').insert({
        id: crypto.randomUUID(),
        user_id: user?.id,
        name,
        description,
        date: date.getTime(),
        is_on_diet: isOnDiet,
      })

      return reply.status(201).send()
    },
  )

  app.get(
    '/',
    { preHandler: [checkSessionIdExists] },
    async (request, reply) => {
      const { sessionId } = request.cookies

      const user = await knex
        .select('users')
        .where({ session_id: sessionId })
        .first()
      if (!user) {
        return reply.status(401).send({ message: 'Unauthorized' })
      }

      const meals = await knex('meals').where({ user_id: user?.id }).select()

      return reply.send({ meals })
    },
  )

  app.get(
    '/:id',
    { preHandler: [checkSessionIdExists] },
    async (request, reply) => {
      const { sessionId } = request.cookies

      const user = await knex
        .select('users')
        .where({ session_id: sessionId })
        .first()
      if (!user) {
        return reply.status(401).send({ message: 'Unauthorized' })
      }

      const getMealsParamsSchema = z.object({ id: z.string().uuid() })
      const { id } = getMealsParamsSchema.parse(request.params)

      const meal = await knex('meals').where({ user_id: user?.id, id }).first()

      if (!meal) {
        return reply.status(404).send({ error: 'Meal not found' })
      }

      return reply.send({ meal })
    },
  )
}
