import React from "react"
import "./App.scss"
import NavbarComponent from "./components/NavbarComponent"
import TodoFormComponent from "./components/TodoFormComponent"
import TodosComponent from "./components/TodosComponent"

function App() {
  return (
    <div className="App">
      <h1>My New Redux Application</h1>
      <NavbarComponent />
      <TodoFormComponent />
      <TodosComponent />
    </div>
  )
}

export default App
