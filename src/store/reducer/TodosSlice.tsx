import {
  createAsyncThunk,
  createSlice,
  nanoid,
  PayloadAction,
} from "@reduxjs/toolkit"
import axios from "axios"
import { RootState } from ".."

export interface Todo {
  id: string
  title: string
  completed: boolean
}

interface TodosState {
  todos: Array<Todo>
}

const initialState: TodosState = {
  todos: [],
}

// Reducer Thunk
const SERVER_URI = "https://jsonplaceholder.typicode.com/todos"
export const getTodos = createAsyncThunk("todos/fetchTodo", async () => {
  try {
    const response = await axios.get(SERVER_URI + "?_limit=5")
    return response.data
  } catch (error) {
    console.log(error)
  }
})

export const addTodoAsync = createAsyncThunk(
  "todos/addTodoAsync",
  async (title: string) => {
    const newTodo: Todo = {
      id: nanoid(),
      title,
      completed: false,
    }
    await axios.post(SERVER_URI, newTodo)
    return newTodo
  }
)

export const deleteTodoAsync = createAsyncThunk(
  "todos/deleteTodoAsync",
  async (id: string) => {
    await axios.delete(SERVER_URI + `/${id}`)
    return id
  }
)

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    toggleTodo: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.map((todo) => {
        if (action.payload === todo.id) {
          return {
            ...todo,
            completed: !todo.completed,
          }
        }
        return todo
      })
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTodos.pending, (state, action) => {
        console.log("fetching...")
      })
      .addCase(getTodos.fulfilled, (state, action) => {
        console.log("Done.")
        state.todos = action.payload
      })
      .addCase(getTodos.rejected, (state, action) => {
        console.log("fail to get todos!!!")
      })
      .addCase(addTodoAsync.pending, (state, action) => {
        console.log("Adding a todo...")
      })
      .addCase(addTodoAsync.fulfilled, (state, action) => {
        console.log("Done.")
        state.todos = [action.payload, ...state.todos]
      })
      .addCase(addTodoAsync.rejected, (state, action) => {
        console.log("Fail to add a todo!!!")
      })
      .addCase(deleteTodoAsync.pending, (state, action) => {
        console.log("Deleting a todo...")
      })
      .addCase(deleteTodoAsync.fulfilled, (state, action) => {
        console.log("Done.")
        state.todos = state.todos.filter((todo) => todo.id !== action.payload)
      })
      .addCase(deleteTodoAsync.rejected, (state, action) => {
        console.log("Fail to delete a todo!!!")
      })
  },
})

// Selector
export const todosSelector = (state: RootState) => state.todosReducer.todos

// Actions
export const { toggleTodo } = todosSlice.actions

// Reducer
export default todosSlice.reducer
