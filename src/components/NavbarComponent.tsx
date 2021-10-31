import React from "react"
import { useAppSelector } from "../store/hooks"
import { todosSelector } from "../store/reducer"

const NavbarComponent = () => {
  const todos = useAppSelector(todosSelector)
  return (
    <div className="navbar">
      <div>Home</div>
      <div>About</div>
      <div>Totle todos: {todos.length}</div>
    </div>
  )
}

export default NavbarComponent
