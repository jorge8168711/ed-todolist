import { j, ls } from './helpers'

export default class Tasks {
  constructor (key) {
    this.key = key
    this.tasksArray = []
    this.subscriptions = []

    if (!ls.getItem(this.key)) {
      ls.setItem(this.key, j.stringify([]))
    } else {
      this.tasksArray = j.parse(ls.getItem(this.key))
    }
  }

  updateLocalStorage () {
    ls.setItem(this.key, j.stringify(this.tasksArray))
  }

  add (task) {
    this.tasksArray.push(task)
    this.updateLocalStorage()
    this.notify()
  }

  edit (task, newName) {
    this.tasksArray[task].name = newName
    this.updateLocalStorage()
    this.notify()
  }

  complete (task, isComplete) {
    this.tasksArray[task].isComplete = isComplete
    this.updateLocalStorage()
    this.notify()
  }

  delete (task) {
    this.tasksArray.splice(task, 1)
    this.updateLocalStorage()
    this.notify()
  }

  subscribe (callback) {
    this.subscriptions.push(callback)
  }

  notify () {
    this.subscriptions.forEach(sub => {
      sub(this.tasksArray)
    })
  }
}
