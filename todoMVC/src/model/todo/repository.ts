import { Todo } from './model'
import { dbDescription, todo } from '../../generated/models'
import { DalTables } from 'electric-sql/client/model'

type Filter = {
  listid: string
  completed?: boolean
}

export class TodoRepository {
  constructor(private db: DalTables<typeof dbDescription>) {}

  async save(todo: Todo): Promise<void> {
    await this.db.todo.create({
      data: {
        ...todo,
        completed: todo.completed ? 1 : 0
      }
    })
  }

  async update(todo: Todo): Promise<void> {
    await this.db.todo.update({
      data: {
        text: todo.text,
        completed: todo.completed ? 1 : 0
      },
      where: {
        id: todo.id
      }
    })
  }

  async updateAll(filter: Filter): Promise<void> {
    await this.db.todo.updateMany({
      data: {
        completed: filter.completed ? 1 : 0
      },
      where: {
        listid: filter.listid
      }
    })
  }

  async delete(todo: Todo): Promise<void> {
    await this.db.todo.delete({
      where: {
        id: todo.id
      }
    })
  }

  async deleteAll(filter: Filter): Promise<void> {
    await this.db.todo.deleteMany({
      where: {
        completed: filter.completed ? 1 : 0
      }
    })
  }

  async list(filter: Filter): Promise<Todo[]> {
    let filters: Partial<todo> = filter.listid ? { listid: filter.listid } : {}
    if (filter.completed != undefined) {
      filters = {
        ...filters,
        completed: filter.completed ? 1 : 0
      }
    }

    const todos = await this.db.todo.findMany({
      where: filters
    })

    return todos.map(todo => {
      return {
        ...todo,
        completed: Boolean(todo.completed)
      }
    })
  }
}
