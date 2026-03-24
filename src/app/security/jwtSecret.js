import jwt from 'jsonwebtoken';

const SECRET = process.env.JWt_SECRET || 'minha_chave_secreta'; // caso não haja environment variable

// classe para lidar com a geração e verificação de tokens JWT.
class JwtSecret {
    // Função para gerar um token JWT para um usuário.
    gerarToken(payload) {
        return jwt.sign(payload, SECRET, { expiresIn: '1h' }); // Token válido por 1 hora
    }

    // Funcao para verificar um token JWT e extrair o payload.
    verificarToken(token) {
        try {
            return jwt.verify(token, SECRET);
        } catch (erro) {
            throw new Error('Token inválido ou expirado');
        }
    }
}

export default new JwtSecret();