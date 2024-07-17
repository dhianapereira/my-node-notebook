import { app } from '../src/app'
import { execSync } from 'child_process'
import request from 'supertest'
import { afterAll, beforeAll, beforeEach, describe, test } from 'vitest'

describe('Users routes', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  beforeEach(() => {
    execSync('npm run knex migrate:rollback --all')
    execSync('npm run knex migrate:latest')
  })

  test('Should be able to create a new user', async () => {
    await request(app.server)
      .post('/users')
      .send({ name: 'John Doe', username: 'john_doe' })
      .expect(201)
  })
})
