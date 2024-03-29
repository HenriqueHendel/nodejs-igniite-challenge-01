import { Database } from './database.js'
import { TaskEntity } from './entities/task.js'
import { buildRoutePath } from './utils/build-route-path.js'

const database = new Database()

export const routes = [
  {
    method: 'GET',
    path: buildRoutePath('/tasks'),
    handler (req, res) {
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
    handler (req, res) {
      const { title, description } = req.body
      if(!title || !description) {
        return res.writeHead(400).end('Lack of fields to update task')
      }
      const taskEntity = new TaskEntity().create(title, description)
  
      database.insert('tasks', taskEntity)
  
      return res.writeHead(201).end()
    }
  },
  {
    method: 'PUT',
    path: buildRoutePath('/tasks/:id'),
    handler: (req, res) => {
      const { id } = req.params

      const taskExists = database.get('tasks', id)
      if(!taskExists) {
        return res.writeHead(400).end('Task not found')
      } 

      const data = req.body
      if(!data.title || !data.description) {
        return res.writeHead(400).end('Lack of fields to update task')
      }

     database.update('tasks', id, data)

      return res.writeHead(204).end()
    }
  },
  {
    method: 'PATCH',
    path: buildRoutePath('/tasks/:id/complete'),
    handler: (req, res) => {
      const { id } = req.params

      const taskExists = database.get('tasks', id)
      if(!taskExists) {
        return res.writeHead(400).end('Task not found')
      } 

      database.update('tasks', id, { completed_at: new Date() })

      return res.writeHead(204).end()
    }
  },
  {
    method: 'DELETE',
    path: buildRoutePath('/tasks/:id'),
    handler: (req, res) => {
      const { id } = req.params

      const taskExists = database.get('tasks', id)
      if(!taskExists) {
        return res.writeHead(400).end('Task not found')
      } 


      database.delete('tasks', id)

      return res.writeHead(204).end()
    }
  }
]