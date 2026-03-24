// gerenciador de rotas
import express from 'express'
import UsuarioRoutes from './UsuarioRoutes.js'
import ContatoRoutes from './contatoRoutes.js';

const router = express.Router()

// Configura as rotas para contatos
const contatoRoutes = new ContatoRoutes();
router.use('/contatos', contatoRoutes.router);

// Outras rotas podem ser adicionadas aqui, por exemplo:
const usuarioRoutes = new UsuarioRoutes();
router.use('/usuarios', usuarioRoutes.router);


export default router;