import conexao from '../database/conexao.js'

const queryHelper = {
    
    /** Função helper que executa as queries no banco de dados de forma assíncrona e retorna os resultados
    * @param {string} sql - A string da query SQL
    * @param {array} valores - Array de parâmetros para a query (opcional)
    * @returns {Promise<any>} - Retorna as linhas (rows) do resultado
    * @autor Eduardo 
    */
    async executarQuery(sql, valores = []) {
        try {
            const [rows] = await conexao.query(sql, valores)
            return rows
        } catch (erro) {
            console.error(`Erro no query: ${erro}`)
            throw erro
        }
    }
}

export default queryHelper