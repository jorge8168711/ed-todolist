export default class Task {
  constructor (name) {
    this.date = new Date()
    this.id = this.date.getTime()
    this.name = name
    this.isComplete = false
    this.creationDate = `${this.date.getDay()}/${this.date.getMonth()}/${this.date.getUTCFullYear()}`
    // se retorna el objecto generado por el el metodo constructror
    // con esto permitimos que se pueda guardar este objeto en localStorage
    return this
  }
}
