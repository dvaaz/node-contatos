import queryHelper from "../database/queryHelper.js"

const db = new queryHelper();
class ContatosRepository {

    // Exibir todos os contatos
    async findAll() {
        const sql = "SELECT * FROM db_agenda.tb_contatos"
        try {

            const resultado = await db.executarQuery(sql)
            return resultado

        } catch (erro) {

            throw new Error(erro)

        }
    }

    // Exibir contato por Id
    async findById(id) {
        const sql = "SELECT * FROM db_agenda.tb_contatos WHERE id_contato=?"

        try {
            const resultado = await db.executarQuery(sql, [id])
            return resultado
        } catch (erro) {
            throw new Error(erro)
        }

    }


    // Criar um contato
    async storeContato(params) {
        try {
            const sql = `
            INSERT INTO db_agenda.tb_contatos 
            (nome_contato, telefone_contato, celular_contato, email_contato, id_usuario)
            VALUES (?, ?, ?, ?, ?);
        `;
            const valores = [
                params.nome_contato,
                params.telefone_contato,
                params.celular_contato,
                params.email_contato,
                params.id_usuario
            ];

            const resultado = await db.executarQuery(sql, valores)
            return resultado
        } catch (erro) {
            console.log(erro)
            throw new Error(erro)
        }
    }

    // Alterar um contato
    async updateContato(id, params) {

        
    // Array para SET
    try{
        const setParts = []; // prepara uma variavel para armazenar os campos de forma dinamica
        const valores = [];
        // Verifica de forma dinamica quais campos foram fornecidos e adiciona à query
            if (params.nome_contato !== undefined) {
                setParts.push("nome_contato = ?");
                valores.push(params.nome_contato);
            }
            if (params.telefone_contato !== undefined) {
                setParts.push("telefone_contato = ?");
                valores.push(params.telefone_contato);
            }
            if (params.celular_contato !== undefined) {
                setParts.push("celular_contato = ?");
                valores.push(params.celular_contato);
            }
            if (params.email_contato !== undefined) {
                setParts.push("email_contato = ?");
                valores.push(params.email_contato);
            }
            if (params.id_usuario !== undefined) {
                setParts.push("id_usuario = ?");
                valores.push(params.id_usuario);
            }

            if (setParts.length === 0) {
                throw new Error("Nenhum campo para atualizar");
            }

        // Monta a query dinâmica
        const sql = `
            UPDATE db_agenda.tb_contatos
            SET ${setParts.join(", ")} // Transforma em string o array
            WHERE id_contato = ?;
        `;

        valores.push(id); // id para WHERE
            const resultado = await db.executarQuery(sql, valores)
            return resultado
        } catch (erro) {
            console.log(erro)
            throw new Error(erro)
        }

    }

    // Deletar um contato
    async deleteContato(id) {
        const sql = "DELETE FROM db_agenda.tb_contatos WHERE id_contato=?"

        try {
            const resultado = await db.executarQuery(sql, [id])
            return resultado
        } catch (erro) {
            console.log(erro)
            throw new Error(erro)
        }
    }


}

export default new ContatosRepository()
