const { verificarToken } = require('./jwt');

// Middleware de autenticação para proteger rotas.
function autenticar(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ erro: 'Token não fornecido' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = verificarToken(token);
        req.usuario = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ erro: 'Token inválido' });
    }
}

module.exports = autenticar;