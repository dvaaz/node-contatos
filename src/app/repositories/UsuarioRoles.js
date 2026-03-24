import db from "../database/QueryHelper.js"

class UsuarioRolesRepository {
    // Criar conexao usuario-roles
    async storeUsuarioRoles(params) {
        try {
            const sql = `
            INSERT INTO db_agenda.tb_usuario_roles 
            (id_usuario, id_role)
            VALUES (?, ?);
        `;
            const valores = [
                params.id_usuario,
                params.id_role
            ];

            const resultado = await db.executarQuery(sql, valores)
            return resultado
        } catch (erro) {
            console.log(erro)
            throw new Error(erro)
        }
    }

    // Exibir roles por id_usuario
    async findRolesByUsuarioId(id_usuario) {
        try {
            const sql = `
            SELECT r.nome_role 
            FROM db_agenda.tb_usuario_roles urole
            JOIN db_agenda.tb_roles r ON urole.id_role = r.id_role
            WHERE urole.id_usuario = ?;
        `;
            const resultado = await db.executarQuery(sql, [id_usuario])
            return resultado
        } catch (erro) {
            console.log(erro)
            throw new Error(erro)
        }
    }
}

export default new UsuarioRolesRepository()