import { ENTER_KEY, d } from './helpers'
import { tasks, taskInput, tasksList, completedTasksList, errorMessage } from './index.js'
import Task from './Task'

export default class ToDoList {
  constructor () {
    this.tasks = tasks.tasksArray
    this.notCompletedTasks = this.tasks.filter(task => !task.isComplete)
    this.completedTasks = this.tasks.filter(task => task.isComplete)

    // methods with bind
    this.addNewTask = this.addNewTask.bind(this)
    this.editTask = this.editTask.bind(this)
    this.removeTask = this.removeTask.bind(this)
    this.changeTaskCompleteState = this.changeTaskCompleteState.bind(this)

    // tasks suscriptions
    tasks.subscribe(tasks => {
      this.tasks = tasks
      this.notCompletedTasks = this.tasks.filter(task => !task.isComplete)
      this.completedTasks = this.tasks.filter(task => task.isComplete)

      this.removeCompltedTitle()
      this.renderNoTasksMessage(tasks)
    })


    // RENDER TASKS WHEN THE PAGE LOADS
    window.addEventListener('load', (e) => { this.initView(e) })
  }

  addNewTask (e) {
    !e.target.value
      ? this.toggleErrorMessage(true)
      : this.toggleErrorMessage(false)

    if (e.keyCode === ENTER_KEY && e.target.value) {
      let newTask = new Task(e.target.value)
      tasks.add(newTask)
      this.renderTask(newTask, tasksList)
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

      let taskToRemove = this.tasks.findIndex(t => t.id === Number(e.target.dataset.id))

      e.target.parentElement.addEventListener('animationend', e => { e.target.remove() })
      e.target.parentElement.removeAttribute('style')
      e.target.parentElement.classList.replace('entry-animation', 'exit-animation')
      tasks.delete(taskToRemove)
    }
  }

  changeTaskCompleteState(e) {
    let taskItem = e.target.parentElement
    let taskToModify = this.tasks.findIndex(t => t.id === Number(e.target.id))
    let task

    // tarea completada
    if (e.target.checked) {
      tasks.toggleCompleteState(taskToModify, true)
      task = this.completedTasks.filter(t => t.id === Number(e.target.id))[0]

      taskItem.classList.add('was-completed')
      taskItem.removeAttribute('style')
      taskItem.classList.replace('entry-animation', 'exit-animation')

      taskItem.addEventListener('animationend', function () {
        taskItem.remove()
        this.renderTask(task, completedTasksList)
      }.bind(this))
    } else {
      // tarea no completada
      tasks.toggleCompleteState (taskToModify, false)
      task = this.notCompletedTasks.filter(t => t.id === Number(e.target.id))[0]

      taskItem.classList.remove('was-completed')
      taskItem.removeAttribute('style')
      taskItem.classList.replace('entry-animation', 'exit-animation')

      taskItem.addEventListener('animationend', function () {
        taskItem.remove()
        this.renderTask(task, tasksList)
      }.bind(this))
    }
  }

  renderTask (task, tasksContainer, index = 0, tasksArray = []) {
    // - primero se dibujan los elementos no completados y despues los completados
    // - valido que el arreglo que estoy recorriendo es el de tareas completadas
    //   com el metodo Array.some
    // - si el arreglo es el de tareas completas calculo cuantas tareas
    //   incompletas tengo, para que el delay continue con la secuencia, como
    //   si estuviera recorriendo un solo arreglo con todas las tareas
    let itemsDelay = tasksArray.some(task => task.isComplete)
      ? this.tasks.length - tasksArray.length + (index + 1)
      : (index + 1)

    // el h2 se dibuja solo cuanto se itera en el arreglo de las tareas completadas
    let taskTemplate = `
      ${task.isComplete && index === 0 && !d.querySelector('.completed-title')
        ? `<h2 class="completed-title entry-animation"
            style="animation-delay: ${(itemsDelay) ? (itemsDelay) * 120 : 0}ms";>
            Completed
          </h2>`
        : ''}

      <li class="list-item entry-animation ${task.isComplete ? 'was-completed' : ''}"
        style="animation-delay: ${(itemsDelay) ? (itemsDelay) * 120 : '0'}ms"
        data-id="${task.id}">

        <label for="${task.id}" class="list-item__checkmark"></label>
        <input class="list-item__checkbox ${task.isComplete ? 'was-completed' : ''}"
          type="checkbox"
          id="${task.id}"
          ${task.isComplete ? 'checked' : ''}>

        <label class="list-item__label" data-id="${task.id}" contenteditable spellcheck>
          ${task.name}
        </label>

        <p class="list-item__date">${task.creationDate}</p>
        <a class="list-item__remove-button" href="#" data-id="${task.id}"></a>
      </li>
    `

    // render tasks
    tasksContainer.insertAdjacentHTML('beforeend', taskTemplate)

    // se obtiene el checkbox de de cada una de las tareas para agregar un
    // listener que permita marcar como completada las tareas
    d.querySelector(`.list-item[data-id="${task.id}"] input[type="checkbox"]`).addEventListener('change', e => {
      this.changeTaskCompleteState(e, task)
    })
  }

  removeCompltedTitle () {
    // remueve titulo de tareas completadas cuando no se necsita
    if(this.completedTasks.length === 0 && d.querySelector('.completed-title')) {
      d.querySelector('.completed-title').removeAttribute('style')
      d.querySelector('.completed-title').classList.replace('entry-animation', 'exit-animation')
      d.querySelector('.completed-title').addEventListener('animationend', e => {
        e.target.remove()
      })
    }
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

  initView (e) {
    if (this.tasks.length > 0) {
      this.notCompletedTasks.forEach((task, index, array) => {
        this.renderTask(task, tasksList, index, array)
      })

      this.completedTasks.forEach((task, index, array) => {
        this.renderTask(task, completedTasksList, index, array)
      })
    } else {
      this.renderNoTasksMessage(this.tasks)
    }
  }
}
