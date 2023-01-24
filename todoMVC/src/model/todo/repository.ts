import { Database } from 'electric-sql/browser'
import { Data } from 'electric-sql/dist/sockets'
import { Todo } from './model'

type Filter = {
  listid: string
  completed?: boolean
}

export class TodoRepository {
  private db: Database

  constructor(db: Database) {
    this.db = db
  }

  async save(todo: Todo): Promise<Database> {
    const sql = 'INSERT INTO todo(id, listid, text) VALUES (?, ?, ?)'
    const args = [todo.id, todo.listid, todo.text]

    console.log(`SQL: ${sql}, ${args}`)
    return this.db.run(sql, args)
  }

  async update(todo: Todo): Promise<Database> {
    const sql = 'UPDATE todo SET text = ?, completed = ? WHERE id = ?'
    const args = [todo.text, todo.completed ? 1 : 0, todo.id]

    console.log(`SQL: ${sql}, ${args}`)
    return this.db.run(sql, args)
  }

  async updateAll(filter: Filter): Promise<Database> {
    const sql = 'UPDATE todo SET completed = ? WHERE listid = ?'
    const args = [filter.completed ? 1 : 0, filter.listid]

    console.log(`SQL: ${sql}, ${args}`)
    return this.db.run(sql, args)
  }

  async delete(todo: Todo): Promise<Database> {
    const sql = 'DELETE FROM todo WHERE id = ?'
    const args = [todo.id]

    console.log(`SQL: ${sql}, ${args}`)
    return this.db.run(sql, args)
  }

  async deleteAll(filter: Filter): Promise<Database> {
    const sql = 'DELETE FROM todo WHERE completed = ?'
    const args = [filter.completed ? 1 : 0]

    console.log(`SQL: ${sql}, ${args}`)
    return this.db.run(sql, args)
  }

  async list(filter: Filter): Promise<Todo[]> {
    let sql = 'SELECT id, listid, text, completed FROM todo'
    const where = []
    const args = []
    if (filter.listid) {
      where.push('listid = ?')
      args.push(filter.listid)
    }
    if (filter.completed != undefined) {
      where.push('completed = ?')
      args.push(filter.completed ? 1 : 0)
    }

    if (where.length > 0) {
      sql = sql + ' WHERE ' + where.join(' AND ')
    }

    console.log(`SQL: ${sql} ${args}`)

    const res = await this.db.exec(sql, args)
    console.log(`res: ${JSON.stringify(res)}`)

    if (res.length == 0) {
      return []
    }

    const { columns, values } = res[0]
    return values.map((value) => ({
      id: value[columns.indexOf('id')] as string,
      listid: value[columns.indexOf('listid')] as string,
      text: value[columns.indexOf('text')] as string,
      completed: Boolean(value[columns.indexOf('completed')]),
    }))
  }
}
