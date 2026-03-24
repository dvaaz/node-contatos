const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET;

function gerarToken(payload) {
    return jwt.sign(payload, SECRET, {
        expiresIn: '1h'
    });
}

function verificarToken(token) {
    return jwt.verify(token, SECRET);
}

module.exports = {
    gerarToken,
    verificarToken
};