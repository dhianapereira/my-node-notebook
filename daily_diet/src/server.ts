import fastify from 'fastify'
import { env } from './env'
import { knex } from './database'
import crypto from 'node:crypto'

const app = fastify()

app.get('/hello', async () => {
  const user = await knex('users')
    .insert({
      id: crypto.randomUUID(),
      name: 'João',
    })
    .returning('*')

  return user
})

app
  .listen({
    port: env.PORT,
  })
  .then(() => {
    console.log('HTTP server running...')
  })
