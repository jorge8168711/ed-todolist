import express from 'express'

const routes = express.Router()

routes
  .get('/', (req, res, next) => {
    res.render('index', {
      title: 'Todo list',
      description: 'Aplicación básica para crear un todo list'
    })
  })

export default routes
