import express from 'express'

const routes = express.Router()

routes
  .get('/', (req, res, next) => {
    res.render('index', {
      title: 'Título de mi template home',
      description: 'Descripción de mi template Home'
    })
  })
  .get('/about', (req, res, next) => {
    res.render('index', {
      title: 'Título de mi template about',
      description: 'Descripción de mi template about'
    })
  })

export default routes
