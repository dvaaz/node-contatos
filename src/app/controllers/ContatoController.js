import ContatosRepository from "../repositories/ContatosRepository.js"
import isEmpty from "../utils/utils.js";

class ContatoController {

    //Listar tudo
    async index(req, res) {
        try {
            const row = await ContatosRepository.findAll();
            if (!row || row.length === 0) {
                return res.status(404).json({ erro: "Nenhum contato encontrado" })
            }
            res.status(200).json(row)
        } catch (erro) {
            console.log(erro)
            res.status(500).json({ erro: "Erro ao encontrar constatos" })
        }

    }

    async show(req, res) {
        const id = req.params.id

        try {
            const row = await ContatosRepository.findById(id);

            if (!row || row.length === 0) {
                return res.status(404).json({ erro: "Contato não encontrado." })
            }

            res.status(200).json(row)

        } catch (erro) {
            console.log(erro)
            res.status(500).json({ erro: "Erro ao encontrar contato." })
        }
    }

    async store(req, res) {
        const params = req.body
        if (isEmpty(params.nome_contato)) {
            return res.status(400).json({ error: "Nome não pode ser vazio." })
        }
        if (isEmpty(params.telefone_contato) && isEmpty(params.celular_contato) && isEmpty(params.email_contato)) {
            return res.status(400).json({ error: "Ao menos uma informação de contato precisa ser preenchida." })
        }
        // Ativar quando tiver autenticação de usuario
        // if (isEmpty(params.id_usuario)){
        //     return res.status(400).json({ error: "Nome não pode ser vazio." })
        // }
        try {
            const row = await ContatosRepository.storeContato(params)
            res.status(201).json(row)
        } catch (erro) {
            console.log(erro)
            res.status(500).json({ error: "Erro ao inserir contato no banco." })
        }

    }

    async update(req, res) {
        const id = req.params.id
        const params = req.body


        try {
            const row = await ContatosRepository.updateContato(id, params)
            res.status(201).json(row)
        } catch (erro) {
            console.log(erro)
            res.status(500).json({ erro: "Erro ao atualizar seleção" })
        }

    }

    async delete(req, res) {
        const id = req.params.id
        try {
            const row = await ContatosRepository.deleteContato(id)
            res.status(204).json(row)
        } catch (erro) {
            console.log(erro)
            res.status(500).json({ erro: "Erro ao deletar seleção" })
        }
    }

}

export default new ContatoController()