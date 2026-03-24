import mysql from 'mysql2/promise'

const conexao = mysql.createPool({
    // As credenciais de conexão são lidas do arquivo .env para segurança.
    // .env já é configurado no gitignore
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: 'db_agenda'
})

export default conexao