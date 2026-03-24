// gerenciador de rotas
import express from 'express'

import contatoRoutes from './contatoRoutes.js'

const router = express.Router()

// Configura as rotas para contatos
router.use('/contatos', contatoRoutes)

export default router;