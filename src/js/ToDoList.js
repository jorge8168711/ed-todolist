import { ENTER_KEY, d } from './helpers'
import { tasks, taskInput, tasksList, errorMessage } from './index.js'
import Task from './Task'

export default class ToDoList {
  constructor () {
    this.tasks = tasks.tasksArray

    this.addNewTask = this.addNewTask.bind(this)
    this.editTask = this.editTask.bind(this)
    this.removeTask = this.removeTask.bind(this)

    tasks.subscribe(tasks => (this.tasks = tasks))
    tasks.subscribe(tasks => { this.renderNoTasksMessage(tasks) })

    window.addEventListener('load', (e) => { this.initView(e) })
  }

  toggleErrorMessage (itShow) {
    // TODO: mejorar con programación reactiva
    if (itShow) {
      errorMessage.innerText = 'no se puede agregar una tarea vacía'
      errorMessage.classList.add('is-visible')
      taskInput.classList.add('has-error')
    } else {
      errorMessage.classList.remove('is-visible')
      taskInput.classList.remove('has-error')
      // errorMessage.innerText = ''
    }
  }

  addNewTask (e) {
    !e.target.value
      ? this.toggleErrorMessage(true)
      : this.toggleErrorMessage(false)

    if (e.keyCode === ENTER_KEY && e.target.value) {
      let newTask = new Task(e.target.value)
      tasks.add(newTask)
      this.renderTask(newTask)
      e.target.value = ''
    }
  }

  editTask (e) {
    if (e.target.localName === 'label' && e.target.className === 'list-item__label') {
      let taskToEdit = this.tasks.findIndex(task => task.id === Number(e.target.dataset.id))
      let label = d.querySelector(`.list-item__label[data-id="${this.tasks[taskToEdit].id}"]`)

      const saveTask = e => {
        // TODO: mejorar el modo en el que se dibujan los saltos de linea
        e.target.textContent = e.target.textContent
        tasks.edit(taskToEdit, e.target.textContent)
        e.target.blur()
      }

      label.addEventListener('blur', e => saveTask(e))
      label.addEventListener('keyup', e => (e.keyCode === ENTER_KEY) && saveTask(e))
    }
  }

  removeTask (e) {
    if (e.target.localName === 'a') {
      e.preventDefault()

      let taskToRemove = this.tasks
        .findIndex(task => task.id === Number(e.target.dataset.id))

      e.target.parentElement
        .addEventListener('animationend', e => { e.target.remove() })

      e.target.parentElement.removeAttribute('style')
      e.target.parentElement.classList
        .replace('entry-animation', 'exit-animation')

      tasks.delete(taskToRemove)
    }
  }

  renderTask (task, index) {
    let taskTemplate = `
      <li class="list-item entry-animation ${task.isComplete ? 'was-completed' : ''}"
        style="animation-delay: ${(index + 1) ? (index + 1) * 120 : '0'}ms"
        data-id="${task.id}">
        <label for="${task.id}" class="list-item__checkmark"></label>
        <input class="list-item__checkbox ${task.isComplete ? 'was-completed' : ''}"
          type="checkbox"
          id="${task.id}"
          ${task.isComplete ? 'checked' : ''}>

        <label class="list-item__label"
          data-id="${task.id}"
          contenteditable
          spellcheck>
          ${task.name}
        </label>

        <p class="list-item__date">${task.creationDate}</p>
        <a class="list-item__remove-button" href="#" data-id="${task.id}"></a>
      </li>
    `

    tasksList.insertAdjacentHTML('beforeend', taskTemplate)

    let taskCheckbox = d.querySelector(`.list-item[data-id="${task.id}"] input[type="checkbox"]`)

    taskCheckbox.addEventListener('change', e => {
      let taskToComplete = this.tasks.findIndex(task => task.id === Number(e.target.id))

      if (e.target.checked) {
        taskCheckbox.parentElement.classList.add('was-completed')
        tasks.complete(taskToComplete, true)
      } else {
        taskCheckbox.parentElement.classList.remove('was-completed')
        tasks.complete(taskToComplete, false)
      }
    })
  }

  renderNoTasksMessage (tasks) {
    let template = `
      <div class="no-tasks-message fade-in">
        your list is empty

        <p class="credits">
          <a class="credits__link"
            href="https://www.uplabs.com/posts/empty-state-for-to-do-list-app"
            target="_blank">image
          </a>

          by

          <a class="credits__link" href="https://www.uplabs.com/prdvicky"
            target="_blank">
            Vicky Ardi
          </a>
        </p>
      </div>
    `

    if (tasks.length === 0) {
      d.querySelector('.todo-list-title').classList.toggle('hidden')
      d.querySelector('main.todo').insertAdjacentHTML('beforeend', template)
    } else if (d.querySelector('.no-tasks-message') && tasks.length > 0) {
      d.querySelector('.no-tasks-message').classList.replace('fade-in', 'fade-out')
      d.querySelector('.no-tasks-message').addEventListener('animationend', () => {
        d.querySelector('.no-tasks-message').remove()
        d.querySelector('.todo-list-title').classList.toggle('hidden')
      })
    }
  }

  initView (e) {
    if (this.tasks.length > 0) {
      this.tasks.forEach((task, index) => this.renderTask(task, index))
    } else {
      this.renderNoTasksMessage(this.tasks)
    }
  }
}
