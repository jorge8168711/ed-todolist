export default class Task {
  constructor (name) {
    this.id = new Date().getTime()
    this.name = name
    this.isComplete = false
    // se retorna el objecto generado por el el metodo constructror
    // con esto permitimos que se pueda guardar este objeto en localStorage
    return this
  }
}
