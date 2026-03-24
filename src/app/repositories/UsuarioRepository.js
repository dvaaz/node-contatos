const { gerarHash } = require('./security/hash');
import queryHelper from "../database/QueryHelper"

const db = new queryHelper();
class ContatosRepository {

    // A ser utilizado apenas por ADMINS
    async findAll() {
        try {
            sql = `SELECT nome_usuario FROM db_agenda.tb_usuarios`

            const resultado = await db.executarQuery(sql)
            return resultado

        } catch (erro) {
            throw new Error(erro)

        }
    }

    // Exibir usuário por email
    async findByEmail(email) {
        try {
            sql = `SELECT nome_usuario FROM db_agenda.tb_usuarios WHERE email_usuario=?`
            const resultado = await db.executarQuery(sql, [email])
            return resultado
        } catch (erro) {
            throw new Error(erro)
        }
    }

    // Criar um usuário
    // Todos os campo são obrigatórios; o email deve ser único
    async storeUsuario(params) {
        try {
            // Criando hash
            const hash = await gerarHash(params.senha_usuario);
            const sql = `
            INSERT INTO db_agenda.tb_usuarios 
            (nome_usuario, email_usuario, senha_usuario)
            VALUES (?, ?, ?);
        `;
            const valores = [
                params.nome_usuario,
                params.email_usuario,
                hash
            ];

            const resultado = await db.executarQuery(sql, valores)
            return resultado
        } catch (erro) {
            console.log(erro)
            throw new Error(erro)
        }
    }

    // Exibir usuário por Id apenas ADMINS
    async findById(id) {
        try {
            sql = `SELECT nome_usuario FROM db_agenda.tb_usuarios WHERE id_usuario=?`
            const resultado = await db.executarQuery(sql, [id])
            return resultado
        } catch (erro) {
            throw new Error(erro)
        }

    }

    // Deletar um usuário apenas ADMINS e o Proprio usuário
    async deleteUsuario(id) {
        try {
            sql = `DELETE FROM db_agenda.tb_usuarios WHERE id_usuario=?`
            const resultado = await db.executarQuery(sql, [id])
            return resultado
        } catch (erro) {
            throw new Error(erro)
        }

    }

}

export default new UsuarioRepository()