import http from 'http'
import express from 'express'

const port = process.env.PORT || 8080

const app = express()
app
  .set( 'port', port )
  .use(express.static('public'))

const server = http.createServer(app)

server.listen(
  app.get('port'),
  () => console.log(`Iniciando Aplicación Isomórfica JavaScript en el puerto ${app.get('port')}`)
)
