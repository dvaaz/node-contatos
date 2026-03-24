import mysql from 'mysql2/promise'

const conexao = mysql.createPool({
    // As credenciais de conexão são lidas do arquivo .env para segurança.
    // .env já é configurado no gitignore
    // Se as variáveis de ambiente não estiverem definidas, usar credenciais padrao/ locais
    host: process.env.DB_HOST||'localhost',
    user: process.env.DB_USER||'root',
    port: process.env.DB_PORT||3306,
    password: process.env.DB_PASS||'',
    database: 'db_agenda'
})

export default conexao