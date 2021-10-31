import React, { useEffect } from "react"
import {
  todosSelector,
  deleteTodoAsync,
  toggleTodo,
  getTodos,
  Todo,
} from "../store/reducer"
import classnames from "classnames"
import { useAppSelector, useAppDispatch } from "../store/hooks"

const TodosComponent = () => {
  const todos: Todo[] = useAppSelector(todosSelector)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getTodos())
  }, [dispatch])

  const handleDeleteTodo = (id: string) => {
    dispatch(deleteTodoAsync(id))
  }

  const handleOnchangeTodo = (id: string) => {
    dispatch(toggleTodo(id))
  }

  return (
    <div className="todos">
      {todos.map((todo) => (
        <div
          key={todo.id}
          className={classnames("todo-item", { active: todo.completed })}
        >
          <span>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={handleOnchangeTodo.bind(this, todo.id)}
            />{" "}
            {todo.title}
          </span>
          <button onClick={handleDeleteTodo.bind(this, todo.id)}>Delete</button>
        </div>
      ))}
    </div>
  )
}

export default TodosComponent
