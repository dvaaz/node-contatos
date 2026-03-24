import express from 'express';


class UsuarioRoutes {
    constructor() {
        this.router = express.Router();
        this.controller = new UsuarioController();
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