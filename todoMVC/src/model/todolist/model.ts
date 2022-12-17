type FilterValues = "all" | "active" | "completed"

export type TodoList = {
    id: string
    filter?: FilterValues
    editing?: string | null
}

// setting editing with a value because protocol does not allow nulls
export const createTodoList = (id: string, filter: FilterValues, editing: string | null = ""): TodoList => {
    return { id, filter, editing }
}

export const resultsToTodoList = (r: any) => (createTodoList(r.id, r.filter, r.editing))

