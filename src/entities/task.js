import { randomUUID } from 'node:crypto'

export class TaskEntity {
  create(title, description) {
    return {
      id: randomUUID(),
      title,
      description,
      completed_at: null,
      created_at: new Date(),
      updated_at: new Date()
    }
  }
}