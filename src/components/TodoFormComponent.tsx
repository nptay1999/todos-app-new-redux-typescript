import React, { useState, FormEvent, ChangeEvent } from "react"
import { useAppDispatch } from "../store/hooks"
import { addTodoAsync } from "../store/reducer"

const TodoFormComponent = () => {
  const [title, setTitle] = useState("")
  const dispatch = useAppDispatch()

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value)
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const newTitle = title.trim()
    if (newTitle.length !== 0) {
      dispatch(addTodoAsync(newTitle))
      setTitle("")
    }
  }

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={handleChange}
        placeholder="Enter your task..."
      />
    </form>
  )
}

export default TodoFormComponent
