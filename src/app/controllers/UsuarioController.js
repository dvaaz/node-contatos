import UsuarioRepository from '../repositories/UsuarioRepository';

class UsuarioController {
    // funcao para checar a role do usuario e fazer autenticacao sem token
    async index(req, res) {
        try {
            const email = req.query.email_usuario;
            const resultado = await UsuarioRepository.findByEmail(email);
            return res.json(resultado);
        } catch (erro) {
            res.status(500).json({ error: erro.message });
        }
    }
    // Show All apenas por adimins
    async show(req, res) {
        try {
            const resultado = await UsuarioRepository.findAll();
            res.json(resultado);
        } catch (erro) {
            res.status(500).json({ error: erro.message });
        }
    }

    // Criar usuário apenas por admins
    async store(req, res) {
        const params = req.body;
        if (isEmpty(params.nome_usuario) || isEmpty(params.email_usuario) || isEmpty(params.senha_usuario) || isEmpty(params.id_role)) {
            return res.status(400).json({ error: "Todos os campos são obrigatórios." });
        }
        try {
            const resultado = await UsuarioRepository.storeUsuario(params);
            res.status(201).json(resultado);
        } catch (erro) {
            res.status(500).json({ error: erro.message });
        }
    }

    // Atualizar usuário apenas por admins
    // TODO: caso o usuario atualize sua senha ou seu Nome(?)


    // Deleta usuário
    async delete(req, res) {
        const id = req.params.id;
        try {
            const resultado = await UsuarioRepository.deleteUsuario(id);
            res.json(resultado);
        } catch (erro) {
            res.status(500).json({ error: erro.message });
        }
    }

}