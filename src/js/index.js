import { d } from './helpers'
import ToDoList from './ToDoList'
import Tasks from './Tasks'

// DOM ELEMENTS
export const taskInput = d.querySelector('#taskInput')
export const tasksList = d.querySelector('#todoList')
export const completedTasksList = d.querySelector('#completedTasks')

export const errorMessage = d.querySelector('#errorMessage')

export const tasks = new Tasks('NiceTodoList')
export const todoList = new ToDoList()

// task input listeners
taskInput.addEventListener('keyup', e => { todoList.addNewTask(e) })
taskInput.addEventListener('blur', () => { todoList.toggleErrorMessage(false) })

// task-list listeners
tasksList.addEventListener('click', e => { todoList.editTask(e) })
tasksList.addEventListener('click', e => { todoList.removeTask(e) })
completedTasksList.addEventListener('click', e => { todoList.editTask(e) })
completedTasksList.addEventListener('click', e => { todoList.removeTask(e) })
