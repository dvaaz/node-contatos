// Rotas de contato utilizando imports
import express from 'express';
import ContatoController from '../controllers/contatoController.js';

const router = express.Router();
const controller = new ContatoController();
// Rota para criar um novo contato

