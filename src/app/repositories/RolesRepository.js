import queryHelper from "../database/queryHelper.js"

const db = new queryHelper();

class RolesRepository {
    // Exibir todas as roles
    async findAll() {
        const sql = "SELECT * FROM db_agenda.tb_roles"
        try {
            const resultado = await db.executarQuery(sql)
            return resultado
        } catch (erro) {
            throw new Error(erro)
        }
    }

    // Exibir role por Id
    async findById(id) {
        const sql = "SELECT * FROM db_agenda.tb_roles WHERE id_role=?"
        try {
            const resultado = await db.executarQuery(sql, [id])
            return resultado
        } catch (erro) {
            throw new Error(erro)
        }
    }

    // Criar uma role
    async storeRole(params) {
        try {
            const sql = `
            INSERT INTO db_agenda.tb_roles 
            (nome_role)
            VALUES (?);
        `;
            const valores = [
                params.nome_role
            ];
            const resultado = await db.executarQuery(sql, valores)
            return resultado
        } catch (erro) {
            console.log(erro)
            throw new Error(erro)
        }
    }

    // Remover uma role
    async deleteRole(id) {
        const sql = "DELETE FROM db_agenda.tb_roles WHERE id_role=?"
        try {
            const resultado = await db.executarQuery(sql, [id])
            return resultado
        } catch (erro) {
            throw new Error(erro)
        }
    }

}

export default new RolesRepository()