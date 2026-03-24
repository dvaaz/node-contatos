import express, { response } from 'express'
import ContatoController from './app/controllers/ContatoController.js'


const app = express()

app.get('/', (req, res) => {
    res.send('<h1>Hello Agenda!!</h1>')

})

// Indicar para o express ler o body como json

app.use(express.json())

app.get('/contatos', (req, res) => ContatoController.index(req, res))

app.get('/contatos/:id', (req, res) => ContatoController.show(req, res))

app.post('/contatos', (req, res) => ContatoController.store(req, res))

app.put('/contatos/:id', (req, res) => ContatoController.update(req, res))

app.delete('/contatos/:id', (req, res) => ContatoController.delete(req, res))

export default app