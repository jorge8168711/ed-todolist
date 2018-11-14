import { d } from './helpers'
import ToDoList from './ToDoList'

export const task = d.querySelector('#taskInput')
export const list = d.querySelector('#todoList')
export const errorMessage = d.querySelector('#errorMessage')
const todo = new ToDoList('NiceTodoList')

todo.render()
