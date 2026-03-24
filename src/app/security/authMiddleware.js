function autorizar(rolesPermitidas) {
    return (req, res, next) => {
        const usuarioRoles = req.usuario.roles;

        const permitido = usuarioRoles.some(role =>
            rolesPermitidas.includes(role)
        );

        if (!permitido) {
            return res.status(403).json({ erro: 'Acesso negado' });
        }

        next();
    };
}

module.exports = autorizar;