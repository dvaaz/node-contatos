import queryHelper from "../database/QueryHelper";
import SecurityHash from "../security/SecurityHash";
import jwtSecret from "../security/jwtSecret";

const db = new queryHelper();
const hashHelper = new SecurityHash();
const jwt = new jwtSecret();

class LoginController {
    async login(req, res) {
        try {
            const { email_usuario, senha_usuario } = req.body;
            const sql = `SELECT id_usuario, nome_usuario, email_usuario, senha_usuario FROM db_agenda.tb_usuarios WHERE email_usuario = ?`;
            const resultado = await db.executarQuery(sql, [email_usuario]);
            if (resultado.length === 0) {
                return res.status(401).json({ error: "Email ou senha inválidos." });
            }
            const usuario = resultado[0];
            const senhaValida = await hashHelper.compareSenha(senha_usuario, usuario.senha_usuario);
            if (!senhaValida) {
                return res.status(401).json({ error: "Email ou senha inválidos." });
            }
            const token = jwt.gerarToken({ id_usuario: usuario.id_usuario, nome_usuario: usuario.nome_usuario, email_usuario: usuario.email_usuario });, email_usuario: usuario.email_usuario } });
            res.status(200).json({ message: "Login bem-sucedido.", token });
        } catch (erro) {
            res.status(500).json({ error: erro.message });
        }
    }
}