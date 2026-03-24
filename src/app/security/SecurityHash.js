import bcrypt from 'bcrypt';

const SALT_ROUNDS = 5;

class Hash {
// Função para criar um hash a partir de uma senha, usando salt (sem pepper).

    async makeHash(senha) {
    return await bcrypt.hash(senha, SALT_ROUNDS);
    }

    // Função para comparar uma senha com um hash.
    async compareSenha(senha, hash) {
        return await bcrypt.compare(senha, hash);
    }

}

export default new Hash();