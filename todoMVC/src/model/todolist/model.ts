import { Row } from 'electric-sql/dist/util/types'

export type FilterValues = 'all' | 'active' | 'completed'

export type TodoList = {
  id: string
  filter?: FilterValues
  editing?: string
}

// setting editing with a value because protocol does not allow nulls
export const createTodoList = (
  id: string,
  filter: FilterValues,
  editing = ''
): TodoList => {
  return { id, filter, editing }
}

export const resultsToTodoList = (r: Row) =>
  createTodoList(
    r.id as string,
    (r.filter ?? 'all') as FilterValues,
    r.editing as string
  )
