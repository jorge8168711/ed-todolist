import express from 'express'
import pug from 'pug'
import favicon from 'serve-favicon'
import sassMiddleware from 'node-sass-middleware'
import routes from './src/app/routes'

const env = 'production'
const port = process.env.PORT || 3000
const publicDir = `${__dirname}/public`
const viewDir = `${__dirname}/src/views`
const faviconDir = `${__dirname}/public/img/favicon.ico`
const app = express()

app
  .set('views', viewDir)
  .set('view engine', 'pug')
  .set('port', port)
  .set('env', env)

  .use(sassMiddleware({
    src: `${__dirname}/src/scss`,
    dest: `${__dirname}/public/styles`,
    prefix: '/styles',
    debug: true,
    outputStyle: 'compressed',
    sourceMap: false
  }))
  .use(express.static(publicDir))
  .use(favicon(faviconDir))
  .use(routes)

if (app.get('env') === 'production') {
  // middleware de express
  // el medoto use sirve para ejecutar middleware
  // app.use((require, response, next) => {})
  app.use((req, res, next) => {
    let err = new Error('Not found')
    err.status = 404
    next(err)
  })

  app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.render('error', { err: err })
  })
}

export default app
