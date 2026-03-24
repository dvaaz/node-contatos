// Rotas de contato utilizando imports
import express from 'express';
import ContatoController from '../controllers/contatoController.js';

class ContatoRoutes {
    constructor() {
        this.router = express.Router();
        this.controller = new ContatoController();
        this.initializeRoutes();
    }

    // Configura as rotas para contatos
    initializeRoutes() {
        this.router.get('/exibir', this.controller.index);
        this.router.get('/exibir/:id', this.controller.show);
        this.router.post('/criar', this.controller.store);
        this.router.put('/atualizar/:id', this.controller.update);
        this.router.delete('/remover/:id', this.controller.delete);
    }

}


export default ContatoRoutes;

