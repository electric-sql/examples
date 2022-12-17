export type TodoList = any

export type Todo = {
    id: string
    listid: string
    text: string
    completed: boolean
    }
    
export const createTodo = (id: string, listid: string, text: string, completed: boolean = false) : Todo => {
        return {id, listid, text, completed}
}

export const resultsToTodos = (todos: any[]) => {
    const { all, active, completed }: { all: Todo[], active: Todo[], completed: Todo[] } =
      { all: [], active: [], completed: [] }
  
    todos.map((t: any) => {
      const todo = createTodo(t.id, t.listid, t.text, t.completed)
      all.push(todo)
      if (t.completed) {
        completed.push(todo)
      } else {
        active.push(todo)
      }
    })
  
    return { all, active, completed }
  }