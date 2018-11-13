import { ENTER_KEY, c, d, j, ls } from './helpers'
import { task, list } from './index.js'
import Task from './Task'

export default class ToDoList {
  constructor (key) {
    this.key = key

    if (!ls.getItem(key)) {
      ls.setItem(key, j.stringify([]))
    }

    this.addTask = this.addTask.bind(this)
    this.editTask = this.editTask.bind(this)
    this.removeTask = this.removeTask.bind(this)
  }

  getTasks (key) {
    c(j.parse(ls.getItem(key)))
    return j.parse(ls.getItem(key))
  }

  updateTasks (updatedTasks) {
    ls.setItem(this.key, j.stringify(updatedTasks))
    c(updatedTasks)
  }

  addTask (e) {
    if (!e.target.value) {
      c('no puedes agregar una tarea vacia')
    }

    if (e.keyCode === ENTER_KEY) {
      let newTask = new Task(e.target.value)
      let tasks = this.getTasks(this.key)

      tasks.push(newTask)
      this.updateTasks(tasks)
      this.renderTask(newTask)
      e.target.value = ''
    }
  }

  editTask (e) {
    if (e.target.localName === 'label') {
      let tasks = this.getTasks(this.key)
      let taskToEdit = tasks.findIndex(task => task.id === Number(e.target.dataset.id))
      let label = d.querySelector(`[data-id="${tasks[taskToEdit].id}"]`)

      const saveTask = e => {
        e.target.textContent = e.target.textContent
        tasks[taskToEdit].name = e.target.textContent
        this.updateTasks(tasks)
        e.target.blur()
      }

      label.addEventListener('blur', e => saveTask(e))
      label.addEventListener('keyup', e => (e.keyCode === ENTER_KEY) && saveTask(e))
    }
  }

  removeTask (e) {
    if (e.target.localName === 'a') {
      e.preventDefault()
      let tasks = this.getTasks(this.key)
      let taskToRemove = tasks.findIndex(task => task.id === Number(e.target.dataset.id))
      tasks.splice(taskToRemove, 1)
      this.updateTasks(tasks)
      e.target.parentElement.remove()
    }
  }

  renderTask (task) {
    let taskTemplate = `
    <li class="list-item ${task.isComplete ? 'is-completed' : ''}">
      <input class="list-item__checkbox ${task.isComplete ? 'is-completed' : ''}"
        type="checkbox"
        id="${task.id}"
        ${task.isComplete ? 'checked' : ''}>

        <label class="list-item__label"
          data-id="${task.id}"
          contenteditable
          spellcheck>
          ${task.name}
        </label>

        <a class="list-item__remove-button" href="#" data-id="${task.id}">&#128465;</a>
    </li>
    `

    list.insertAdjacentHTML('beforeend', taskTemplate)
  }

  render () {
    let tasks = this.getTasks(this.key)
    let listTasks = list.children

    // render tasks list
    tasks.forEach(task => this.renderTask(task))

    // https://developer.mozilla.org/es/docs/Web/API/HTMLCollection
    // https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Array/from
    // las listas de nodos se comportan como arreglos pero no son arreglos
    // por lo tanto los métodos de los arreglos no funcionan con estos
    // creamos un array a partir de una lista de nodos(HTMLCollection)
    Array.from(listTasks).forEach(listItem => {
      listItem.querySelector('input[type="checkbox"]')
        .addEventListener('change', e => {
          let task = tasks.filter(task => task.id === Number(e.target.id))

          if (e.target.checked) {
            e.target.parentElement.classList.add('is-completed')
            task[0].isComplete = true
          } else {
            e.target.parentElement.classList.remove('is-completed')
            task[0].isComplete = false
          }

          this.updateTasks(tasks)
        })
    })

    task.addEventListener('keyup', this.addTask)
    list.addEventListener('click', this.editTask)
    list.addEventListener('click', this.removeTask)
  }
}
