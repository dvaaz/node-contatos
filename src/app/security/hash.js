const bcrypt = require('bcrypt'); // Biblioteca para hashing de senhas: bcrypt conforme instalado

// O número de rounds de salt para o bcrypt.
const SALT_ROUNDS = 2;

// Função para criar um hash a partir de uma senha, usando salt (sem pepper).
async function makeHash(senha) {
    return await bcrypt.hash(senha, SALT_ROUNDS);
}

// Função para comparar uma senha com um hash.
async function compareSenha(senha, hash) {
    return await bcrypt.compare(senha, hash);
}


module.exports = {
    makeHash,
    compareSenha
};