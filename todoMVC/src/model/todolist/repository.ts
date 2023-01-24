import { Database } from 'electric-sql/browser'
import { FilterValues, TodoList } from './model'

export class TodoListRepository {
  private db: Database

  constructor(db: Database) {
    this.db = db
  }

  async getById(listid: string): Promise<TodoList | null> {
    const sql = 'SELECT id, editing, filter FROM todolist WHERE id = ?'
    const args = [listid]

    const res = await this.db.exec(sql, args)

    if (res.length == 0) {
      return null
    }

    const { columns, values } = res[0]
    return {
      id: values[0][columns.indexOf('id')] as string,
      editing: values[0][columns.indexOf('editing')] as string,
      filter: values[0][columns.indexOf('filter')] as FilterValues,
    }
  }

  async save(todoList: TodoList): Promise<Database> {
    const sql =
      'INSERT INTO todolist(id, filter, editing) values (?, ?, ?) ON CONFLICT DO UPDATE SET filter = ?, editing = ?'
    const args = [
      todoList.id,
      todoList.filter ? todoList.filter : 'all',
      todoList.editing ? todoList.editing : '',
      todoList.filter ? todoList.filter : 'all',
      todoList.editing ? todoList.editing : '',
    ]

    return this.db.run(sql, args)
  }

  async update(todoList: TodoList): Promise<Database> {
    const set: string[] = []
    const args = []

    if (todoList.editing !== undefined) {
      set.push('editing = ?')
      args.push(todoList.editing)
    }

    if (todoList.filter !== undefined) {
      set.push('filter = ?')
      args.push(todoList.filter)
    }

    if (set.length == 0) {
      throw new Error('filter or editing must be set')
    }

    args.push(todoList.id)

    const sql = `UPDATE todolist SET ${set.join(' , ')} WHERE id = ?`

    return this.db.run(sql, args)
  }
}
