import { randomUUID } from 'node:crypto'
import { Database } from './database.js'
import { buildRoutePath } from './utils/build-route-path.js'

const database = new Database()

export const routes = [
  {
    method: 'GET',
    path: buildRoutePath('/tasks'),
    handler: (req, res) => {
      const { search } = req.query

      const tasks = database.select('tasks', search ? {
        title: search,
        description: search
      } : null)

      return res.end(JSON.stringify(tasks))
    }
  },
  {
    method: 'POST',
    path: buildRoutePath('/tasks'),
    handler: (req, res) => {
      if (!req.body?.title || !req.body?.description) {
        return res.writeHead(400).end('Title and description can not be null')
      }

      const { title, description } = req.body
      const completed_at = null
      const updated_at = null
      const created_at = new Date().toISOString()

      const task = {
        id: randomUUID(),
        title,
        description,
        created_at,
        completed_at,
        updated_at,
      }

      database.insert('tasks', task)

      return res.writeHead(201).end()
    }
  },
  {
    method: 'PUT',
    path: buildRoutePath('/tasks/:id'),
    handler: (req, res) => {
      const { id } = req.params
      if (!req.body?.title && !req.body?.description) {
        return res.writeHead(400).end('Both title and description can not be null')
      }

      const { title, description } = req.body
      const data = {}
      if (title != null) data.title = title
      if (description != null) data.description = description

      const updated_at = new Date().toISOString()
      data.updated_at = updated_at

      try {
        database.update('tasks', id, data)
        return res.writeHead(204).end()
      } catch (error) {
        return res.writeHead(404).end(error.message)
      }
    }
  },
  {
    method: 'DELETE',
    path: buildRoutePath('/tasks/:id'),
    handler: (req, res) => {
      const { id } = req.params
      try {
        database.delete('tasks', id)

        return res.writeHead(204).end()
      } catch (error) {
        return res.writeHead(404).end(error.message)
      }
    }
  },
  {
    method: 'PATCH',
    path: buildRoutePath('/tasks/:id/complete'),
    handler: (req, res) => {
      const { id } = req.params
      try {
        const task = database.select('tasks', null, id)
        let completed_at = task.completed_at ? null : new Date().toISOString()
        database.update('tasks', id, {completed_at})

        return res.writeHead(204).end()
      } catch (error) {
        return res.writeHead(404).end(error.message)
      }
    }
  }
]